// Adiciona um ouvinte de evento de clique ao elemento com ID "loginMenu"
document.getElementById("loginMenu").addEventListener("click", function () {
    // Exibe o popup de login
    document.getElementById("loginPopup").style.display = "block";
});

// Adiciona um ouvinte de evento de clique ao elemento com ID "cadastroMenu"
document.getElementById("cadastroMenu").addEventListener("click", function () {

    // Exibe o popup de cadastro
    document.getElementById("cadastroPopup").style.display = "block";
});

// Adiciona um ouvinte de evento de clique ao botão de fechar no popup de login
document.getElementById("closeLoginPopup").addEventListener("click", function () {
    // Esconde o popup de login, reseta o formulário e limpa mensagens de erro
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("loginForm").reset();
    document.getElementById("errorLogin").textContent = "";
});

// Adiciona um ouvinte de evento de clique ao botão de fechar no popup de cadastro
document.getElementById("closeCadastroPopup").addEventListener("click", function () {
    // Esconde o popup de cadastro, reseta o formulário e limpa mensagens de erro
    document.getElementById("cadastroPopup").style.display = "none";
    document.getElementById("cadastroForm").reset();
    document.getElementById("errorCadastro").textContent = "";
});

// Adiciona um ouvinte de evento de clique global para fechar o popup se clicar fora dele
window.addEventListener("click", function (event) {

    // Fecha o popup de login se o clique for fora dele
    if (event.target === document.getElementById("loginPopup")) {
        document.getElementById("loginPopup").style.display = "none";
        document.getElementById("loginForm").reset();
        document.getElementById("errorLogin").textContent = "";
    }

    // Fecha o popup de cadastro se o clique for fora dele
    if (event.target === document.getElementById("cadastroPopup")) {
        document.getElementById("cadastroPopup").style.display = "none";
        document.getElementById("cadastroForm").reset();
        document.getElementById("errorCadastro").textContent = "";
    }
});

// Adiciona um ouvinte de evento de envio ao formulário de login
document.getElementById("loginForm").addEventListener("submit", function (event) {

    // Impede o envio do formulário
    event.preventDefault();

    // Valores válidos para login
    const validUsername = "usuario";
    const validPassword = "senha123";

    // Obtém os valores digitados pelo usuário
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    // Verifica se o login é bem-sucedido
    if (enteredUsername === validUsername && enteredPassword === validPassword) {

        // Exibe mensagem de sucesso, armazena um token de autenticação e redireciona para a página de pedidos
        document.getElementById("errorLogin").textContent = "Login bem-sucedido!";
        localStorage.setItem('authToken', 'token_de_autenticacao');
        window.location.href = "./html/pedidos.html";
    } else {

        // Exibe mensagem de erro se o login falhar
        document.getElementById("errorLogin").textContent = "Nome de usuário ou senha inválidos.";
    }
});

// Adiciona um ouvinte de evento de envio ao formulário de cadastro
document.getElementById("cadastroForm").addEventListener("submit", function (event) {

    // Impede o envio do formulário
    event.preventDefault();

    // Obtém os valores digitados pelo usuário
    const enteredUsername = document.getElementById("newUsername").value;
    const enteredPassword = document.getElementById("newPassword").value;
    const enteredPasswordConfirm = document.getElementById("newPasswordConfirm").value;

    // Verifica se a senha é usada como nome de usuário
    if (enteredUsername === enteredPassword) {

        // Exibe mensagem de erro
        document.getElementById("errorCadastro").textContent = "A senha não pode ser usada como nome de usuário!";
    } else {

        // Verifica se as senhas coincidem
        if (enteredPassword != enteredPasswordConfirm) {

            // Exibe mensagem de erro se as senhas são diferentes
            document.getElementById("errorCadastro").textContent = "As senhas são diferentes!";
        } else {

            // Exibe mensagem de sucesso, armazena um token de autenticação e redireciona para a página de pedidos
            localStorage.setItem('authToken', 'token_de_autenticacao');
            document.getElementById("errorCadastro").textContent = "Cadastro bem-sucedido!";
            window.location.href = "./html/pedidos.html";
        }
    }
});