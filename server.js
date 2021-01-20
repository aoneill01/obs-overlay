import express from "express";
import enableWs from "express-ws";
import WebSocket from "ws";

const port = 8080;
const app = express();

const wsInstance = enableWs(app);

app.ws("/lines", (ws) => {
  console.log("Connected");
  ws.on("close", () => console.log("Disconnected"));
  ws.on("message", (message) => {
    console.log("Received message");
    wsInstance.getWss().clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN || client === ws) return;
      client.send(message);
    });
  });
});

app.use(express.static("static"));

app.listen(8080, () => console.log(`http://localhost:${port}/obs.html`));
