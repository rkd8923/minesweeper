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

  // Make Mine Map
  let map = document.createElement('div');
  map.className = "map";
  map.id = "map";
  map.style.width = (row * 22).toString() + 'px';
  for (let i=0; i<row*col; i++) {
    const cell = document.createElement('div');
    cell.className = "cell";
    cell.id = "cell" + i.toString();
    cell.setAttribute('isMine', mines.includes(i));
    cell.setAttribute('positionX', parseInt(i / row));
    cell.setAttribute('positionY', i % col);
    cell.setAttribute('isOpened', false);
    cell.setAttribute('flag', false);
    cell.addEventListener('click', (e) => {
      e.preventDefault();
      clickCell(cell);
    });
    map.appendChild(cell);
  }
  document.body.appendChild(map);
  console.log('initGame', document);
}

function clickCell(cell) {
  // console.log('clicked cell is', cell);
  if (checkBoolean(cell.getAttribute('flag'))) {
    return;
  } else if (!checkBoolean(cell.getAttribute('isOpened'))) {
    openCell(cell);
  }
}

function openCell(cell) {
  if (checkBoolean(cell.getAttribute('isMine'))) {
    openAllMines();
  } else {
    cell.className = "opened"
    cell.setAttribute('isOpened', true);
  }
}

function checkNeighbor(cell, row, col) {
  const nowX = parseInt(cell.getAttribute('positionX'));
  const nowY = parseInt(cell.getAttribute('positionY'));
  let ret = true;
  let cell;
  if (nowX > 0 && nowY > 0) {
    cell = document.getElementById('cell' + (nowX*row + nowY).toString());
    ret = ret && checkBoolean(!cell.getAttribute('isMine'));
  }
}

function openAllMines() {
  const cells = Object.values(document.getElementsByClassName('cell'));
  cells.forEach((cell) => {
    console.log(cells);
    if (checkBoolean(cell.getAttribute('isMine'))) {
      const mine = document.createTextNode('X');
      cell.setAttribute('isOpened', true);
      cell.className = 'opened';
      cell.appendChild(mine);
    }
  });
}

function checkBoolean(bool) {
  return bool === 'true';
}