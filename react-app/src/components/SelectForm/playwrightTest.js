async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Number of articles to validate
  let validateNumber = 100;

  // Number of articles that have been validated
  var alreadyValidated = 0;

  // Helper function that validates all articles displayed on page
  async function validateDisplayedArticles() {

    // Relevant locator and number of qualifying locators displayed on page
    const ageLocator = page.locator(".age");
    const count = await ageLocator.count();

    // Iterate over all desired elements displayed on page
    for (let i = 1; i < count; i++) {

      // console.log("should be last in article", await ageLocator.nth(count - 1).getAttribute("title"))

      // Track program progress in console
      console.log(`Comparing ${await ageLocator.nth(i - 1).getAttribute("title")} to ${await ageLocator.nth(i).getAttribute("title")}`)

      // Update number of articles validated and subtract from desired total
      validateNumber--
      alreadyValidated++

      // Fail state if time stamps are incorrectly ordered
      if (await ageLocator.nth(i - 1).getAttribute("title") < await ageLocator.nth(i).getAttribute("title")) {
        console.log("Articles are not sorted from newest to oldest")
        return
      }

      if (validateNumber === 0) {
        console.log("Desired number of articles have been validated and are sorted from newest to oldest")
        console.log("Number of articles validated:", alreadyValidated)
        return
      }
    }

    // If time stamps are correctly ordered
    console.log("Number of articles validated:", alreadyValidated)
    console.log("Number of articles waiting to be validated", validateNumber)
    return
  }

  // Helper function to display the next page of articles
  async function goToNextPage() {
    await page.locator(".morelink").click()
  }

  (async () => {

    await validateDisplayedArticles();
    // while (validateNumber > 0) {
      // await goToNextPage();
    // }

  })();

}

(async () => {

  await saveHackerNewsArticles();

})();
