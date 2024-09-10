import './app.css'
import App from './App.svelte'

const currentDate = new Date();
const currentDateOnly = new Date().toLocaleDateString();
const startDate = new Date('2024-09-09');
const daysSince = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

const app = new App({
  target: document.getElementById('app'),
  props: {
    currentDateOnly,
    daysSince
  }
})

export default app
