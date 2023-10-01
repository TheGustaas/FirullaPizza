// Seleciona todos os elementos de checkbox na página
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// Seleciona o elemento com ID 'carrinho'
const carrinho = document.getElementById('carrinho');

// Adiciona um ouvinte de evento de clique ao elemento 'carrinho'
carrinho.addEventListener('click', function () {
    const valoresSelecionados = [];
    checkboxes.forEach(function (checkbox) {

        // Se o checkbox não estiver marcado, adiciona seu valor ao array 'valoresSelecionados'
        if (!checkbox.checked) {
            valoresSelecionados.push(checkbox.value);
        }
    });

    // Converte os valores selecionados em uma string separada por vírgulas
    const valoresComoString = valoresSelecionados.join(', ');

    // Calcula o total de itens selecionados (não marcados)
    const totalItensSelecionados = checkboxes.length - valoresSelecionados.length;

    // Redireciona para a página 'carrinho.html' com os valores selecionados e o total de itens selecionados
    if (totalItensSelecionados != 0) {
        window.location.href = `carrinho.html?valores=${valoresComoString}&total=${totalItensSelecionados}`;
    } else {

        // Se nenhum item for selecionado, exibe um alerta indicando que o carrinho está vazio
        alert("Carrinho Vazio")
    };
});
