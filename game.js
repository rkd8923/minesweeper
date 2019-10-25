function initGame() {
  const inputGameInfo = document.gameSize;
  const row = inputGameInfo.x.value;
  const col = inputGameInfo.y.value;
  const numOfMines = inputGameInfo.mine.value;
  // Choose Position of Mines
  const mines = [];
  while (mines.length < numOfMines) {
    const tempNum = Math.floor(Math.random()*row*col);
    if (!mines.includes(tempNum)) {
      mines.push(tempNum);
    }
  }
  // remove Mine Map
  let preMap = document.getElementById('map');
  if (preMap) {
    document.body.removeChild(preMap);
  }
  // Make Mine Map
  let map = document.createElement('div');
  map.className = "map";
  map.id = "map";
  map.style.width = (col * 22).toString() + 'px';
  map.setAttribute('gameStatus', 'before'); // before -> started -> clear || over 
  map.setAttribute('remainMines', numOfMines);
  map.setAttribute('numOfMines', numOfMines);
  map.setAttribute('openedCell', 0);
  // Make Cells
  for (let i=0; i<row*col; i++) {
    const cell = document.createElement('div');
    cell.className = "cell";
    cell.id = "cell" + i.toString();
    cell.setAttribute('isMine', mines.includes(i));
    cell.setAttribute('positionX', parseInt(i / col));
    cell.setAttribute('positionY', i % col);
    cell.setAttribute('isOpened', false);
    cell.setAttribute('flag', false);
    cell.addEventListener('click', (e) => {
      if (map.getAttribute('gameStatus') === 'over' || map.getAttribute('gameStatus') === 'clear') {
        return;
      }
      e.preventDefault();
      if (map.getAttribute('gameStatus') === 'before') {
        map.setAttribute('gameStatus', 'started');
        timer();
      }
      clickCell(cell, row, col);
    });
    cell.addEventListener('contextmenu', (e) => {
      event.preventDefault();
      rightClickCell(cell);
    });
    map.appendChild(cell);
  }
  document.body.appendChild(map);
}

function clickCell(cell, row, col) {
  if (checkBoolean(cell.getAttribute('flag'))) {
    return;
  } else if (!checkBoolean(cell.getAttribute('isOpened'))) {
    openCell(cell, row, col);
  }
}

