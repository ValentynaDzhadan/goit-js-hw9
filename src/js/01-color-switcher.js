const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
let timerId = null;

buttonStartEl.addEventListener('click', startChange);
buttonStopEl.addEventListener('click', stopChange);

buttonStopEl.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function colorBcg() {
  return (document.body.style.backgroundColor = getRandomHexColor());
}

function startChange() {
  timerId = setInterval(colorBcg, 1000);
  //   timerId = setInterval(() => {
  //     colorBcg();
  //   }, 1000);

  buttonStopEl.removeAttribute('disabled');
  buttonStartEl.setAttribute('disabled', true);
}

function stopChange() {
  clearInterval(timerId);
  buttonStartEl.removeAttribute('disabled');
  buttonStopEl.setAttribute('disabled', true);
}
