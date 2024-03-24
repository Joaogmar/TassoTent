document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('loginButton');
    var modal = document.getElementById('loginPopup');
    var closeModalButton = document.querySelector('.closeModal');
    var overlay;

    button.addEventListener('click', function () {
        modal.style.display = 'block';
        // Cria o overlay
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        // Define a função para fechar o modal e remover o overlay
        function closeModal() {
            modal.style.display = 'none';
            overlay.remove();
        }
        // Adiciona evento de clique no overlay para fechar o modal
        overlay.addEventListener('click', closeModal);
        // Adiciona evento de clique no botão de fechar para fechar o modal
        closeModalButton.addEventListener('click', closeModal);
    });
});
