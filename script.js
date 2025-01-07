document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const gameOverScreen = document.getElementById('gameOver');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const finalScoreDisplay = document.getElementById('finalScore');
    
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;
    let bubbleSpeed = 5; // Bubble fall speed (lower is faster)
    let gameInProgress = false;

    // Colors array for bubbles
    const bubbleColors = ['#ff4500', '#9b30b1', '#32cd32', '#ff6347', '#1e90ff', '#ff1493', '#ffa500', '#8a2be2'];

    // Start Game Function
    function startGame() {
        if (gameInProgress) return;
        gameInProgress = true;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        
        // Start the bubble creation
        gameInterval = setInterval(createBubble, 1000);
        
        // Start the countdown timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    // End Game Function
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        gameOverScreen.style.display = 'block';
        finalScoreDisplay.textContent = score;
        gameInProgress = false;

        // Freeze all bubbles by clearing their animation
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            bubble.style.animationPlayState = 'paused'; // Pause bubble fall animation
        });
    }

    // Reset Game Function
    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        gameArea.innerHTML = '';
        score = 0;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = 30;
        startBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
        gameOverScreen.style.display = 'none';
        gameInProgress = false;
    }

    // Function to Create Bubble
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Randomly select a color from the bubbleColors array
        const randomColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        bubble.style.backgroundColor = randomColor;
        
        bubble.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;  // Random horizontal position
        
        // Random movement for bubbles
        const movementDirection = Math.random() > 0.5 ? 'left' : 'right'; // Move bubbles either left or right
        bubble.style.animation = `drop ${bubbleSpeed}s linear infinite, ${movementDirection === 'left' ? 'moveLeft' : 'moveRight'} ${bubbleSpeed}s linear infinite`;

        bubble.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            bubble.remove();  // Remove bubble when clicked
        });

        gameArea.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentElement) {
                bubble.remove();  // Remove bubble if it reaches the bottom without being clicked
                endGame(); // End game if bubble reaches bottom
            }
        }, bubbleSpeed * 1000);  // Bubble expires after the fall time
    }

    // Event Listeners for buttons
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    playAgainBtn.addEventListener('click', resetGame);
});
