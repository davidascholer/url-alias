// Create a basic Express server with TypeScript that simply returns "Hello, World!" on the root path.
import express from "express";
import http from "http";
import WebSocket from "ws";

import {
  getRandomAlphanumeric,
  loadDataFromLocalFile,
  saveDataToLocalFile,
} from "./util";

const app = express();
const server = http.createServer(app);
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATA_FILE = "./data.json";
const URL = "http://localhost:" + PORT;

const ipSessionMap = new Map();
const wss = new WebSocket.Server({ server });

// Ideally, this interval should be running only when there are active WebSocket connections.
// Additionally, a rate limit should be set.
// For this demonstration, we will keep it running.
setInterval(() => {
  if (ipSessionMap.size === 0) return;
  // Iterate through the sessions
  ipSessionMap.forEach((session) => {
    // If the session has a code, it means we need to send a message
    if (session.code) {
      const shortenedUrlFull = URL + "/" + session.code;
      const webSocketMsg = {
        shortenedUrl: shortenedUrlFull,
      };
      // Send the message to the WebSocket client
      if (session.ws.readyState === WebSocket.OPEN) {
        session.ws.send(JSON.stringify(webSocketMsg));
      }
    }
  });
}, 1000);

// WebSocket connection handling
wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;

  // Store the session using IP as the key
  ipSessionMap.set(ip, { ws: ws, code: null });

  ws.on("close", () => {
    ipSessionMap.delete(ip);
  });

  // Close the WebSocket connection when the client responds with a message
  // This could be done better but for this exercise, we will just look for the string "ack".
  ws.on("message", (message) => {
    if (message.toString() !== "ack") return;
    ws.close();
  });
});

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
  const shortenedUrl = tenDigitRandomString;

  // Here, we would check if the matching property and/or value exists.
  // For simplicity, we will overwrite it if it does.
  const dataCreated = await saveDataToLocalFile(DATA_FILE, {
    ...data,
    [shortenedUrl]: req.body.url,
  });

  // If the data was not created successfully, return an internal error response
  if (!dataCreated) {
    res.status(500).send({ error: "Failed to create data" });
  }

  // Look return the shortened URL to the client through the websocket connection
  // Ideally, we would do this mapping in a more robust way such as UUIDs,
  // but for this excercise, we will use the IP address as the key.
  const wsClient = ipSessionMap.get(req.socket.remoteAddress);
  if (wsClient && wsClient.readyState === WebSocket.OPEN) {
    const shortenedUrlFull = URL + "/" + shortenedUrl;
    const webSocketMsg = {
      shortenedUrl: shortenedUrlFull,
    };
    // Set the code in the dictionary to indicate that an acknowledgment is needed
    wsClient.code = shortenedUrl;
    wsClient.send(JSON.stringify(webSocketMsg));
  }
  res.status(201).send({ message: "data created successfully" });
});

app.get("/:code", async (req, res) => {
  const data: Record<string, string> = await loadDataFromLocalFile(DATA_FILE);
  const code: string = req.params.code;
  const originalUrl = data[code];
  if (!originalUrl) res.status(404).json({ error: "URL not found" });
  else res.status(200).json({ url: originalUrl });
});

server.listen(PORT);
