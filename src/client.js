let student = null;

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;

  student = {
    name,
    sliderValue: 0,
    id: generateUUID(), // unique identifier for each student
  };

  ws.send(JSON.stringify({ type: "new-student", ...student }));
});

document.getElementById("slider").addEventListener("input", (e) => {
  if (student) {
    student.sliderValue = e.target.value;
    ws.send(JSON.stringify({ type: "update-slider", ...student }));
  }
});

const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (message) => {
  const classroom = JSON.parse(message.data);
  document.getElementById("classroom").innerHTML = "";
  classroom.forEach((student) => {
    const studentDiv = document.createElement("div");
    studentDiv.textContent = `${student.name}: ${"*".repeat(student.sliderValue / 10)}`;
    document.getElementById("classroom").appendChild(studentDiv);
  });
};

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
