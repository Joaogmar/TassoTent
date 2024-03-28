document.getElementById("door-button").addEventListener("click", function() {
    console.log("Botão clicado!");
    var iconElement = document.getElementById("door-icon");
    if (iconElement.innerText === "door_front") {
        iconElement.innerText = "meeting_room";
    } else {
        iconElement.innerText = "door_front";
    }
});
