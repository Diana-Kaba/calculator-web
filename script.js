const form = document.forms["calculator"];
const resultView = document.getElementById("result");

const costTypes = {
  'cinema': 250,
  'quest': 450,
  'animators': 800,
  'bubble-show': 400,
};

function saveToLocalStorage() {
  localStorage.setItem('count', form['count'].value);
  localStorage.setItem('duration', form['duration'].value);
  localStorage.setItem('type', form["type"].value);
  localStorage.setItem('additional', form['additional'].value);
  localStorage.setItem('result', resultView.textContent);
  localStorage.setItem('own-type', form['own-type'].value);
}

function getFromLocalStorage() {
  form['count'].value = localStorage.getItem('count') || '';
  form['duration'].value = localStorage.getItem('duration') || '';
  form['own-type'].value = localStorage.getItem('own-type') || '';
  form['additional'].value = localStorage.getItem('additional') || '0';
  resultView.textContent = localStorage.getItem('result') || '0';

  const savedType = localStorage.getItem('type');
  if (savedType) {
    const radios = form['type'];
    for (const radio of radios) {
      if (radio.value === savedType) {
        radio.checked = true;
        break;
      }
    }
  }
}

function getResult() {
  let sum;

  const costByType = costTypes[form["type"].value];
  const costAddService = +form["additional"].value;
  const count = +form["count"].value;
  const duration = +form["duration"].value;

  sum = costByType * count * duration + costAddService;

  return sum;
}

document.addEventListener('DOMContentLoaded', getFromLocalStorage);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  resultView.textContent = getResult();
  saveToLocalStorage();
});

form.addEventListener("change", () => {
  resultView.textContent = getResult();
  saveToLocalStorage();
});
