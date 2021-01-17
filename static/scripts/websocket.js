export function initWebSocket(onMessage) {
  const socket = new WebSocket(`ws://${location.host}/lines`);

  socket.addEventListener("message", onMessage);

  return socket;
}
