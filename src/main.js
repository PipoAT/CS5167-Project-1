import './app.css'
import App from './App.svelte'

let currentDate = new Date();
let currentDateOnly = currentDate.toLocaleDateString();
let currentDateSelected = new Date(currentDate); // Ensure this is a Date object
const startDate = new Date('2024-09-09');
let daysSince = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Use getTime() for arithmetic

const app = new App({
  target: document.getElementById('app'),
  props: {
    currentDateOnly,
    currentDateSelected: currentDateSelected.toLocaleDateString(), // Pass as string
    daysSince
  }
})

function updateDate(increment) {
  currentDateSelected.setDate(currentDateSelected.getDate() + increment);

  app.$set({
    currentDateOnly,
    currentDateSelected: currentDateSelected.toLocaleDateString(), // Update as string
    daysSince
  });
}

document.getElementById('incrementButton').addEventListener('click', () => updateDate(1));
document.getElementById('decrementButton').addEventListener('click', () => updateDate(-1));

export default app
