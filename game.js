function initGame() {
  let xy = document.gameSize;
  console.log(xy.x.value, xy.y.value);
  let map = document.createElement('div');
  map.className = "map";
  map.style.width = '110px';
  for (let i=0; i<25; i++) {
    let cell = document.createElement('div');
    cell.className = "cell";
    map.appendChild(cell);
  }
  document.body.appendChild(map);
  console.log('initGame', document);
}