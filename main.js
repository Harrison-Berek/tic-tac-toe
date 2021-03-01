/*----- constants -----*/ 
const colorLookUp = {
    'null': 'white',
    '1': 'lightcoral',
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
document.getElementById('boxes').addEventListener('click', handleClick);
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init ();

function inti() {
    board = [
        null, null, null,
        null, null, null, 
        null, null, null
    ]
    turn = 1;
    winner = null; 
    render ();
}

function handleClick(evt) {
    const boxIdx = boxEls.indexOf(evt.target);
    if (boxIdx === -1 || winner || board[boxIdx] !== null) return; 
    board[boxIdx] = turn;
    turn *= -1; 
    winner = getWinner(); 
    render();
}

function gertWinner () { 
    board.forEach(funtion(i))
    if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + 
        board[winCombos[i][2]]) === 3) {
            winner = board[winCombos[i][0]];
    } else if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + 
        board[winCombos[i][2]]) !== 3 && !board.includes(null)){
            winner = 'T';       
}

function render () { 
    //render the board: add X/O, change background
    if (board[boxIdx] = 1) {
        const div = document.getElementById(`box${boxIdx}`);
        div.style.backgroundColor = colorLookUp[board[boxIdx]];
        div.textContent = 'X';
    } else if (board[boxIdx] = -1) { 
        const div = document.getElementById(`box${boxIdx}`);
        div.style.backgroundColor = colorLookUp[board[boxIdx]];
        div.textContent = 'O';
    }
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
    //Winner/Tie/Keep playing? 

    //replay button
    replay.style.visibility = winner ? 'visible' : 'hidden';
}