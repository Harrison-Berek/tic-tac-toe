/*----- constants -----*/ 
const colorLookUp = {
    'null': 'white',
    '1': 'orange',
    '-1': 'lightblue'
}; 

const winCombos = [[0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

/*----- app's state (variables) -----*/
let board, turn, winner;	

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const boxEls = [...document.querySelectorAll(".boxes")];
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('.board').addEventListener('click', handleChoice);
replayBtn.addEventListener('click', init);
replayBtn.addEventListener('click', clearBoard);

/*----- functions -----*/
init ();

function init() {
    board = [
        null, null, null,
        null, null, null, 
        null, null, null
    ]
    turn = 1;
    winner = null; 
    render ();
}

function clearBoard() {
    for ( let i = 0; i < board.length; i++) {
        document.getElementById(`box${i}`).style.backgroundColor = colorLookUp['null'];    
        document.getElementById(`box${i}`).textContent = '';
    }

}

function handleChoice(evt) {
    const boxIdx = boxEls.indexOf(evt.target);
    console.log(boxIdx);
    if (boxIdx === -1 || winner || board[boxIdx] !== null) {
        return;
    } else if (turn === 1) { 
        board[boxIdx] = 1;
        const div = document.getElementById(`box${boxIdx}`);
        div.style.backgroundColor = colorLookUp[board[boxIdx]];
        div.textContent = 'X';
    } else if (turn === -1) {
        board[boxIdx] = -1;
        const div = document.getElementById(`box${boxIdx}`);
        div.style.backgroundColor = colorLookUp[board[boxIdx]];
        div.textContent = '0';
    }
    console.log(board);
    board[boxIdx] = turn;
    turn *= -1; 
    winner = getWinner(); 
    render();
}


function getWinner () { 
    for (let i = 0; i < winCombos.length; i++) {
    if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + 
        board[winCombos[i][2]]) === 3) {
            return board[winCombos[i][0]];
    } else if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + 
        board[winCombos[i][2]]) !== 3 && !board.includes(null)){
            return 'T';       
    }
}
}

function render () {
    //render message
    if (winner === 'T') {
        msgEl.textContent = "Cats Game!";
      } else if (winner) {
        // A player has won
        msgEl.innerHTML = `<span style="color: ${colorLookUp[winner]}">${colorLookUp[winner].toUpperCase()}</span> Wins!`;
      } else {
        // No winner yet, show whose turn
        msgEl.innerHTML = `<span style="color: ${colorLookUp[turn]}">${colorLookUp[turn].toUpperCase()}</span>'s Turn`;
      } 
    //replay button
    replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}