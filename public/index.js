const webSocket = new WebSocket("ws://localhost:3000");

let isConnected = false;

webSocket.onmessage = (evt) => {
  console.log("message received", evt);
};

waitForSocketConnection(webSocket, function () {
  isConnected = true;
  console.log("socket is ready");
});

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      console.log("Connection is made");
      if (callback != null) {
        callback();
      }
    } else {
      console.log("wait for connection...");
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

document.getElementById("form").addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputVal = evt?.target?.input?.value;
  webSocket.send(inputVal);

  document.getElementById("input-text").value = "";
});
