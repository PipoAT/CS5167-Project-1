// Import the CSS file for styling
import './app.css'

// Import the Svelte App component
import App from './App.svelte'

// Get the current date and time
let currentDate = new Date();

// Extract only the date part in a locale-specific format
let currentDateOnly = currentDate.toLocaleDateString();

// Create a new Date object with the current date
let currentDateSelected = new Date(currentDate);

// Define the start date for calculating days since
const startDate = new Date('2024-09-09');

// Calculate the number of days since the start date
let daysSince = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

// Retrieve entries from localStorage or initialize as an empty object if not found
let entries = JSON.parse(localStorage.getItem('entries')) || {};

// Create a new instance of the Svelte App component
const app = new App({
  target: document.getElementById('app'), // Target the HTML element with id 'app'
  props: {
    currentDateOnly, // Pass the current date only as a prop
    currentDateSelected: currentDateSelected.toLocaleDateString(), // Pass the selected date as a prop
    daysSince, // Pass the number of days since the start date as a prop
    entry: entries[currentDateSelected.toLocaleDateString()] || {}, // Pass the entry for the selected date or an empty object
  }
})

// Export the app instance as the default export
export default app
