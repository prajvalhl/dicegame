/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 

*/

var scores, roundScores, activePlayer, isPlaying, lastDice;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(isPlaying){
        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-'+dice+'.png';

        // 3. Update the round score IF the rolled number was NOT 1 or two 6's
        if(dice === 6 && lastDice === 6){
            // Player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
            twoSixAlert();
        } else if(dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
            oneAlert();
        }
    }
    lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isPlaying){
        // 1. Add current score to the Global score
        scores[activePlayer] += roundScore;

        // 2. Update UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // 3. Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            isPlaying = false;
        } else {
            // 4. Next player
            nextPlayer();
            document.querySelector('.dice').style.display = 'none';
            lastDice = 0;
        }
    }
});

function nextPlayer(){
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isPlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value = '';
}

function oneAlert(){
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    
    toastr["warning"]("Uh oh! You rolled a 1, As a result, your CURRENT score has been reset to 0, but your MAIN score is safe. And it's the Next Player's turn. If you have just started the round, then there's nothing to lose.")
}

function twoSixAlert(){
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    
    toastr["error"]("Uh oh! You rolled two 6's in a row. As a result, you have lost your ENTIRE score! And it's the Next Player's turn. If you have just started, then there's nothing to lose.")
}
