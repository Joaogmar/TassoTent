document.getElementById("door-button").addEventListener("click", function() {
    console.log("Botão clicado!");
    var iconElement = document.getElementById("door-icon");
    if (iconElement.innerText === "door_front") {
        iconElement.innerText = "meeting_room";
    } else {
        iconElement.innerText = "door_front";
    }
});

document.getElementById("fan-button").addEventListener("click", function() {
    console.log("Botão clicado!");
    var iconElement = document.getElementById("fan-icon");
    var textElement = document.getElementById("fan-text");  
    if (iconElement.innerText === "mode_fan") {
        iconElement.innerText = "mode_fan_off";
        textElement.innerText = "Off";
    } else {
        iconElement.innerText = "mode_fan";
        textElement.innerText = "On";
    }
});

document.getElementById("home").addEventListener("click", function() {
    window.location.href = "start.html";
});