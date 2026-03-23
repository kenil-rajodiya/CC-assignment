import { getCloudMetrics } from "./tm.js";

const INSTANCE_ID = "i-06d7c500ae25efa2f";

async function monitor() {
  const metrics = await getCloudMetrics(INSTANCE_ID);

  console.log("Cloud metrics:", metrics);
}

monitor();
setInterval(monitor, 10000);
