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
    entry: entries[currentDateSelected.toLocaleDateString()] || {},
  }
})

function saveForm(event) {
  event.preventDefault();  // Prevent the default form submission
  const formData = new FormData(event.target);
  const entry = {
    anxiety: formData.get('anxiety'),
    emotions: formData.get('emotions'),
    thoughts: formData.get('thoughts'),
    events: formData.get('events'),
    time: formData.get('time'),
    effect: formData.get('effect')
  };
  
  // Save the form data for the selected date
  entries[currentDateSelected.toLocaleDateString()] = entry;
  localStorage.setItem('entries', JSON.stringify(entries));
  
  // Update the app's state to reflect the new entry
  app.$set({
    currentDateOnly,
    currentDateSelected: currentDateSelected.toLocaleDateString(),
    daysSince,
    entry: entries[currentDateSelected.toLocaleDateString()] || {}
  });
  
  alert('Entry saved!');
}

// Listen for form submission instead of button click
document.querySelector('form').addEventListener('submit', (event) => saveForm(event));

// Update date navigation
function updateDate(increment) {
  let newDate = new Date(currentDateSelected);
  newDate.setDate(newDate.getDate() + increment);
  
  if (newDate <= currentDate) {
    currentDateSelected = newDate;
    
    // Update the app's state with the new date and entry
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
