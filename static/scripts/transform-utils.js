import { easeLinear } from "./easing.js";

export function transformDomain(
  value,
  sourceStart,
  sourceEnd,
  destinationStart,
  destinationEnd,
  easing = easeLinear
) {
  const t = clamp((value - sourceStart) / (sourceEnd - sourceStart), 0, 1);
  return destinationStart + (destinationEnd - destinationStart) * easing(t);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
