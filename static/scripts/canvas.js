import { colorForDelta, getSize } from "./colors.js";
import { endFadeSeconds } from "./constants.js";

export function draw(canvas, ctx, lines, timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const line of lines) {
    const [first, ...rest] = line.points;
    if (first && rest.length) {
      ctx.beginPath(first.x, first.y);
      for (const { x, y } of rest) {
        ctx.lineTo(x, y);
      }

      const delta = timestamp - (line.timestamp ?? timestamp);
      ctx.strokeStyle = colorForDelta(delta, line.color, line.isOther);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = line.size;
      ctx.stroke();
    }
  }
}

export function clearLines(lines, timestamp) {
  return lines.filter(
    (line) => timestamp - (line.timestamp ?? timestamp) <= endFadeSeconds * 1000
  );
}

export function getPoint({ offsetX, offsetY }) {
  return {
    x: offsetX,
    y: offsetY,
  };
}
