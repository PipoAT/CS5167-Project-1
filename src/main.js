import './app.css'
import App from './App.svelte'

let currentDate = new Date();
let currentDateOnly = currentDate.toLocaleDateString();
let currentDateSelected = new Date(currentDate); 
const startDate = new Date('2024-09-09');
let daysSince = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
const app = new App({
  target: document.getElementById('app'),
  props: {
    currentDateOnly,
    currentDateSelected: currentDateSelected.toLocaleDateString(),
    daysSince
  }
})

// saveData is a function that saves the data to the database/backend
let entries = {};

function saveForm(event) {
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
  entries[currentDateSelected] = entry;
  localStorage.setItem('entries', JSON.stringify(entries));
  alert('Entry saved!');
}

// updateDate is a function that updates the date associated with the form to
// increment or decrement by one for each button click of the next or previous buttons
// updateDate(int)
function updateDate(increment) {
  // create the new date depending on the increment
  let newDate = new Date(currentDateSelected);
  newDate.setDate(newDate.getDate() + increment);
  // check if the new date is exceeding today's date
  if (newDate <= currentDate) {
    // if so, do not allow user to go to the next day
    currentDateSelected = newDate;
    // push the updated values to the user
    app.$set({
      currentDateOnly,
      currentDateSelected: currentDateSelected.toLocaleDateString(),
      daysSince
    });
  }
}

// event listener to update the selected date if clicking "NEXT" to add one day to the date each time
document.getElementById('incrementButton').addEventListener('click', () => updateDate(1));
// event listener to update the select date if clicking "PREVIOUS" to subtract one day to the date each time
document.getElementById('decrementButton').addEventListener('click', () => updateDate(-1));
// event listener to save the data
document.getElementById('saveButton').addEventListener('click', () => saveForm());

export default app
