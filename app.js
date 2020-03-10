/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isPlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(isPlaying){
        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1; // math.random()*6 will give 0 to 5 values

        // 2. Display Result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png';
        //document.querySelector('#current-' + activePlayer).textContent = dice;

        // update the round score if the rolled number is not 1
        if(dice !== 1){
        	// Add score
        	roundScore += dice;
        	document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
        	// Next player
        	nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(isPlaying){
		// add current score to global score
		scores[activePlayer] += roundScore;

		// update the UI
		document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

		// check if player won the game
		if(scores[activePlayer] >= 100){
			document.getElementById('name-'+activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			isPlaying = false;
		} else {
			// Next player
		nextPlayer();
		}
	}
});

function nextPlayer(){
	// Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	//document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.toggle('active');
	//document.querySelector('.player-1-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

// function to initilize all variables to zero and revert applied css classes.
function newGame(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
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
	isPlaying = true;
}