document.addEventListener("DOMContentLoaded", function() {
    var nextButton = document.getElementById("nextButton");
    var loginPopup = document.getElementById("loginPopup");
    var closeModalButton = document.getElementById("closeModal");
    var overlay = document.getElementById("overlay");

    nextButton.addEventListener("click", function() {
        loginPopup.style.display = "block";
        overlay.style.display = "block";
        document.body.classList.add("no-scroll");
        setTimeout(function() {
            loginPopup.style.opacity = "1";
            loginPopup.style.transform = "scale(1) translate(-50%, -50%)";
            overlay.style.opacity = "1";
        }, 10);
    });

    closeModalButton.addEventListener("click", function() {
        loginPopup.style.opacity = "0";
        loginPopup.style.transform = "scale(0.8) translate(-50%, -50%)";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }, 300);
    });

    overlay.addEventListener("click", function() {
        loginPopup.style.opacity = "0";
        loginPopup.style.transform = "scale(0.8) translate(-50%, -50%)";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const bodyScroll = new PerfectScrollbar('body');
});