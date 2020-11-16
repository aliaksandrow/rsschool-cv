//document.cookie.querySelector('.field')
const box = document.querySelector('body');
const field = document.createElement('div');
field.className = 'field';

box.append(field);
const result = document.createElement('div');
result.className = 'result';
//     winner
const winner = document.createElement('div');
winner.className = 'winner';
winner.innerHTML = '<h1> Ура! </h1>';
const results = document.createElement('p')
results.className = 'results';
results.innerHTML = 'Вы решили головоломку за #:## и  ходов '
winner.append(results)
const tick = document.createElement('span');
tick.className = 'tick';
results.append(tick)
//     restart
const restart = document.createElement('p');
restart.className = 'restart';
restart.innerHTML = 'Начать новую игру'
winner.append(restart)

field.append(winner);

const cellSize = 100;
const empty = {
    value: 0,
    left: 0,
    top: 0
}

const cells = [];
cells.push(empty);

function move(index) {
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);// to localStorage
    const toptDiff = Math.abs(empty.top - cell.top);
    if(leftDiff + toptDiff > 1){
        return;
    }
    
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left; // пустая клетка
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
    endOfGame ()
};

//            isFinished
function endOfGame () {
    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left;
    })
    if(isFinished) {
        field.querySelector(".winner").style.display = "flex";
    };
    //          restart event
    restart.addEventListener('click', () => {
    //field.querySelector(".winner").style.display = "none";
    document.location.reload();
    })
}
const nums = [...Array(15).keys()].sort(() => Math.random() - 0.5)
// ---------------------------------------------

// -----------------------------------------

function bones() {
        for( let i = 1; i <= 15; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
    const value = nums[i - 1] + 1;
    cell.innerHTML = value;
    const left = i % 4;
    const top = (i - left) / 4;
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });
    function getCell() {
        if(typeof(Storage) !== "undefined") {
          if (localStorage.cell) {
            localStorage.cell = Number(localStorage.cell)+1;
          } else {
            localStorage.cell = 1;
          }
          
          document.querySelector(".result").innerHTML = localStorage.cell;
          document.querySelector(".tick").innerHTML = localStorage.cell;
        } 
      }
      function removeCell() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.cell != 0) {
          localStorage.clear()
            }
        } 
      }
removeCell();
      
    field.append(cell);
cell.addEventListener('click', () => {
 move(i);
 getCell()
})
}
}
bones();

// ------------------------- time running -----------------

const controls = document.createElement('div');
controls.className = 'controls';

const startPause = document.createElement('button');
startPause.className = 'startPause';
startPause.innerHTML = 'START'
const output = document.createElement('p');
output.className = 'output';

const out = document.createElement('button');
out.className = 'out';
out.innerHTML = 'RESET'

controls.append(startPause);
controls.append(output);
controls.append(out);
controls.append(result)
field.append(controls)

let running = 0;
let time =0;

function sP() {
   if(running === 0) {
       running = 1;
       increment()
       document.querySelector('.startPause').innerHTML = 'PAUSE'
   }else {
       running = 0;
       document.querySelector('.startPause').innerHTML = 'RESUME'
   }
};
startPause.addEventListener('click', sP)

function reset() {
    running = 0;
    time = 0;
    document.querySelector('.startPause').innerHTML = 'START';
    document.querySelector('.output').innerHTML = '00:00';
    document.location.reload();
};
out.addEventListener('click', reset);

function increment() {
    if(running === 1) {
        setTimeout(() => {
            time++;
            let mins = Math.floor(time / 10 / 60);
            let sec = Math.floor(time / 10 % 60);
            if (mins < 10) {
                mins = '0' + mins;
            }
            if(sec < 10) {
                sec = '0' + sec;
            }
            document.querySelector('.output').innerText = 
            `${mins} : ${sec} `;
            
            increment()
        },100)
    }

}
