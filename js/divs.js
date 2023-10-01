// Função para mostrar o próximo div de sabores
function mostrarProximo(divId) {
    const divs = document.querySelectorAll(`#${divId} .sabores`);
    for (let i = 0; i < divs.length; i++) {
        if (!divs[i].classList.contains('hidden')) {
            divs[i].classList.add('hidden');
            if (i < divs.length - 1) {
                divs[i + 1].classList.remove('hidden');
                break;
            } else {
                divs[0].classList.remove('hidden'); // Volta para o primeiro se chegou ao último
                break;
            }
        }
    }
}

// Função para mostrar o div de sabores anterior
function mostrarAnterior(divId) {
    const divs = document.querySelectorAll(`#${divId} .sabores`);
    for (let i = 0; i < divs.length; i++) {
        if (!divs[i].classList.contains('hidden')) {
            divs[i].classList.add('hidden');
            if (i > 0) {
                divs[i - 1].classList.remove('hidden');
                break;
            } else {
                divs[divs.length - 1].classList.remove('hidden'); // Volta para o último se chegou ao primeiro
                break;
            }
        }
    }
}

// Adicione eventos de clique aos botões "Anterior" e "Próximo" de cada categoria
document.querySelector('#tradicional .anterior').addEventListener('click', function () {
    mostrarAnterior('tradicional');
});
document.querySelector('#tradicional .proximo').addEventListener('click', function () {
    mostrarProximo('tradicional');
});
document.querySelector('#bebida .anterior').addEventListener('click', function () {
    mostrarAnterior('bebida');
});
document.querySelector('#bebida .proximo').addEventListener('click', function () {
    mostrarProximo('bebida');
});

// Função para alternar a visibilidade dos elementos
function toggleElements(tradicionalVisible, doceVisible, bebidaVisible) {
    document.getElementById('tradicional').classList.toggle('hidden', !tradicionalVisible);
    document.getElementById('doce').classList.toggle('hidden', !doceVisible);
    document.getElementById('bebida').classList.toggle('hidden', !bebidaVisible);
}

// Adicione manipuladores de eventos aos botões de categoria
document.getElementById('tradicionalBtn').addEventListener('click', function () {
    toggleElements(true, false, false);
});
document.getElementById('docesBtn').addEventListener('click', function () {
    toggleElements(false, true, false);
});
document.getElementById('bebidasBtn').addEventListener('click', function () {
    toggleElements(false, false, true);
});