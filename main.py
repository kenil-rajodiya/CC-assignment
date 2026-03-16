from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import joblib
import pandas as pd
from fastapi.responses import JSONResponse


model = joblib.load("./model.pkl")
scaler = joblib.load("./scaler.pkl")


app = FastAPI()


class UserInput(BaseModel):
    CPU: float
    Memory: float
    Disk_read: float
    Disk_write: float
    Network_recieved: float
    Network_transmitted: float


@app.post("/predict")
def predict(data: UserInput):
    df = pd.DataFrame(
        [
            {
                "CPU usage [%]": data.CPU,
                "Memory usage [%]": data.Memory,
                "Disk read throughput [KB/s]": data.Disk_read,
                "Disk write throughput [KB/s]": data.Disk_write,
                "Network received throughput [KB/s]": data.Network_recieved,
                "Network transmitted throughput [KB/s]": data.Network_transmitted,
            }
        ]
    )
    inputdf = scaler.transform(df)
    prediction = int(model.predict(inputdf)[0])

    return JSONResponse(status_code=200, content={"Prediction": prediction})
