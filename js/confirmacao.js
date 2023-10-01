// Obtém os parâmetros da URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tipo = urlParams.get('tipo');
const pagamento = urlParams.get('pagamento');

// Redireciona para a página inicial se não houver valores recebidos
if (tipo == null || pagamento == null) {
    window.location.href = `../index.html`;
}

// Esconde os elementos com IDs 'dinheiro', 'cartao', 'entrega' e 'retirada'
document.getElementById('dinheiro').classList.add('hidden');
document.getElementById('cartao').classList.add('hidden');
document.getElementById('entrega').classList.add('hidden');
document.getElementById('retirada').classList.add('hidden');

// Mostra o elemento correspondente ao tipo de pagamento recebido na URL
if (pagamento == "dinheiro") {
    document.getElementById('dinheiro').classList.remove('hidden');
} else if (pagamento == "cartao") {
    document.getElementById('cartao').classList.remove('hidden');
}

// Mostra o elemento correspondente ao tipo de entrega/retrirada recebido na URL
if (tipo == "retirada") {
    document.getElementById('retirada').classList.remove('hidden');
} else if (tipo == "entrega") {
    document.getElementById('entrega').classList.remove('hidden');
}
