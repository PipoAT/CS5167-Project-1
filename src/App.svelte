<script>
  export let currentDateOnly, daysSince, currentDateSelected, entry;
  import { onMount } from 'svelte';

  let entries = JSON.parse(localStorage.getItem('entries')) || {};

  // Reactive statement to update entry when currentDateSelected changes
  $: entry = entries[currentDateSelected] || { anxiety: '', emotions: '', thoughts: '', events: '', time: '', effect: '' };

  function saveForm(event) {
    event.preventDefault();  // Prevent the default form submission
    const formData = new FormData(event.target);
    entry = {
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

    alert('Entry saved!');
  }

  function updateDate(increment) {
    let newDate = new Date(currentDateSelected);
    newDate.setDate(newDate.getDate() + increment);

    if (newDate <= new Date()) {
      currentDateSelected = newDate.toLocaleDateString();
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
        <h2>{currentDateOnly}</h2>
      </div>
      <br>
      <div id="overview-sep">
        <h2>It has been {daysSince} day(s) since you joined</h2>
      </div>
      <br>
      <div id="overview-sep">
        <h2>You have been active for {daysSince} day(s) in a row!</h2>
      </div>
    </div>
    <div id="form">
      <div id="form-date">
        <h2 id="date-display-form">{currentDateSelected}</h2>
      </div>
      <br>
      <div id="form-main">
        <form on:submit={saveForm}>
          <label for="anxiety">Did you feel anxious today?</label>
          <input type="radio" id="anxiety-yes" name="anxiety" value="yes" bind:group={entry.anxiety}>
          <label for="anxiety-yes">Yes</label>
          <input type="radio" id="anxiety-no" name="anxiety" value="no" bind:group={entry.anxiety}>
          <label for="anxiety-no">No</label>
          <br><br>
          <label for="emotions">What emotions were you experiencing?</label>
          <br>
          <textarea id="emotions" name="emotions" bind:value={entry.emotions}></textarea>
          <br><br>
          <label for="thoughts">What thoughts were you experiencing?</label>
          <br>
          <textarea id="thoughts" name="thoughts" bind:value={entry.thoughts}></textarea>
          <br><br>
          <label for="events">What events occurred that led up to or triggered your anxiety and/or emotions?</label>
          <br>
          <textarea id="events" name="events" bind:value={entry.events}></textarea>
          <br><br>
          <label for="time">How long did you experience anxiety/emotions?</label>
          <input type="text" id="time" name="time" bind:value={entry.time}>
          <br><br>
          <label for="effect">Did it affect any daily routines or tasks for the day?</label>
          <input type="radio" id="effect-yes" name="effect" value="yes" bind:group={entry.effect}>
          <label for="effect-yes">Yes</label>
          <input type="radio" id="effect-no" name="effect" value="no" bind:group={entry.effect}>
          <label for="effect-no">No</label>
          <br><br>
          <button id="saveButton" type="submit">Save</button>
        </form>
      </div>
      <br>
      <div id="form-nav">
        <button id="decrementButton" on:click={() => updateDate(-1)}>Previous</button>
        <button id="incrementButton" on:click={() => updateDate(1)}>Next</button>
      </div>
    </div>
  </div>
</main>