document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("loginButton");
    var loginPopup = document.getElementById("loginPopup");
    var closeModalButton = document.getElementById("closeModal");
    var overlay = document.getElementById("overlay");

    loginButton.addEventListener("click", function() {

        loginPopup.style.display = "block";
        overlay.style.display = "block";
        setTimeout(function() {
            loginPopup.style.opacity = "1";
            loginPopup.style.transform = "scale(1) translate(-50%, -50%)";
            overlay.style.opacity = "1";
        }, 10);
    });

    closeModalButton.addEventListener("click", function() {
        // Esconde o popup de login
        loginPopup.style.opacity = "0";
        loginPopup.style.transform = "scale(0.8) translate(-50%, -50%)";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    });

    overlay.addEventListener("click", function() {
        loginPopup.style.opacity = "0";
        loginPopup.style.transform = "scale(0.8) translate(-50%, -50%)";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    });
});
