// Aguarde o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {

    // Verifica se o token de autenticação está presente no localStorag
    if (localStorage.getItem('authToken')) {
        // Redirecione o usuário para a página de login
        console.log('O usuário está logado');
    } else {
        // O usuário não está logado, redirecione para a página de login
        window.location.href = '../index.html';
        console.log('O usuário está deslogado');
    }
});

// Adiciona um ouvinte de evento de clique ao elemento com ID "logout"
document.getElementById("logout").addEventListener("click", function () {

    // Remove o token de autenticação do localStorage
    localStorage.removeItem('authToken');

    // Redireciona o usuário para a página inicial (página de login) e exibe mensagem de log
    window.location.href = "../index.html";
    console.log('O usuário não está logado');
});

