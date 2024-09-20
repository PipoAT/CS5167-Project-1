<script>
  export let currentDateOnly, daysSince, currentDateSelected, entry;
  import { onMount } from 'svelte';

  let entries = JSON.parse(localStorage.getItem('entries')) || {};

  onMount(() => {
    if (entries[currentDateSelected]) {
      entry = entries[currentDateSelected];
    } else {
      entry = { anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
    }
  });

  function saveForm(event) {
    event.preventDefault();  // Prevent the default form submission
    const formData = new FormData(event.target);
    let entry = {
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

  function deleteForm(event) {
    event.preventDefault();  // Prevent the default form submission
    if (entries[currentDateSelected]) {
      entries[currentDateSelected] = { anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
      localStorage.setItem('entries', JSON.stringify(entries));
      entry = entries[currentDateSelected];
      alert('Entry data wiped out!');
    } else {
      alert('No entry found for the selected date!');
    }
  }

  function updateDate(increment) {
    let newDate = new Date(currentDateSelected);
    newDate.setDate(newDate.getDate() + increment);

    if (newDate <= new Date()) {
      currentDateSelected = newDate.toLocaleDateString();

      // Update the app's state with the new date and entry
      entry = entries[currentDateSelected] || { anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };
    }
  }
</script>

<main>
  <div class="container">
    <div id="overview">
      <div id="overview-sep">
        <h2>Welcome, UserName!</h2>
      </div>
      <br>
      <div id="overview-sep">
        <h2>Today's Date: {currentDateOnly}</h2>
      </div>
      <br>
      <div id="overview-sep">
        <h2>It has been {daysSince} day(s) since you joined</h2>
      </div>
      <br>
      <div id="overview-sep">
        <h2>You have an daily active streak for:</h2> 
        <h2>{daysSince} day(s)</h2>
      </div>
    </div>
    <div id="form">
      <div id="form-date" style="display: flex; align-items: center; justify-content: center;">
        <img id="decrement-button" src=".\assets\left-arrow.png" alt="Previous" on:click={() => updateDate(-1)} />
        <h2 id="date-display-form" style="margin: 0 10px;">{currentDateSelected}</h2>
        <img id="increment-button" src=".\assets\right-arrow.png" alt="Next" on:click={() => updateDate(1)}/>
      </div>
      <br>
      <div id="form-main">
        <form on:submit={saveForm}>
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
          <label for="time">How long did you experience anxiety/emotions?</label>
          <br>
          <input type="text" id="time" name="time" bind:value={entry.time} required>
          <br><br>
          <label for="effect">Did it affect any daily routines or tasks for the day?</label>
          <input type="radio" id="effect-yes" name="effect" value="yes" bind:group={entry.effect} required>
          <label for="effect-yes">Yes</label>
          <input type="radio" id="effect-no" name="effect" value="no" bind:group={entry.effect} required>
          <label for="effect-no">No</label>
          <br><br>
          <button id="saveButton" type="submit">Save</button>
          <button id="deleteButton" on:click={() => deleteForm()} disabled={!entry.anxiety && !entry.emotions && !entry.thoughts && !entry.events && !entry.time && !entry.effect}>Delete</button>
        </form>
      </div>
    </div>
  </div>
</main>
