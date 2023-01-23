import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const pickerEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]")
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const anyDate = new Date(selectedDates[0]);
      const nowDate = new Date(this.now);

      if(!(nowDate.getTime() < anyDate.getTime())) {
        btnStart.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      return; }

     if (btnActive) {
      btnStart.disabled = false;
      btnActive = !btnActive;
     }
      
    },
  };


  const flatPicker = flatpickr('#datetime-picker', options);


  pickerEl.classList.add('timepicker');
  btnStart.classList.add('startBtn');
 

  btnStart.addEventListener('click', () => {
    const pickedTime = flatPicker.selectedDates[0].getTime();
    btnStart.disabled = true;

    const intervalId  = setInterval(() => {
      const currentTime  = Date.now();
      const intervalTime = pickedTime - currentTime;
      if (intervalTime < 0) {
        clearInterval(intervalId);
        return;
      }
daysEl.textContent = convertMs(intervalTime).days;
hoursEl.textContent = convertMs(intervalTime).hours;
minutesEl.textContent = convertMs(intervalTime).minutes;
secondsEl.textContent = convertMs(intervalTime).seconds;
  },1000);
});
btnStart.disabled = true;
let btnActive = true;


 // конвертер времени

 function convertMs(ms) {
    
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
 
  
  const days = addLeadingZero((Math.floor(ms / day)));
  const hours = addLeadingZero((Math.floor((ms % day) / hour)));
  const minutes = addLeadingZero((Math.floor(((ms % day) % hour) / minute)));
  const seconds = addLeadingZero((Math.floor((((ms % day) % hour) % minute) / second)));

  return { days, hours, minutes, seconds };
  
}

  function addLeadingZero(value) {
    return String(value).padStart(2,0);
}