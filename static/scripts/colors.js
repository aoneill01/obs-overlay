import {
  startFadeSeconds,
  endFadeSeconds,
  lineOpacity,
  lineWidth,
} from "./constants.js";
import { easeInOutQuad } from "./easing.js";
import { transformDomain } from "./transform-utils.js";

export function colorForDelta(delta, baseColor, isOther) {
  const alpha = transformDomain(
    delta,
    startFadeSeconds * 1000,
    endFadeSeconds * 1000,
    isOther ? lineOpacity / 2 : lineOpacity,
    0,
    easeInOutQuad
  );
  return `${baseColor}${Math.round(alpha).toString(16).padStart(2, "0")}`;
}

export function getColor() {
  return document.getElementById("color").value;
}

export function getSize() {
  return lineWidth[document.querySelector('input[name="size"]:checked').value];
}
