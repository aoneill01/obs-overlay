import { draw, clearLines, getPoint } from "./canvas.js";
import { getSize, getColor } from "./colors.js";
import { minDistance } from "./constants.js";
import { initWebSocket } from "./websocket.js";

const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

const send = initWebSocket(onMessage);

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

function formatLineForTransfer(line) {
  // Remove timestamp
  const { timestamp, ...result } = line;

  // Drop any points that are close together
  let currentPoint = result.points[0];
  const lastPoint = result.points[result.points.length - 1];
  const points = result.points.slice(1, result.points.length - 1);
  const simplifiedPoints = [currentPoint];

  for (const point of points) {
    if (
      (currentPoint.x - point.x) ** 2 + (currentPoint.y - point.y) ** 2 >
      minDistance ** 2
    ) {
      simplifiedPoints.push(point);
      currentPoint = point;
    }
  }

  simplifiedPoints.push(lastPoint);

  // Use integer points
  result.points = simplifiedPoints.map(({ x, y }) => ({
    x: Math.round(x),
    y: Math.round(y),
  }));

  return JSON.stringify(result);
}

canvas.addEventListener("pointermove", function (event) {
  if (drawing) {
    addPoint(getPoint(event));
  }
});

canvas.addEventListener("pointerdown", function (event) {
  drawing = true;
  line = {
    color: getColor(),
    size: getSize(),
    points: [getPoint(event)],
  };
  lines.push(line);
});

canvas.addEventListener("pointerup", function (event) {
  if (!drawing) return;
  drawing = false;
  addPoint(getPoint(event));
  line.timestamp = event.timeStamp;

  send(formatLineForTransfer(line));
});
