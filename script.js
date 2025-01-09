const scoreDisplay = document.getElementById("score");
let canPlay = true;
let gameStarted = false;
let scoreCount = 0;
 let timeLeft = 5;
  const resetButton = document.getElementById("buttonreset");
  const button = document.getElementById("button-clicker");


function handleGameButton() {


  button.addEventListener("click", () => {
    if (!gameStarted) {
      gameStarted = true;
      
      startTimer();
    }

    if (canPlay) {
      scoreCount++;
    }
    scoreDisplay.innerHTML = scoreCount;
  });
  
}

function startTimer() {
  const htmlTimer = document.getElementById("timer");
 

  for (let i = timeLeft; i >= 0; i--) {
    setTimeout(() => {
      htmlTimer.innerHTML = `temps restant : ${i}`;

      if (i == 0) {
        canPlay = false;
        
        
      }

      if (i <= 0){
  resetButton.disabled=false;
  console.log('ca passe plus')
 } else{
  resetButton.disabled = true;
  console.log('ca passe')
 }
    }, (timeLeft - i) * 1000);

  }
 
}

function handleResetButton() {
resetButton.addEventListener("click", () => {
    canPlay = true;
    gameStarted = false;
    scoreCount = 0;
    scoreDisplay.innerHTML = scoreCount;
  });
  
}
handleGameButton();
handleResetButton();

