// Create a basic Express server with TypeScript that simply returns "Hello, World!" on the root path.
import express from "express";
import { saveData } from "./util";

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "./data.json";

app.get("/", async (req, res) => {
  const dataCreated = await saveData(DATA_FILE, { message: "Hello, World!" });
  res.send({ message: "data created successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
