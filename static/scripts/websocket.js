export function initWebSocket(onMessage) {
  let socket;

  function init(reconnectDelay = 500) {
    socket = new WebSocket(`ws://${location.host}/lines`);

    socket.addEventListener("message", onMessage);
    socket.addEventListener("open", () => {
      reconnectDelay = 100;
      console.log("Socket opened");
    });
    socket.addEventListener("close", () => {
      console.log("Socket closed");
      setTimeout(init, reconnectDelay, reconnectDelay * 2);
    });
    socket.addEventListener("error", console.error);
  }

  init();

  return (message) => socket.send(message);
}
