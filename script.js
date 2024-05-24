document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameContainer = document.querySelector('.game-container');
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const gameOverScreen = document.getElementById('game-over');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;

    function startGame() {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        document.addEventListener('keydown', handleJump);
        createObstacle();
    }

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let jumpHeight = 0;

        let upInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(upInterval);

                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5;
                    jumpHeight *= gravity;
                    player.style.bottom = `${jumpHeight}px`;
                }, 20);
            }
            jumpHeight += 30;
            jumpHeight *= gravity;
            player.style.bottom = `${jumpHeight}px`;
        }, 20);
    }

    function createObstacle() {
        if (isGameOver) return;

        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        gameContainer.appendChild(obstacle);

        let obstaclePosition = 600;
        obstacle.style.left = `${obstaclePosition}px`;

        let obstacleInterval = setInterval(() => {
            if (obstaclePosition < -50) {
                clearInterval(obstacleInterval);
                gameContainer.removeChild(obstacle);
            } else if (obstaclePosition > 50 && obstaclePosition < 100 && parseInt(player.style.bottom) <= 50) {
                clearInterval(obstacleInterval);
                isGameOver = true;
                document.removeEventListener('keydown', handleJump);
                gameOverScreen.style.display = 'block';
            } else {
                obstaclePosition -= 5;
                obstacle.style.left = `${obstaclePosition}px`;
            }
        }, 20);

        if (!isGameOver) setTimeout(createObstacle, Math.random() * 4000);
    }

    function handleJump(event) {
        if (event.code === 'Space') {
            jump();
        }
    }

    startButton.addEventListener('click', startGame);
});
