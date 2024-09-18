import './app.css'
import App from './App.svelte'

let currentDate = new Date();
let currentDateOnly = currentDate.toLocaleDateString();
let currentDateSelected = new Date(currentDate); 
const startDate = new Date('2024-09-09');
let daysSince = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
let entries = JSON.parse(localStorage.getItem('entries')) || {};

const app = new App({
  target: document.getElementById('app'),
  props: {
    currentDateOnly,
    currentDateSelected: currentDateSelected.toLocaleDateString(),
    daysSince,
    entry: entries[currentDateSelected.toLocaleDateString()] || {}
  }
})

function saveForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const entry = {
    currentDateSelected: currentDateSelected.toLocaleDateString(),
    anxiety: formData.get('anxiety'),
    emotions: formData.get('emotions'),
    thoughts: formData.get('thoughts'),
    events: formData.get('events'),
    time: formData.get('time'),
    effect: formData.get('effect')
  };
  entries[currentDateSelected.toLocaleDateString()] = entry;
  localStorage.setItem('entries', JSON.stringify(entries));
  alert('Entry saved!');
}

function updateDate(increment) {
  let newDate = new Date(currentDateSelected);
  newDate.setDate(newDate.getDate() + increment);
  if (newDate <= currentDate) {
    currentDateSelected = newDate;
    app.$set({
      currentDateOnly,
      currentDateSelected: currentDateSelected.toLocaleDateString(),
      daysSince,
      entry: entries[currentDateSelected.toLocaleDateString()] || {}
    });
  }
}

document.getElementById('incrementButton').addEventListener('click', () => updateDate(1));
document.getElementById('decrementButton').addEventListener('click', () => updateDate(-1));
document.getElementById('saveButton').addEventListener('click', (event) => saveForm(event));

export default app
