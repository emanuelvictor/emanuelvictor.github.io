let gameStoped = false;
const multiplier = 0.02;
let timeOfAnimationOfPipe = 2000;
const mario = document.querySelector('.mario');
const clouds = document.querySelector('.clouds');
clouds.timeOfAnimation = 10; //s
const points = document.querySelector('.points');

const calculateMilisecondsOfAnimationOfPipe = () => {
  return (timeOfAnimationOfPipe - (timeOfAnimationOfPipe * multiplier));
}

const addPipe = () => {
  const img = document.createElement('img');
  img.src = "./images/pipe.png";
  img.classList.add("pipe");
  img.id = 'pipe';
  timeOfAnimationOfPipe = calculateMilisecondsOfAnimationOfPipe();
  img.style.animation = 'pipe-animation ' + timeOfAnimationOfPipe + 'ms infinite linear';
  document.querySelector('.game-board').appendChild(img)
}

const removePipe = () => {
  remove(document.querySelector('.pipe'));
}

const remove = (element) => {
  if (element)
    element.remove()
}

clouds.stop = (cloudsPosition) => {
  clouds.style.animation = 'none';
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
  mario.style.animation = 'none';
  mario.style.bottom = jumpHeight + 'px';
}

mario.lose = (jumpHeight) => {
  mario.src = '../images/game-over.png';
  mario.style.width = '75px';
  mario.style.left = '50px';
  mario.stop(jumpHeight);
}

const stopGame = (pipePosition, marioJumpHeigth, cloudsPosition) => {
  const pipe = document.getElementById('pipe');
  stop(pipe, pipePosition);
  mario.lose(marioJumpHeigth);
  clouds.stop(cloudsPosition);
  gameStoped = true;
  // clearInterval(loop);
}

stop = (object, position) => {
  object.style.animation = 'none';
  object.style.left = position + 'px';
}

let roundCount = -1;
const startRound = () => {

  roundCount = roundCount + 1;
  points.textContent = "Points: " + roundCount;
  addPipe();
  const timeOfNewTry = calculateMilisecondsOfAnimationOfPipe();
  setTimeout(tryAgain, timeOfNewTry);
}

const tryAgain = () => {
  if (!gameStoped) {
    removePipe();
    startRound();
  }
}


// const newRound = setInterval(tryAgain, 2000);

tryAgain();

const loop = setInterval(() => {

  const pipe = document.getElementById('pipe');
  if (pipe) {
    const pipePosition = pipe.offsetLeft;
    const marioJumpHeigth = mario.jumpHeight();
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioJumpHeigth < 100) {
      stopGame(pipePosition, marioJumpHeigth, cloudsPosition);
    }
  }

}, 10);

document.addEventListener('keydown', mario.jump);
