import { collectDefaultMetrics, register } from "prom-client";

collectDefaultMetrics({
  prefix: "nestmate_",
  timeout: 5000
});

export { register };
