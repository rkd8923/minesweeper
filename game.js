console.log('testtesttest', document);
function alertButton() {
  alert('test');
}
function click() {
  console.log('click')
  let parent = document.createElement('div');
  let temp = document.createTextNode('testtesttest');
  parent.appendChild(temp);
  document.body.appendChild(parent);
}

document.getElementById('button1').addEventListener('click', click());
