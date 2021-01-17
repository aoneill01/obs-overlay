import { startFadeSeconds, endFadeSeconds, lineOpacity } from "./constants.js";
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

export function initColorPicker() {
  const colorInput = document.getElementById("color");
  let color = colorInput.value;
  colorInput.addEventListener("input", () => (color = colorInput.value));
  return () => color;
}
