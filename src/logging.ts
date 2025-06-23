// Replace with a logging library
// For now, we will use console.log for simplicity
const logger = (
  message: string,
  severity: "info" | "warn" | "error" = "info"
) => {
  const timestamp = new Date().toISOString();
  switch (severity) {
    case "info":
      console.log(`[INFO] [${timestamp}] ${message}`);
      break;
    case "warn":
      console.warn(`[WARN] [${timestamp}] ${message}`);
      break;
    case "error":
      console.error(`[ERROR] [${timestamp}] ${message}`);
      break;
    default:
      console.log(`[UNKNOWN] [${timestamp}] ${message}`);
  }
};

export default logger;