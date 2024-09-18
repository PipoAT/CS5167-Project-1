<script>
  export let currentDateOnly, daysSince, currentDateSelected, entry
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
        <form>
          <label for="anxiety">Did you feel anxious today?</label>
          <input type="radio" id="anxiety-yes" name="anxiety" value="yes">
          <label for="anxiety-yes">Yes</label>
          <input type="radio" id="anxiety-no" name="anxiety" value="no">
          <label for="anxiety-no">No</label>
          <br>
          <br>
          <label for="emotions">What emoitions were you experiencing?</label>
          <br>
          <textarea id="emotions" name="emotions" bind:value={entry.emotions} required></textarea>
          <br>
          <br>
          <label for="thoughts">What thoughts were you experiencing?</label>
          <br>
          <textarea id="thoughts" name="thoughts" required></textarea>
          <br>
          <br>
          <label for="events">What events occured that led up to or triggered your anxiety and/or emotions?</label>
          <br>
          <textarea id="events" name="events" required></textarea>
          <br>
          <br>
          <label for="time">How long did you expreince anxiety/emotions?</label>
          <input type="text" id="time" name="time" required>
          <br>
          <br>
          <label for="effect">Did it effect any daily routines or tasks for the day?</label>
          <input type="radio" id="effect-yes" name="effect" value="yes">
          <label for="affect-yes">Yes</label>
          <input type="radio" id="effect-no" name="effect" value="no">
          <label for="affect-no">No</label>
          <br>
          <br>
          <button id="saveButton" type="submit">Save</button>
          <button type="submit">Edit</button>
          <button type="submit">Delete</button>
        </form>
      </div>
      <br>
      <div id="form-nav">
        <button id="decrementButton" type="submit">Previous</button>
        <button id="incrementButton" type="submit">Next</button>
      </div>
    </div>
  </div>
</main>
