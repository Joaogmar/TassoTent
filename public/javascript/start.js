document.addEventListener('DOMContentLoaded', function () {
    
    var button = document.getElementById('loginButton');
    var modal = document.getElementById('loginPopup');
    var closeModalButton = document.querySelector('.closeModal');
    var overlay;

    button.addEventListener('click', function () {
        modal.style.display = 'block';
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function () {
            modal.style.display = 'none';
            overlay.remove();
        });
    });
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.remove(); 
    });
});
