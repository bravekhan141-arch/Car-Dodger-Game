const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');

let car = {
    x: 175,
    y: 450,
    width: 50,
    height: 80,
    speed: 5
};

let obstacles = [];
let score = 0;
let gameRunning = false;
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startBtn.addEventListener('click', startGame);

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    score = 0;
    obstacles = [];
    car.x = 175;
    scoreElement.textContent = score;
    startBtn.textContent = 'Playing...';
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Move car
    if (keys['ArrowLeft'] && car.x > 0) {
        car.x -= car.speed;
    }
    if (keys['ArrowRight'] && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }

    // Create obstacles
    if (Math.random() < 0.02) {
        obstacles.push({
            x: Math.random() * (canvas.width - 50),
            y: -80,
            width: 50,
            height: 80,
            speed: 3 + score / 100
        });
    }

    // Move obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += obstacles[i].speed;

        // Remove off-screen obstacles
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score += 10;
            scoreElement.textContent = score;
        }

        // Check collision
        if (checkCollision(car, obstacles[i])) {
            gameOver();
        }
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw road lines
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw car
    ctx.fillStyle = 'red';
    ctx.fillRect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(car.x + 5, car.y + 10, car.width - 10, 20);

    // Draw obstacles
    ctx.fillStyle = 'yellow';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameOver() {
    gameRunning = false;
    startBtn.textContent = 'Game Over! Play Again';
    alert('Game Over! Score: ' + score);
      }
