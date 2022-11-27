import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

buttonStartEl.setAttribute('disabled', true);
buttonStopEl.setAttribute('disabled', true);

let selectedData;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedData = selectedDates[0].getTime(); // time in ms
    resetTimerInterface();
    if (selectedData < options.defaultDate.getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      buttonStartEl.setAttribute('disabled', true);
    } else {
      buttonStartEl.removeAttribute('disabled');
    }
  },
};
flatpickr(inputEl, options);

buttonStartEl.addEventListener('click', startTimer);
buttonStopEl.addEventListener('click', stopTimer);

function stopTimer(event) {
  stopTimerInterface(event);
  clearInterval(intervalId);
}

function stopTimerInterface(event) {
  event.target.setAttribute('disabled', true);
  inputEl.removeAttribute('disabled');
}

let intervalId = null;

function startTimer(event) {
  startTimerInterface(event);
  intervalId = setInterval(() => {
    let deltaDate = selectedData - Date.now();
    if (deltaDate > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaDate);
      presentTime(days, hours, minutes, seconds);
    }
  }, 1000);
}

function startTimerInterface(event) {
  event.target.setAttribute('disabled', true);
  inputEl.setAttribute('disabled', true);
  buttonStopEl.removeAttribute('disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function presentTime(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function resetTimerInterface() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
}
