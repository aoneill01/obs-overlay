export const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
export const easeLinear = (t) => t;
