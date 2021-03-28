const dino = document.querySelector('.dino');

const background = document.querySelector('.background');
const pontuacao = document.querySelector('.pontuacao');

let isJumping = false;
let position = 0;
let pontos = 0;
 
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somResgate=document.getElementById("somResgate");

//Música em loop
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();


function handleKeyUp(event) {
  if (event.keyCode === 32){
    console.log("Pressionou o espaço");  
    if(!isJumping){
      jump();      
    }
  }
}

function jump() {

  somResgate.play();
  isJumping = true;

  let upInterval = setInterval(()=>{
    if ( position >= 150){
      clearInterval(upInterval);

      //descendo
      let downInterval = setInterval(() => {
        if ( position <= 0){
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //subindo
      position += 20
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function gameOverMusic() {
  document.body.innerHTML += `<audio src="sons/gameover.mp3" preload="auto" id="somGameover"></audio>`;
  let somGameover=document.getElementById("somGameover");
  somGameover.play();
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = window.innerWidth;
  let randomTime = (Math.random() * 5000 + 1000);

  cactus.classList.add('cactus');
  cactus.style.left = window.innerWidth + 'px';
  background.appendChild(cactus);
  console.log(window.innerWidth);
  
  let leftInterval = setInterval(() => {
    if ( cactusPosition < -60 ){
      clearInterval(leftInterval);
      background.removeChild(cactus);
      pontos += 1;
      pontuacao.innerHTML = `<h1>Pontos: ${pontos}</h1>`;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
      //Game Over
      position = 100;
      const dead = document.createElement('div');
      dino.style.display = 'none';
      dead.innerHTML = "<div id='contato' class='anima'></div>"
      background.appendChild(dead);
      
      somExplosao.play();      
      clearTimeout(timeOut);
      
      setTimeout(() => {
        musica.pause();
        document.body.innerHTML = `<h1 class="game-over">Pontos: ${pontos}</h1><h1 class="game-over">Fim de jogo</h1>`;
        gameOverMusic();
        clearInterval(leftInterval);
      }, 700);

    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  let timeOut = setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);
