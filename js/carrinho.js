// Obtém os parâmetros da URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const valoresRecebidos = urlParams.get('valores');
let contador = 0;

// Redireciona para a página inicial se não houver valores recebidos
if (valoresRecebidos == null) {
  window.location.href = `../index.html`;
}

// Torna o botão visível
document.getElementById('butao').classList.toggle('hidden');

// Remove os itens recebidos da lista
if (valoresRecebidos) {
  const valoresRecebidosArray = valoresRecebidos.split(', ');
  valoresRecebidosArray.forEach(function () {
    const teste = document.getElementById(valoresRecebidosArray[contador]);
    var productRow = teste;
    productRow.remove();
    contador++;
  });
}

// Aguarda o carregamento do DOM para executar o código
document.addEventListener("DOMContentLoaded", function () {

  // Função para atualizar a quantidade de itens no carrinho
  function updateQuantity(input) {
    var productRow = input.parentElement.parentElement;
    var priceElement = productRow.querySelector('.preco');
    var linePriceElement = productRow.querySelector('.precoFinal');
    var price = parseFloat(priceElement.textContent);
    var quantity = parseInt(input.value);
    var linePrice = price * quantity;
    linePriceElement.textContent = linePrice.toFixed(2);
    recalculateCart();
  }

  // Função para remover um item do carrinho
  function removeItem(button) {
    var productRow = button.parentElement.parentElement;
    productRow.remove();
    recalculateCart();
  }

  // Função para recalcular o subtotal e o total do carrinho
  function recalculateCart() {
    var subtotal = 0;
    var total = 0;
    var products = document.querySelectorAll('.item');
    products.forEach(function (product) {
      var linePriceElement = product.querySelector('.precoFinal');
      subtotal += parseFloat(linePriceElement.textContent);
    });
    total = subtotal;

    // Atualiza o total exibido na página
    document.getElementById('total').textContent = subtotal.toFixed(2);

    // Altera a visibilidade dos elementos com base no total
    if (total == 0) {
      document.getElementById('butao').classList.toggle('hidden');
      document.getElementById('alinha').classList.add('hidden');
      document.getElementById('vazio').classList.remove('hidden');
    } else {
      document.getElementById('vazio').classList.add('hidden');
    }
  }

  // Adiciona ouvintes de eventos aos inputs de quantidade
  var quantityInputs = document.querySelectorAll('.quantidade input');
  quantityInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      updateQuantity(this);
    });
  });

  // Adiciona ouvintes de eventos aos botões de remoção
  var removeButtons = document.querySelectorAll('.remover button');
  removeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      removeItem(this);
    });
  });

  // Inicialize o carrinho de compras 
  recalculateCart();
});

// Aguarda o carregamento completo do DOM antes de executar o código JavaScript
document.addEventListener("DOMContentLoaded", function () {
  var total2 = document.getElementById('total').textContent;
  const checkout = document.getElementById('checkout');
  var quantityInputs = document.querySelectorAll('.quantidade input');

  // Adiciona ouvintes de evento a todos os inputs de quantidade
  quantityInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      total2 = document.getElementById('total').textContent;
    });
  });

  // Obtém todos os botões de remoção dentro dos elementos com a classe 'remover'
  var removeButtons = document.querySelectorAll('.remover button');
  removeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      total2 = document.getElementById('total').textContent;
    });
  });

  // Adiciona um ouvinte de evento ao botão de checkout
  checkout.addEventListener('click', function () {
    window.location.href = `checkout.html?total=${total2}&valores=${valoresRecebidos}`;
  });
});
