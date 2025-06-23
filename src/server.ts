// Create a basic Express server with TypeScript that simply returns "Hello, World!" on the root path.
import express from "express";
import http from "http";

import {
  getRandomAlphanumeric,
  loadDataFromLocalFile,
  saveDataToLocalFile,
} from "./util";

const app = express();
const server = http.createServer(app);
app.use(express.json()); // Add this line to parse JSON bodies

const PORT = process.env.PORT || 3000;
const DATA_FILE = "./data.json";

app.post("/url", async (req, res) => {
  // Get the URL from the request body
  const originalUrl = req.body.url;
  if (!originalUrl) {
    res.status(400).send({ error: "'url' param' is required" });
  }

  // For a production application, we would validate the URL format here.
  // For simplicity, we will assume the URL is valid.

  // Load existing data from the local file
  const data = await loadDataFromLocalFile(DATA_FILE);
  // Generate a random 10-digit alphanumeric string
  const tenDigitRandomString = getRandomAlphanumeric(10);

  // Here, we would check if the matching property exists.
  // For simplicity, we will overwrite it if it does.
  const dataCreated = await saveDataToLocalFile(DATA_FILE, {
    ...data,
    [tenDigitRandomString]: req.body.url,
  });

  // If the data was not created successfully, return an internal error response
  if (!dataCreated) {
    res.status(500).send({ error: "Failed to create data" });
  }

  // Return a success response with the generated code
  // todo:fix this to object spects
  res.status(201).send({ message: "data created successfully" });
});

app.get("/:code", async (req, res) => {
  const data: Record<string, string> = await loadDataFromLocalFile(DATA_FILE);
  const code: string = req.params.code;
  const originalUrl = data[code];
  if (!originalUrl) res.status(404).json({ error: "URL not found" });
  res.status(200).json({ url: originalUrl });
});

server.listen(PORT);
