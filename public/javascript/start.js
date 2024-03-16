document.addEventListener('DOMContentLoaded', function () {
    
    var button = document.getElementById('loginButton');

   
    button.addEventListener('click', function () {
        
        var loginPopup = window.open('login.html', 'loginPopup', 'width=400,height=400');

        
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        var checkPopupClosed = setInterval(function() {
            if (loginPopup.closed) {
                overlay.remove();
                clearInterval(checkPopupClosed);
            }
        }, 1000); 
    });
});
