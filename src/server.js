const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

// Serving the static files
app.use(express.static("public"));

let classroom = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    let parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "new-student":
        classroom.push({
          name: parsedMessage.name,
          sliderValue: parsedMessage.sliderValue,
          id: parsedMessage.id,
        });
        break;
      case "update-slider":
        let studentIndex = classroom.findIndex((student) => student.id === parsedMessage.id);
        if (studentIndex != -1) {
          classroom[studentIndex].sliderValue = parsedMessage.sliderValue;
        }
        break;
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(classroom));
      }
    });
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
