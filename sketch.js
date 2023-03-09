//variáveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro/2;

//variáveis da raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 10
let raqueteAltura = 90
let colidiu = false;

//variáveis da velocidade da bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variáveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente

//variáveis do placar
let meusPontos = 0
let pontosDoOponente = 0

//variáveis dos sons
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop(0,1,0.0008);;
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  colisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentoRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete,yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponenteAuto();
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBola(){
  circle(xBola, yBola, diametro);
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function colisaoBorda(){
  if (xBola + raio> width || xBola - raio< 0){
    velocidadeXBola *= -1;
    }
  
  if (yBola + raio > height || yBola - raio < 0){
    velocidadeYBola *= -1;
  }
}
  
function movimentoRaquete() {
    if (keyIsDown(87)) {
        yRaquete -= 10;
    }
    if (keyIsDown(83)) {
        yRaquete += 10;
    }
  if (yRaquete >= 0){
    yRaquete -= 5;
    }
    if (yRaquete <= (400 - raqueteAltura)){
    yRaquete += 5;
    }
  
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaqueteOponente += 10;
    }
  if (yRaqueteOponente >= 0){
    yRaqueteOponente -= 5;
    }
    if (yRaqueteOponente <= (400 - raqueteAltura)){
    yRaqueteOponente += 5;
    }
}

function verificaColisaoRaquete(){
  if (xBola - raio < xRaquete + raqueteComprimento && yBola - raio < yRaquete + raqueteAltura && yBola + raio > yRaquete){
    velocidadeXBola *= -1;
    raquetada.play();
  }  
}

function verificaColisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBola, yBola, raio);
    if (colidiu) {
        velocidadeXBola *= -1;
        raquetada.play();
    }
}


function movimentaRaqueteOponenteAuto(){
  velocidadeYOponente = yBola - yRaqueteOponente - raqueteComprimento/2 - 30
  yRaqueteOponente += velocidadeYOponente 
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0))
  rect(130,10,40,20);
  fill(255)
  text(meusPontos,150,26);
  fill(color(255,140,0))
  rect(430,10,40,20);
  fill(255)
  text(pontosDoOponente,450,26);
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos +=1;
    ponto.play();
  }
  if (xBola < 10){
    pontosDoOponente +=1;
    ponto.play();
  }
}