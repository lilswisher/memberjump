document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const obstacle = document.getElementById('obstacle');
    let isJumping = false;
    let gravity = 0.9;
    let obstacleSpeed = 2;

    function jump() {
        if (!isJumping) {
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
    }

    function generateObstacle() {
        let obstaclePosition = 600;
        obstacle.style.right = `${obstaclePosition}px`;

        let obstacleInterval = setInterval(() => {
            if (obstaclePosition < -50) {
                clearInterval(obstacleInterval);
                generateObstacle();
            } else {
                obstaclePosition -= obstacleSpeed;
                obstacle.style.right = `${obstaclePosition}px`;
            }
        }, 20);
    }

    generateObstacle();

    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            jump();
        }
    });
});
