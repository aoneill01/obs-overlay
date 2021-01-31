import {
  startFadeSeconds,
  endFadeSeconds,
  lineOpacity,
  lineWidth,
} from "./constants.js";
import { easeInOutQuad } from "./easing.js";
import { transformDomain } from "./transform-utils.js";

const formatDigit = (digit) => digit.toString(16).padStart(2, "0");

export function colorForDelta(delta, baseColor, isOther) {
  const alpha = transformDomain(
    delta,
    startFadeSeconds * 1000,
    endFadeSeconds * 1000,
    isOther ? lineOpacity / 2 : lineOpacity,
    0,
    easeInOutQuad
  );
  return `${baseColor}${formatDigit(Math.round(alpha))}`;
}

export function getColor() {
  return document.getElementById("color").value;
}

export function getSize() {
  return lineWidth[document.querySelector('input[name="size"]:checked').value];
}

export function initColor() {
  document.getElementById("color").value = hToRgb(360 * Math.random());
  console.log(getColor());
}

function hToRgb(h) {
  const s = 0.8;
  const l = 0.4;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const toHex = (r, g, b) => {
    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);

    return `#${formatDigit(red)}${formatDigit(green)}${formatDigit(blue)}`;
  };

  if (h < 60) {
    return toHex(c, x, 0);
  }
  if (h < 120) {
    return toHex(x, c, 0);
  }
  if (h < 180) {
    return toHex(0, c, x);
  }
  if (h < 240) {
    return toHex(0, x, c);
  }
  if (h < 300) {
    return toHex(x, 0, c);
  }
  return toHex(c, 0, x);
}
