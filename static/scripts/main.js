import { draw, clearLines, getPoint } from "./canvas.js";
import { initColorPicker } from "./colors.js";
import { initWebSocket } from "./websocket.js";

const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

const socket = initWebSocket(onMessage);

const getColor = initColorPicker();

let lines = [];
let line;
let drawing = false;
let animationRequestId;

function addPoint(point) {
  line.points.push(point);

  if (!animationRequestId) {
    animationRequestId = window.requestAnimationFrame(step);
  }
}

function step(timestamp) {
  lines = clearLines(lines, timestamp);

  draw(canvas, ctx, lines, timestamp);

  animationRequestId = lines.length ? window.requestAnimationFrame(step) : null;
}

function onMessage(event) {
  const line = JSON.parse(event.data);
  line.timestamp = event.timeStamp;
  line.isOther = true;
  lines.push(line);

  if (!animationRequestId) {
    animationRequestId = window.requestAnimationFrame(step);
  }
}

canvas.addEventListener("mousemove", function (event) {
  if (drawing) {
    addPoint(getPoint(event));
  }
});

canvas.addEventListener("mousedown", function (event) {
  drawing = true;
  line = {
    color: getColor(),
    points: [getPoint(event)],
  };
  lines.push(line);
});

canvas.addEventListener("mouseup", function (event) {
  if (!drawing) return;
  drawing = false;
  addPoint(getPoint(event));
  line.timestamp = event.timeStamp;

  socket.send(JSON.stringify(lines[lines.length - 1]));
});
