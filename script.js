// Variáveis globais
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreValue = document.getElementById('scoreValue');

// Configurações do jogo
let carWidth = 50;
let carHeight = 80;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;
let carSpeed = 5;

let obstacles = [];
let score = 0;
let gameInterval;
let obstacleSpeed = 2;
let isGameOver = false;

// Função para inicializar o canvas
function setupCanvas() {
    canvas.width = 600;
    canvas.height = 400;
}

// Função para desenhar o carro
function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Função para desenhar os obstáculos
function drawObstacles() {
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Função para criar novos obstáculos
function createObstacle() {
    const width = Math.random() * (100 - 50) + 50;
    const x = Math.random() * (canvas.width - width);
    obstacles.push({ x, y: -50, width, height: 50 });
}

// Função para mover os obstáculos
function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacleSpeed;
    });

    // Remover obstáculos que saíram da tela
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Função para detectar colisões
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        if (carX < obs.x + obs.width &&
            carX + carWidth > obs.x &&
            carY < obs.y + obs.height &&
            carY + carHeight > obs.y) {
            gameOver();
        }
    }
}

// Função de fim de jogo
function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    restartButton.style.display = 'block';
}

// Função de desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();
    drawObstacles();
    moveObstacles();
    checkCollisions();

    // Atualizar a pontuação
    score++;
    scoreValue.textContent = score;

    if (Math.random() < 0.02) {
        createObstacle();
    }
}

// Função para iniciar o jogo
function startGame() {
    isGameOver = false;
    score = 0;
    obstacles = [];
    carX = canvas.width / 2 - carWidth / 2;
    gameInterval = setInterval(drawGame, 1000 / 60);
    restartButton.style.display = 'none';
    startButton.style.display = 'none';
}

// Função para reiniciar o jogo
function restartGame() {
    startGame();
}

// Função para mover o carro
function moveCar(event) {
    if (isGameOver) return;
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        if (carX > 0) carX -= carSpeed;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        if (carX < canvas.width - carWidth) carX += carSpeed;
    }
}

// Adiciona eventos de teclado para mover o carro
window.addEventListener('keydown', moveCar);

// Eventos dos botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Configuração inicial do canvas
setupCanvas();
