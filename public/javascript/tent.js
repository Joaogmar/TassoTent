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

function openSettingsPopup() {
    var popup = document.getElementById("settPopup");
    var overlay = document.getElementById("settOverlay");
    popup.style.display = "block";
    popup.classList.remove("hide");
    overlay.style.display = "block";
}

document.getElementById("settButton").addEventListener("click", openSettingsPopup);

document.getElementById("closeSett").addEventListener("click", function() {
    var popup = document.getElementById("settPopup");
    var overlay = document.getElementById("settOverlay");
    popup.classList.add("hide");
    overlay.style.display = "none";
});

document.getElementById("settOverlay").addEventListener("click", function(event) {
    var popup = document.getElementById("settPopup");
    var overlay = document.getElementById("settOverlay");
    if (event.target === overlay) {
        popup.classList.add("hide");
        overlay.style.display = "none";
    }
});

document.getElementById("settPopup").addEventListener("animationend", function(event) {
    if (event.animationName === "slideOut") {
        this.style.display = "none";
    }
});