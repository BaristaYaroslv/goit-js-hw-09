import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmitForm);


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
   setTimeout(() => { 
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay);
  });
}

function onSubmitForm (event) {
event.preventDefault();
const {
  elements: { delay, step, amount },
} = event.currentTarget;
let delayInput = Number(delay.value);

for (let i = 1; i <= Number(amount.value); i += 1) {

createPromise(i, delayInput)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayInput += Number(step.value); 
  }
  
  event.currentTarget.reset();
};