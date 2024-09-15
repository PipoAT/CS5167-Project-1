<script>
  export let currentDateOnly, daysSince
</script>

<main>
  <div class="container">
    <div id="overview">
      <h2>Welcome, UserName!</h2>
      <h2>{currentDateOnly}</h2>
      <h2>It has been {daysSince} day(s) since you joined</h2>
      <h2>You have been active for {daysSince} day(s) in a row!</h2>
    </div>
    <div id="form">
      <form>
        <label for="anxiety">Did you feel anxious today?</label>
        <input type="radio" id="anxiety-yes" name="anxiety" value="yes">
        <label for="anxiety-yes">Yes</label>
        <input type="radio" id="anxiety-no" name="anxiety" value="no">
        <label for="anxiety-no">No</label>

        <label for="emotions">What emoitions were you experiencing?</label>
        <input type="text" id="emotions" name="emotions" required>

        <label for="thoughts">What thoughts were you experiencing?</label>
        <input type="text" id="thoughts" name="thoughts" required>

        <label for="events">What events occured that led up to or triggered your anxiety and/or emotions?</label>
        <input type="text" id="events" name="events" required>

        <label for="time">How long did you expreince anxiety/emotions?</label>
        <input type="text" id="time" name="time" required>
        
        <label for="effect">Did it effect any daily routines or tasks for the day?</label>
        <input type="radio" id="effect-yes" name="effect" value="yes">
        <label for="affect-yes">Yes</label>
        <input type="radio" id="effect-no" name="effect" value="no">
        <label for="affect-no">No</label>


        <button type="submit">Save</button>
        <button type="submit">Edit</button>
        <button type="submit">Delete</button>
      </form>
    </div>
  </div>
</main>
