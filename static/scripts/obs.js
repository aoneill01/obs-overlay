import { draw, clearLines } from "./canvas.js";
import { initWebSocket } from "./websocket.js";

const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

initWebSocket(onMessage);

let lines = [];
let animationRequestId;

function step(timestamp) {
  lines = clearLines(lines, timestamp);

  draw(canvas, ctx, lines, timestamp);

  animationRequestId = lines.length ? window.requestAnimationFrame(step) : null;
}

function onMessage(event) {
  const line = JSON.parse(event.data);
  line.timestamp = event.timeStamp;
  lines.push(line);

  if (!animationRequestId) {
    animationRequestId = window.requestAnimationFrame(step);
  }
}
