// Esconde os elementos com IDs 'endereco', 'bairro', 'cidade', 'linha' e 'confirmar'
document.getElementById('endereco').classList.add('hidden');
document.getElementById('bairro').classList.add('hidden');
document.getElementById('cidade').classList.add('hidden');
document.getElementById('linha').classList.add('hidden')
document.getElementById('confirmar').classList.add('hidden');

// Obtém os parâmetros da URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const total = urlParams.get('total');

// Redireciona para a página inicial se não houver valor total na URL
if (total == null) {
    window.location.href = `../index.html`;
}

// Obtém valores da URL e exibe o valor total na página
const valoresRecebidos = urlParams.get('valores');
const totalElement = document.getElementById('total');
totalElement.textContent = `Valor total: R$ ${total}`;

// Adiciona um evento de clique ao elemento com ID 'carrinho', redirecionando para carrinho.html com os valores recebidos na URL
carrinho.addEventListener('click', function () {
    window.location.href = `carrinho.html?valores=${valoresRecebidos}`;
});

// Aguarda o carregamento do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona elementos relevantes do DOM
    let checkpag = document.querySelectorAll('.pagamento');
    let checktipo = document.querySelectorAll('.tipo');
    let entrega = document.getElementById('entrega');
    let retirada = document.getElementById('retirada');
    let dinheiro = document.getElementById('dinheiro');
    let cartao = document.getElementById('cartao');
    let rua = document.getElementById('rua');
    let cidade2 = document.getElementById('cidade2');
    let bairro2 = document.getElementById('bairro2');
    let cep = document.getElementById('cep');
    let numero = document.getElementById('numero');

    // Adiciona eventos de alteração aos elementos relevantes
    entrega.addEventListener('change', function () {

        // Mostra os elementos de endereço se a entrega for selecionada, senão os esconde
        document.getElementById('endereco').classList.remove('hidden');
        document.getElementById('bairro').classList.remove('hidden');
        document.getElementById('cidade').classList.remove('hidden');
        document.getElementById('linha').classList.remove('hidden');
        handleChanges();
    });
    retirada.addEventListener('change', function () {

        // Esconde os elementos de endereço se a retirada for selecionada
        document.getElementById('endereco').classList.add('hidden');
        document.getElementById('bairro').classList.add('hidden');
        document.getElementById('cidade').classList.add('hidden');
        document.getElementById('linha').classList.add('hidden');
        handleChanges();
    });
    dinheiro.addEventListener('change', function () {
        handleChanges();
    });
    cartao.addEventListener('change', function () {
        handleChanges();
    });
    rua.addEventListener('change', function () {
        handleChanges();
    });
    cidade2.addEventListener('change', function () {
        handleChanges();
    });
    bairro2.addEventListener('change', function () {
        handleChanges();
    });
    cep.addEventListener('change', function () {
        handleChanges();
    });
    numero.addEventListener('change', function () {
        handleChanges();
    });

    // Função para lidar com mudanças nos elementos do formulário
    function handleChanges() {
        checkpag.forEach(function (checkbox) {
            let rua = document.getElementById('rua');
            let bairro2 = document.getElementById('bairro2');
            let cidade2 = document.getElementById('cidade2');
            let numero = document.getElementById('numero');
            let cep = document.getElementById('cep');
            let valida = 0;
            if (checkbox.checked) {
                checktipo.forEach(function (checkbox) {
                    if (checkbox.value == 'retirada' && checkbox.checked) {

                        // Mostra o botão de confirmação se a retirada for selecionada
                        document.getElementById('confirmar').classList.remove('hidden');
                        document.getElementById('confirmar').focus();
                    } else if (checkbox.value == 'entrega' && checkbox.checked && rua.value !== "" && bairro2.value !== "" && cidade2.value !== "" && numero.value !== "" && cep.value !== "") {

                        // Mostra o botão de confirmação se a entrega for selecionada e os campos de endereço estiverem preenchidos
                        document.getElementById('confirmar').classList.remove('hidden');
                        document.getElementById('confirmar').focus();
                        valida = 1;
                    } else if (valida == 0) {

                        // Esconde o botão de confirmação se os critérios não forem atendidos
                        document.getElementById('confirmar').classList.add('hidden');
                    };
                });
            }
        });
    }

    // Adiciona um evento de clique ao elemento com ID 'confirmar', redirecionando para confirmacao.html com os tipos de pagamento selecionados
    confirmar.addEventListener('click', function () {
        const pagamento = [];
        checkpag.forEach(function (checkbox) {
            if (checkbox.checked) {
                pagamento.push(checkbox.value);
                checkpag = pagamento
            }
        });
        const tipo = [];
        checktipo.forEach(function (checkbox) {
            if (checkbox.checked) {
                tipo.push(checkbox.value);;
                checktipo = tipo
            }
        });
        window.location.href = `confirmacao.html?tipo=${checktipo}&pagamento=${checkpag}`;
    });
});