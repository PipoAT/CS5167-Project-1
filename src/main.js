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

export default app
