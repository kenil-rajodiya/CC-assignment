from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import pandas as pd
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

API_KEY = "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"
model = joblib.load("./anomaly_model.pkl")
scaler = joblib.load("./scaler.pkl")
llm = ChatGroq(model="llama-3.1-8b-instant", api_key=API_KEY, temperature=0)


class AnomalyResponse(BaseModel):
    state: str = Field(description="Final anomaly state")
    reason: str = Field(description="Explanation of the decision")


parser = PydanticOutputParser(pydantic_object=AnomalyResponse)

format_instructions = parser.get_format_instructions()


app = FastAPI()


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert cybersecurity and cloud monitoring system.\n"
            "You specialize in detecting attacks such as DDoS, malware, and abnormal workloads.\n\n"
            "You will be given real-time system metrics including:\n"
            "- CPU cores\n"
            "- CPU utilization (%)\n"
            "- Disk read (KB/s)\n"
            "- Disk write (KB/s)\n"
            "- Network received (KB/s)\n"
            "- Network transmitted (KB/s)\n\n"
            "You will also be given a machine learning prediction.\n\n"
            "Your job:\n"
            "1. Analyze the metrics independently\n"
            "2. Compare with the ML prediction\n"
            "3. You are allowed to OVERRIDE the ML prediction if it is incorrect\n\n"
            "Important:\n"
            "- Do NOT blindly trust the ML prediction\n"
            "- Use the metrics as the primary source of truth\n\n"
            "Interpretation guidelines:\n"
            "- CPU > 85% → high CPU\n"
            "- Network < 500 KB/s → low network\n"
            "- Network > 3000 KB/s → high network\n"
            "- Disk < 100 KB/s → low disk\n\n"
            "Decision priority (VERY IMPORTANT):\n"
            "1. If CPU is high AND network is low → Malware/Trojan\n"
            "2. If network is high AND CPU is low → DDoS\n"
            "3. If CPU, network, and disk are ALL high → High Load\n"
            "4. Do NOT classify as High Load if network is low\n\n"
            "Strict rule:\n"
            "- If any rule matches, you MUST NOT return High Load\n\n"
            "Allowed output labels (STRICT):\n"
            "- Normal\n"
            "- Possible DDoS Attack\n"
            "- Possible Malware / Trojan\n"
            "- Disk Intensive Anomaly / Possible Ransomware\n"
            "- Unknown Anomaly\n\n"
            "You MUST choose one of the above labels exactly.\n"
            "Do NOT create new labels like 'High Network Load' or similar.\n\n"
            "Output requirements:\n"
            "- Prefer specific attack labels for state over generic terms\n"
            "{format_instructions}",
        ),
        (
            "human",
            "CPU cores: {cpu_cores}, "
            "CPU utilization (%): {cpu}, "
            "Disk read (KB/s): {read}, "
            "Disk write (KB/s): {write}, "
            "Network received (KB/s): {received}, "
            "Network transmitted (KB/s): {transmitted}, "
            "ML prediction: {prediction}",
        ),
    ]
)


chain = prompt | llm | parser


class UserInput(BaseModel):
    CPU_cores: int
    CPU: float
    Disk_read: float
    Disk_write: float
    Network_received: float
    Network_transmitted: float


def classify_attack(sample):
    cpu = sample["CPU usage [%]"]
    disk = (
        sample["Disk read throughput [KB/s]"] + sample["Disk write throughput [KB/s]"]
    )
    network = (
        sample["Network received throughput [KB/s]"]
        + sample["Network transmitted throughput [KB/s]"]
    )

    if network > 5000 and cpu < 50:
        return "Possible DDoS Attack"

    elif cpu > 85 and disk < 100:
        return "Possible Malware / Trojan"

    elif cpu > 85 and network > 3000:
        return "High Load / Possible Attack"

    else:
        return "Unknown Anomaly"


@app.post("/predict")
def predict(data: UserInput):
    print(data)
    try:
        input_dict = {
            "CPU cores": int(data.CPU_cores),
            "CPU usage [%]": float(data.CPU),
            "Disk read throughput [KB/s]": float(data.Disk_read),
            "Disk write throughput [KB/s]": float(data.Disk_write),
            "Network received throughput [KB/s]": float(data.Network_received),
            "Network transmitted throughput [KB/s]": float(data.Network_transmitted),
        }

        df = pd.DataFrame([input_dict])

        df = df[
            [
                "CPU usage [%]",
                "Disk read throughput [KB/s]",
                "Disk write throughput [KB/s]",
                "Network received throughput [KB/s]",
                "Network transmitted throughput [KB/s]",
                "CPU cores",
            ]
        ]

        input_scaled = scaler.transform(df)
        pred = model.predict(input_scaled)[0]

        # Convert ML output to label
        if pred == 1:
            ml_prediction = "Normal"
        else:
            ml_prediction = classify_attack(input_dict)

        response = chain.invoke(
            {
                "cpu_cores": input_dict["CPU cores"],
                "cpu": input_dict["CPU usage [%]"],
                "read": input_dict["Disk read throughput [KB/s]"],
                "write": input_dict["Disk write throughput [KB/s]"],
                "received": input_dict["Network received throughput [KB/s]"],
                "transmitted": input_dict["Network transmitted throughput [KB/s]"],
                "prediction": ml_prediction,
                "format_instructions": format_instructions,
            }
        )

        return {"final_state": response.state, "reason": response.reason}

    except Exception as e:
        return {"error": str(e)}


# {
#   "CPU_cores": 2,
#   "CPU": 25,
#   "Disk_read": 50,
#   "Disk_write": 30,
#   "Network_received": 7000,
#   "Network_transmitted": 6500
# }
