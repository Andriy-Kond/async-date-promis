import { Notify } from "notiflix/build/notiflix-notify-aio.js";

const refs = { form: document.querySelector(".form") };

refs.form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const currentElements = e.currentTarget.elements;
  const delay = Number(currentElements.delay.value);
  const step = Number(currentElements.step.value);
  const amount = Number(currentElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
