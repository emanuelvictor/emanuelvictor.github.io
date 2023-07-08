const gameBoard = document.querySelector('.game-board');
const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const clouds = document.querySelector('.clouds');

pipe.stop = (pipePosition) => {
    pipe.style.animation = 'nome';
    // const gameBoardWidth = window.getComputedStyle(gameBoard).width.replace('px', '');
    // const pipeRight = window.getComputedStyle(pipe).right.replace('px', '');
    // const pipeLeftPosition = gameBoardWidth - pipeRight;
    // pipe.style.left = pipeLeftPosition + 'px';
    pipe.style.left = pipePosition + 'px';
}

clouds.stop = (cloudsPosition) => {
    clouds.style.animation = 'nome';
    clouds.style.left = cloudsPosition + 'px';
}

mario.jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 750)
}

mario.jumpHeight = function () {
    return +window.getComputedStyle(mario).bottom.replace('px', '');
}

mario.stop = (jumpHeight) => {
    mario.style.animation = 'nome';
    mario.style.bottom = jumpHeight + 'px';
}

mario.lose = (jumpHeight) => {
    mario.src = '../images/game-over.png';
    mario.style.width = '75px';
    mario.style.left = '50px';
    mario.stop(jumpHeight);
}

const stopGame = (pipePosition, marioJumpHeigth, cloudsPosition) => {
    pipe.stop(pipePosition);
    mario.lose(marioJumpHeigth);
    clouds.stop(cloudsPosition);
    clearInterval(loop);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioJumpHeigth = mario.jumpHeight();
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioJumpHeigth < 100) {
        stopGame(pipePosition, marioJumpHeigth, cloudsPosition);
    }

}, 1)

document.addEventListener('keydown', mario.jump);