function openCell(cell, row, col) {
  if (checkBoolean(cell.getAttribute('isOpened'))) return;

  if (checkBoolean(cell.getAttribute('isMine'))) {
    openAllMines();
    gameOver();
  } else {
    const nowX = parseInt(cell.getAttribute('positionX'));
    const nowY = parseInt(cell.getAttribute('positionY'));
    const nearbyMines = checkNeighbor(cell, row, col);
    if (nearbyMines > 0) {
      const elmentNearbyMines = document.createTextNode(nearbyMines.toString());
      cell.appendChild(elmentNearbyMines);
    }
    cell.className = "opened";
    cell.setAttribute('isOpened', true);
    const map = document.getElementById('map');
    map.setAttribute('openedCell', (parseInt(map.getAttribute('openedCell')) + 1));
    if (parseInt(map.getAttribute('openedCell')) === (row*col - parseInt(map.getAttribute('numOfMines')))) {
      map.setAttribute('gameStatus', 'clear');
      clearGame();
      return;
    }
    let tempCell;
    if (nearbyMines === 0) {
      if (nowX > 0 && nowY > 0) {
        tempCell = document.getElementById('cell' + ((nowX-1)*col + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX > 0) {
        tempCell = document.getElementById('cell' + ((nowX-1)*col + nowY).toString());
        openCell(tempCell, row, col);
      }
      if (nowX > 0 && nowY < (col-1)) {
        tempCell = document.getElementById('cell' + ((nowX-1)*col + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowY > 0) {
        tempCell = document.getElementById('cell' + (nowX*col + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowY < (col-1)) {
        tempCell = document.getElementById('cell' + (nowX*col + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1) && nowY > 0) {
        tempCell = document.getElementById('cell' + ((nowX+1)*col + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1)) {
        tempCell = document.getElementById('cell' + ((nowX+1)*col + nowY).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1) && nowY < (col-1)) {
        tempCell = document.getElementById('cell' + ((nowX+1)*col + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
    }
  }
}

function checkNeighbor(cell, row, col) {
  const nowX = parseInt(cell.getAttribute('positionX'));
  const nowY = parseInt(cell.getAttribute('positionY'));
  let ret = 0;
  let tempCell;
  if (nowX > 0 && nowY > 0) {
    tempCell = document.getElementById('cell' + ((nowX-1)*col + (nowY-1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret; 
  }
  if (nowX > 0) {
    tempCell = document.getElementById('cell' + ((nowX-1)*col + nowY).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowX > 0 && nowY < (col-1)) {
    tempCell = document.getElementById('cell' + ((nowX-1)*col + (nowY+1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowY > 0) {
    tempCell = document.getElementById('cell' + (nowX*col + (nowY-1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowY < (col-1)) {
    tempCell = document.getElementById('cell' + (nowX*col + (nowY+1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowX < (row-1) && nowY > 0) {
    tempCell = document.getElementById('cell' + ((nowX+1)*col + (nowY-1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowX < (row-1)) {
    tempCell = document.getElementById('cell' + ((nowX+1)*col + nowY).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  if (nowX < (row-1) && nowY < (col-1)) {
    tempCell = document.getElementById('cell' + ((nowX+1)*col + (nowY+1)).toString());
    ret = checkBoolean(tempCell.getAttribute('isMine')) ? ret + 1 : ret;
  }
  return ret;
}

function openAllMines() {
  const cells = Object.values(document.getElementsByClassName('cell'));
  cells.forEach((cell) => {
    if (checkBoolean(cell.getAttribute('isMine'))) {
      if (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      const mine = document.createTextNode('X');
      cell.setAttribute('isOpened', true);
      cell.className = 'opened';
      cell.appendChild(mine);
    }
  });
}

function rightClickCell(cell) {
  if (checkBoolean(cell.getAttribute('isOpened'))) return;
  const tempMap = document.getElementById('map');
  if (!checkBoolean(cell.getAttribute('flag'))) {
    const flag = document.createTextNode('F');
    cell.appendChild(flag);
    cell.setAttribute('flag', true);
    let mines = parseInt(tempMap.getAttribute('remainMines')) + 1;
    tempMap.setAttribute('remainMines', mines);
  } else {
    cell.removeChild(cell.firstChild);
    cell.setAttribute('flag', false);
    let mines = parseInt(tempMap.getAttribute('remainMines')) - 1;
    tempMap.setAttribute('remainMines', mines);
  }
}

function checkBoolean(bool) {
  return bool === 'true';
}

function gameOver() {
  document.getElementById('map').setAttribute('gameStatus', 'over');
  const t = document.getElementById('timer');
  t.textContent = '시간: 0'; 
  clearInterval(timeInterval);
  setTimeout(() => {
    alert('Game Over!');
  }, 300);
}
function clearGame() {
  const t = document.getElementById('timer');
  console.log('clear!', t.textContent);
  t.textContent = '시간: 0'; 
  clearInterval(timeInterval);
}
function timer() {
  let i = 0;
  // const map = document.getElementById('map');
  timeInterval = setInterval(() => {
    console.log('test')
    const t = document.getElementById('timer');
    t.textContent = '시간: ' + (i++).toString();
    // if (map.getAttribute('gameStatus') === 'over') {
    //   const t = document.getElementById('timer');
    //   t.textContent = '시간: 0'; 
    //   clearInterval();
    // } else if (map.getAttribute('gameStatus') === 'clear') {
    //   const t = document.getElementById('timer');
    //   t.textContent = '시간: 0'; 
    //   clearInterval();
    // }
  }, 1000);
}