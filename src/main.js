import './app.css'
import App from './App.svelte'

let currentDate = new Date();
let currentDateOnly = currentDate.toLocaleDateString();
const startDate = new Date('2024-09-09');
let daysSince = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

const app = new App({
  target: document.getElementById('app'),
  props: {
    currentDateOnly,
    daysSince
  }
})

function updateDate(increment) {
  currentDate.setDate(currentDate.getDate() + increment);
  currentDateOnly = currentDate.toLocaleDateString();
  daysSince = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  
  app.$set({
    currentDateOnly,
    daysSince
  });
}

document.getElementById('incrementButton').addEventListener('click', () => updateDate(1));
document.getElementById('decrementButton').addEventListener('click', () => updateDate(-1));

export default app
