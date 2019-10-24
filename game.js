// document.addEventListener('contextmenu', function() {
//   event.preventDefault();
// });
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
      clickCell(cell, row, col);
    });
    cell.addEventListener('contextmenu', (e) => {
      event.preventDefault();
      rightClickCell(cell);
    });
    map.appendChild(cell);
  }
  document.body.appendChild(map);
  console.log('initGame', document);
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
  } else {
    if (checkBoolean(cell.getAttribute('flag'))) {
      cell.removeChild(cell.firstChild);
      cell.setAttribute('flag', false);
    }
    const nowX = parseInt(cell.getAttribute('positionX'));
    const nowY = parseInt(cell.getAttribute('positionY'));
    cell.className = "opened";
    cell.setAttribute('isOpened', true);
    let tempCell;
    if (checkNeighbor(cell, row, col)) {
      if (nowX > 0 && nowY > 0) {
        tempCell = document.getElementById('cell' + ((nowX-1)*row + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX > 0) {
        tempCell = document.getElementById('cell' + ((nowX-1)*row + nowY).toString());
        openCell(tempCell, row, col);
      }
      if (nowX > 0 && nowY < (col-1)) {
        tempCell = document.getElementById('cell' + ((nowX-1)*row + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowY > 0) {
        tempCell = document.getElementById('cell' + (nowX*row + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowY < (col-1)) {
        tempCell = document.getElementById('cell' + (nowX*row + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1) && nowY > 0) {
        tempCell = document.getElementById('cell' + ((nowX+1)*row + (nowY-1)).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1)) {
        tempCell = document.getElementById('cell' + ((nowX+1)*row + nowY).toString());
        openCell(tempCell, row, col);
      }
      if (nowX < (row-1) && nowY < (col-1)) {
        tempCell = document.getElementById('cell' + ((nowX+1)*row + (nowY+1)).toString());
        openCell(tempCell, row, col);
      }
    }
  }
}

function checkNeighbor(cell, row, col) {
  const nowX = parseInt(cell.getAttribute('positionX'));
  const nowY = parseInt(cell.getAttribute('positionY'));
  let ret = true;
  let tempCell;
  if (nowX > 0 && nowY > 0) {
    tempCell = document.getElementById('cell' + ((nowX-1)*row + (nowY-1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowX > 0) {
    tempCell = document.getElementById('cell' + ((nowX-1)*row + nowY).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowX > 0 && nowY < (col-1)) {
    tempCell = document.getElementById('cell' + ((nowX-1)*row + (nowY+1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowY > 0) {
    tempCell = document.getElementById('cell' + (nowX*row + (nowY-1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowY < (col-1)) {
    tempCell = document.getElementById('cell' + (nowX*row + (nowY+1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowX < (row-1) && nowY > 0) {
    tempCell = document.getElementById('cell' + ((nowX+1)*row + (nowY-1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowX < (row-1)) {
    tempCell = document.getElementById('cell' + ((nowX+1)*row + nowY).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  if (nowX < (row-1) && nowY < (col-1)) {
    tempCell = document.getElementById('cell' + ((nowX+1)*row + (nowY+1)).toString());
    ret = ret && !checkBoolean(tempCell.getAttribute('isMine'));
  }
  return ret;
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

function rightClickCell(cell) {
  if (checkBoolean(cell.getAttribute('isOpened'))) return;

  if (!checkBoolean(cell.getAttribute('flag'))) {
    const flag = document.createTextNode('F');
    cell.appendChild(flag);
    cell.setAttribute('flag', true);
  } else {
    cell.removeChild(cell.firstChild);
    cell.setAttribute('flag', false);
  }
}

function checkBoolean(bool) {
  return bool === 'true';
}