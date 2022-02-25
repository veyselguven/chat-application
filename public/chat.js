//we connect with browser and server here
const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// we control here click process,if we have click ,
//we have to connect to at server-socket,
//in there we have to set up  bridge , in this way it goes from browser to server , from server to browser
// first of all we have to send our socket information from here
submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
});

// we catch the information from socket here and we need to run

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.sender + ": </strong>" + data.message + "</p>";
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = "<p>" + data + " is typing...</p>";
});
