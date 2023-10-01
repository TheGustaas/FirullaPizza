var c = document.getElementById('c'),
  ctx = c.getContext('2d'),
  cw = c.width = window.innerWidth,
  ch = c.height = window.innerHeight,
  points = [],
  tick = 0,

  // Configurações para os pontos e a forma
  opt = {
    count: 5, // Número de pontos
    range: {
      x: 20,  // Variação horizontal dos pontos
      y: 80   // Variação vertical dos pontos
    },
    duration: {
      min: 100, // Duração mínima da animação de um ponto
      max: 200  // Duração máxima da animação de um ponto
    },
    thickness: 10,  // Espessura da linha
    level: .60,     // Nível vertical dos pontos
    curved: true    // Se a forma é curvada
  },
  rand = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  },
  ease = function (t, b, c, d) {

    // Função de easing para suavizar a animação dos pontos
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  };
ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
ctx.strokeStyle = 'orange'; // Define a cor da linha como laranja

// Defina a cor da forma inicial como #fbbe05 antes de renderizá-la
ctx.fillStyle = '#fbbe05';

// Definição do objeto Point para gerenciar cada ponto na animação
var Point = function (config) {
  this.anchorX = config.x;
  this.anchorY = config.y;
  this.x = config.x;
  this.y = config.y;
  this.setTarget();
};

// Define os pontos iniciais e os pontos-alvo para animação
Point.prototype.setTarget = function () {
  this.initialX = this.x;
  this.initialY = this.y;
  this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
  this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
  this.tick = 0;
  this.duration = rand(opt.duration.min, opt.duration.max);
}

// Atualiza a posição do ponto com base nos pontos-alvo e na animação de easing
Point.prototype.update = function () {
  var dx = this.targetX - this.x;
  var dy = this.targetY - this.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if (Math.abs(dist) <= 0) {
    this.setTarget();
  } else {
    var t = this.tick;
    var b = this.initialY;
    var c = this.targetY - this.initialY;
    var d = this.duration;
    this.y = ease(t, b, c, d);
    b = this.initialX;
    c = this.targetX - this.initialX;
    d = this.duration;
    this.x = ease(t, b, c, d);
    this.tick++;
  }
};

// Renderiza o ponto no canvas
Point.prototype.render = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
  ctx.fill();
};

// Atualiza todos os pontos na animação
var updatePoints = function () {
  var i = points.length;
  while (i--) {
    points[i].update();
  }
};

// Renderiza todos os pontos no canvas
var renderPoints = function () {
  var i = points.length;
  while (i--) {
    points[i].render();
  }
};

// Renderiza a forma com base nos pontos
var renderShape = function () {
  ctx.beginPath();
  var pointCount = points.length;
  ctx.moveTo(points[0].x, points[0].y);
  var i;
  for (i = 0; i < pointCount - 1; i++) {
    var c = (points[i].x + points[i + 1].x) / 2;
    var d = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
  }
  ctx.lineTo(-opt.range.x - opt.thickness, opt.thickness);
  ctx.lineTo(cw + opt.range.x + opt.thickness, opt.thickness);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

// Limpa o canvas
var clear = function () {
  ctx.clearRect(0, 0, cw, ch);
};

// Função de loop principal para animação contínua
var loop = function () {
  window.requestAnimFrame(loop, c);
  tick++;
  clear();
  updatePoints();
  renderShape();
};

// Inicialização dos pontos com base nas configurações
var i = opt.count + 2;
var spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
while (i--) {
  points.push(new Point({
    x: (spacing * (i - 1)) - opt.range.x,
    y: ch - (ch * opt.level)
  }));
}

// Solicitação de animação do loop principal
window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

// Inicia o loop de animação
loop();

// Função para mudar a imagem do ícone
function mudaFoto(foto) {
  document.getElementById("icone").src = foto;
}