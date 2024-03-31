document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("loginButton");
    var loginPopup = document.getElementById("loginPopup");
    var closeModalButton = document.getElementById("closeModal");
    var overlay = document.getElementById("overlay");

    loginButton.addEventListener("click", function() {
        // Exibe o popup de login
        loginPopup.style.display = "block";
        overlay.style.display = "block";
    });

    closeModalButton.addEventListener("click", function() {
        // Esconde o popup de login
        loginPopup.style.display = "none";
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", function() {
        loginPopup.style.display = "none";
        overlay.style.display = "none";
    });
});
