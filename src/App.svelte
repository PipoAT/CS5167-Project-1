<script>
  // Exported props
  export let currentDateOnly, daysSince, currentDateSelected, entry;
  import { onMount } from 'svelte';

  // Retrieve entries from localStorage or initialize as an empty object
  let entries = JSON.parse(localStorage.getItem('entries')) || {};

  // onMount lifecycle function to initialize the entry for the selected date
  onMount(() => {
    if (entries[currentDateSelected]) {
      entry = entries[currentDateSelected];
    } else {
      entry = { goal: '', anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
    }
  });

  // Function to save the form data
  function saveForm(event) {
    event.preventDefault();  // Prevent the default form submission
    const formData = new FormData(event.target);
    let entry = {
      goal: formData.get('goal'),
      anxiety: formData.get('anxiety'),
      emotions: formData.get('emotions'),
      thoughts: formData.get('thoughts'),
      events: formData.get('events'),
      time: formData.get('time'),
      effect: formData.get('effect')
    };

    // Save the form data for the selected date
    entries[currentDateSelected] = entry;
    localStorage.setItem('entries', JSON.stringify(entries));

    // Update the app's state to reflect the new entry
    entry = entries[currentDateSelected];
    alert('Entry saved!');
  }

  // Function to delete the form data
  function deleteForm(event) {
    event.preventDefault();  // Prevent the default form submission
    if (entries[currentDateSelected]) {
      delete entries[currentDateSelected];
      localStorage.setItem('entries', JSON.stringify(entries));
      entry = { goal: '', anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
      alert('Entry data wiped out!');
    } else {
      alert('No entry found for the selected date!');
    }
  }

  // Function to update the selected date
  function updateDate(increment) {
    let newDate = new Date(currentDateSelected);
    newDate.setDate(newDate.getDate() + increment);

    if (newDate <= new Date()) {
      currentDateSelected = newDate.toLocaleDateString();

      // Update the app's state with the new date and entry
      entry = entries[currentDateSelected] || { goal: '', anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
    }
  }

  // Reactive statement to check if the entry is saved
  $: isEntrySaved = entry.goal || entry.anxiety || entry.emotions || entry.thoughts || entry.events || entry.time || entry.effect;

  // Reactive statement to calculate the number of days in the past week the user felt anxious
  $: daysAnxious = Object.keys(entries)
          .filter(date => {
            let entryDate = new Date(date);
            let today = new Date();
            let diffTime = Math.abs(today.getTime() - entryDate.getTime());
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && entries[date].anxiety === 'yes';
          }).length;

  // Reactive statement to calculate the number of days in the past week it affected daily tasks
  $: daysAffected = Object.keys(entries)
          .filter(date => {
            let entryDate = new Date(date);
            let today = new Date();
            let diffTime = Math.abs(today.getTime() - entryDate.getTime());
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && entries[date].effect === 'yes';
          }).length;

  // Reactive statement to calculate the average time in the past week of feeling anxious
  $: averageAnxious = (Object.keys(entries)
        .filter(date => {
          let entryDate = new Date(date);
          let today = new Date();
          let diffTime = Math.abs(today.getTime() - entryDate.getTime());
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7 && entries[date].time;
        })
        .reduce((total, date) => {
          let time = parseFloat(entries[date].time);
          return total + (isNaN(time) ? 0 : time);
        }, 0) / 7).toFixed(2);
</script>

<main>
  <div class="container">
    <div id="overview">
      <div id="overview-sep">
        <h3>Welcome Back, Andrew Pipo!</h3>
        <h3>Today's Date: {currentDateOnly}</h3>
      </div>
      <br>
      <div id="overview-sep">
        <h3>Days since you joined/starting logging:</h3>
        <h3>{daysSince}</h3>
      </div>
      <br>
      <div id="overview-sep">
        <h3>You have an daily active streak for:</h3> 
        <h3>{daysSince} day(s)</h3>
      </div>
    </div>
    <div id="form">
      <div id="form-date" style="display: flex; align-items: center; justify-content: center;">
        <img id="decrement-button" src=".\assets\left-arrow.png" alt="Previous" on:click={() => updateDate(-1)} />
        <h3 id="date-display-form" style="margin: 0 10px;">{currentDateSelected}</h3>
        <img id="increment-button" src=".\assets\right-arrow.png" alt="Next" on:click={() => updateDate(1)}/>
      </div>
      <br>
      <div id="form-main">
        <form on:submit={saveForm}>
          <label for="goal">Goal:</label>
          <br>
          <textarea id="goal" name="goal" bind:value={entry.goal} required></textarea>
          <br><br>
          <label for="anxiety">Did you feel anxious today?</label>
          <input type="radio" id="anxiety-yes" name="anxiety" value="yes" bind:group={entry.anxiety} required>
          <label for="anxiety-yes">Yes</label>
          <input type="radio" id="anxiety-no" name="anxiety" value="no" bind:group={entry.anxiety} required>
          <label for="anxiety-no">No</label>
          <br><br>
          <label for="emotions">What emotions were you experiencing?</label>
          <br>
          <textarea id="emotions" name="emotions" bind:value={entry.emotions} required></textarea>
          <br><br>
          <label for="thoughts">What thoughts were you experiencing?</label>
          <br>
          <textarea id="thoughts" name="thoughts" bind:value={entry.thoughts} required></textarea>
          <br><br>
          <label for="events">What events occurred that led up to or triggered your anxiety and/or emotions?</label>
          <br>
          <textarea id="events" name="events" bind:value={entry.events} required></textarea>
          <br><br>
          <label for="time">How long did you experience anxiety/emotions in hours?</label>
          <br>
          <input type="number" id="time" name="time" bind:value={entry.time} required>
          <br><br>
          <label for="effect">Did it affect any daily routines or tasks for the day?</label>
          <input type="radio" id="effect-yes" name="effect" value="yes" bind:group={entry.effect} required>
          <label for="effect-yes">Yes</label>
          <input type="radio" id="effect-no" name="effect" value="no" bind:group={entry.effect} required>
          <label for="effect-no">No</label>
          <br><br>
          <button id="saveButton" type="submit">Save</button>
          <button id="deleteButton" on:click={deleteForm} disabled={!isEntrySaved}>Delete</button>
        </form>
      </div>
    </div>
    <div id="data">
      <div id="data-sep">
        <h3>Number of Days in Past Week You Felt Anxious:</h3>
        <h3>{daysAnxious}</h3>
      </div>
      <br>
      <div id="data-sep">
        <h3>Number of Days in Past Week it has Affected Daily Tasks:</h3>
        <h3>{daysAffected}</h3>
      </div>
      <br>
      <div id="data-sep">
        <h3>Average Time in Past Week of feeling Anxious:</h3>
        <h3>{averageAnxious} hour(s)</h3> 
      </div>
    </div>
  </div>
</main>
