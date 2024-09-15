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
        <label for="activity">What did you do today?</label>
        <input type="text" id="activity" name="activity" required>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</main>
