// Create a basic Express server with TypeScript that simply returns "Hello, World!" on the root path.
import express from "express";
import fs from "fs/promises";
import logger from "./logging";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "./data.json";

// Save to file
async function saveData(data: { "message": string }): Promise<boolean> {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    logger("Error saving data: " + error, "error");
    return false;
  }
}

app.get("/", async (req, res) => {
  const dataCreated = await saveData({ message: "Hello, World!" });
  res.send({ message: "data created successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
