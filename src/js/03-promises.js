import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', createOnClick);

function createOnClick(e) {
  e.preventDefault();
  let delay = +e.target.elements.delay.value;
  const step = +e.target.elements.step.value;
  const amount = +e.target.elements.amount.value;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => onCreatePromiseSuccess(i, delay))
      .catch(({ position, delay }) => onCreatePromiseError(i, delay));
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromiseSuccess(position, delay) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onCreatePromiseError(position, delay) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
