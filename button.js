let currentGame = [];
// make a reset button and initialize the game board and remove yourself
startButton = document.getElementById('start');
startButton.addEventListener('click', function(){
    makeResetButton();
 //   rebuild();
 //   showMessage(`Your score: ${score}`);
    currentGame = new Game();
    startButton.remove()
  })


  // invoked when pressing start
  function makeResetButton() {
    const buttonBox = document.querySelector(".button-container");
    const resetButton = document.createElement("button");
    resetButton.setAttribute('id', 'reset');
    resetButton.classList.add('button');
    resetButton.innerText = "Reset";
    resetButton.addEventListener('click', function(){
        currentGame.destroyGame();
        currentGame = new Game();
    })
    buttonBox.append(resetButton);
  }