// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const prompt = require("prompt-sync")();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { test, expect } = require("@playwright/test");
const { clear } = require("console");
const { reverse } = require("dns");
const { chromium } = require("playwright");


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
  let alreadyValidated = 0;

  // Holding variable to compare last article of one page to first article of next page
  let holdoverArticle;

  // Helper function that validates all articles displayed on page
  async function validateDisplayedArticles() {

    // Relevant locator and number of qualifying locators displayed on page
    const ageLocator = page.locator(".age");
    const count = await ageLocator.count();

    // Conditional to validate last article on one page to the first article on the next
    // Includes fail state, console monitor, and refresh of the hold over variable
    if (holdoverArticle) {
      console.log(`Comparing ${holdoverArticle} to ${await ageLocator.nth(0).getAttribute("title")}`)
      validateNumber--
      alreadyValidated++
      if (await holdoverArticle < await ageLocator.nth(0).getAttribute("title")) {
        console.log("Articles are not sorted from newest to oldest")
        console.log(`Articles that were invalid were articles ${alreadyValidated} and ${alreadyValidated + 1}`)
        return
      }
      holdoverArticle = await ageLocator.nth(count - 1).getAttribute("title")
    } else {
      holdoverArticle = await ageLocator.nth(count - 1).getAttribute("title")
    }

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
        console.log(`Articles that were invalid were articles ${alreadyValidated} and ${alreadyValidated + 1}`)
        return
      }

      // Conditional to stop validating once target number has been reached
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

  // ====== BEYOND THIS POINT LIES THE ABOVE AND BEYOND ======
  // ====== BEYOND THIS POINT LIES THE ABOVE AND BEYOND ======
  // ====== BEYOND THIS POINT LIES THE ABOVE AND BEYOND ======
  // ====== BEYOND THIS POINT LIES THE ABOVE AND BEYOND ======

  // CSV file writer alphabetize
  async function exportCSV(records) {
    let csvFile = "csvOutput.csv"
    const csvWriter = createCsvWriter({
      path: csvFile,
      header: [
        {id: "title", title: "TITLE"},
        {id: "url", title: "URL"}
      ]
    });

    await csvWriter.writeRecords(records)
      .then(() => {
        console.log(`Your sorted list has been exported to a CSV file named ${csvFile} and placed within this directory's file structure`)
      })
  }

  // CSV file writer popular
  async function exportCSVPopular(records) {
    let csvFile = "csvOutput.csv"
    const csvWriter = createCsvWriter({
      path: csvFile,
      header: [
        {id: "title", title: "TITLE"},
        {id: "url", title: "URL"},
        {id: "points", title: "POINTS"}
      ]
    });

    await csvWriter.writeRecords(records)
      .then(() => {
        console.log(`Your sorted list has been exported to a CSV file named ${csvFile} and placed within this directory's file structure`)
      })
  }

  // Prompt user for what they would like to do next
  async function haveALovelyConversation() {

    let dump = 0;

    // First while loop to put user back at first prompt in case of invalid response
    while (dump === 0){
      var easy = prompt("That felt a bit easy, didn't it? [Valid Responses: yes, YES!] ");
      if (easy === "yes" || easy === "YES!") {
        dump++;

        // Second invalid response while loop
        while (dump === 1) {
          clear();
          console.log("Let's order some Hacker News articles another way.")

          // Funnel into correct sorting algorithm
          var newOrder = prompt("How would you like to organize them? [Valid Responses: a - z, z - a, popular] ")
            if (newOrder === "a - z") {

              await alphabetically(newOrder);
              var again = prompt("Would you like to try a different sorting method? [Enter 'no' to end program, or anything else to try a different sort.] ")
              if (again === "no") {
                clear()
                console.log("Thank you for your consideration!")
                process.exit()
              }

            } else if (newOrder === "z - a") {

              await alphabetically(newOrder);
              var again = prompt("Would you like to try a different sorting method? [Enter 'no' to end program, or anything else to try a different sort.] ")
              if (again === "no") {
                clear()
                console.log("Thank you for your consideration!")
                process.exit()
              }

            } else if (newOrder === "popular"){

              await popularity();
              var again = prompt("Would you like to try a different sorting method? [Enter 'no' to end program, or anything else to try a different sort.] ")
              if (again === "no") {
                clear()
                console.log("Thank you for your consideration!")
                process.exit()
              }

            } else {
              clear();
              console.log("Please give a valid response")
            }
        }

      } else {
        clear();
        console.log("Please give a valid reponse")
      }
    }

    return

  }

  // ====== ORGANIZE ARTICLES ALPHABETICALLY ======
  // ====== ORGANIZE ARTICLES ALPHABETICALLY ======
  // ====== ORGANIZE ARTICLES ALPHABETICALLY ======
  // ====== ORGANIZE ARTICLES ALPHABETICALLY ======
  // ====== ORGANIZE ARTICLES ALPHABETICALLY ======

  async function alphabetically(order) {

    // Clear console
    clear();

    // Dump and prompt variable
    let userNumber;
    let alphaDump = 0;

    // launch browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // go to Hacker News
    await page.goto("https://news.ycombinator.com/news");

    // Bifurcation conditional
    if (order === "a - z") {
      // Prompt user for how many articles to alphabetize
      while (alphaDump === 0) {
        console.log("Note that some articles that begin with numbers or symbols may be placed before articles beginning with letters.")
        userNumber = prompt("How many articles from the front page would you like to order alphabetically? [Valid responses are a number between 1 and 100] ")
        if (parseInt(userNumber) >= 1 && parseInt(userNumber) <= 100) {
          alphaDump++;
        } else {
          clear();
          console.log("Please enter a number between 1 and 100")
        }
      };
    } else if (order === "z - a") {
      // Prompt user for how many articles to sort in reverse alphabetical order
      while (alphaDump === 0) {
        console.log("Note that some articles that begin with numbers or symbols may be placed after articles beginning with letters.")
        userNumber = prompt("How many articles from the front page would you like to order in reverse alphabetical order? [Valid responses are a number between 1 and 100] ")
        if (parseInt(userNumber) >= 1 && parseInt(userNumber) <= 100) {
          alphaDump++;
        } else {
          clear();
          console.log("Please enter a number between 1 and 100")
        }
      };
    }

    // Locators, Objects, and Arrays
    const titleLocator = page.locator(".titleline");
    const urlLocator = page.locator(".titleline > a")
    const titleCount = await titleLocator.count();
    let titleObject = new Object();
    let sortedObject = new Object();
    let csvReadyEncodedArr = [];

    // Begin Iteration and sorting
    for (let i = 0; i < titleCount; i++) {
      titleObject[`${await titleLocator.nth(i).textContent()}`] = `${await urlLocator.nth(i).getAttribute("href")}`

      if (parseInt(userNumber) === Object.keys(titleObject).length) {

        // Bifurcation conditional to determine correct sort method
        if (order === "a - z") {
          sortedObject = Object.fromEntries(
            Object.entries(titleObject).sort()
          )
        } else if (order === "z - a") {
          sortedObject = Object.fromEntries(
            Object.entries(titleObject).sort().reverse()
          )
        }

        // Prepare data for CSV encoding
        for (const [key, value] of Object.entries(sortedObject)) {
          csvReadyEncodedArr.push(
            {
              title : key,
              url : value
            }
          )
        }

        // Testing logs
        // console.log(sortedObject)
        // console.log(csvReadyEncodedArr)
        await exportCSV(csvReadyEncodedArr)
        return
      }

      // Conditional to determine if a new page of articles is required
      if (i === titleCount - 1 && parseInt(userNumber) != Object.keys(titleObject).length) {
        i = -1
        await page.locator(".morelink").click()
      }
    }

    // Catch sort
    if (order === "a - z") {
      sortedObject = Object.fromEntries(
        Object.entries(titleObject).sort()
      )
    } else if (order === "z - a") {
      sortedObject = Object.fromEntries(
        Object.entries(titleObject).sort().reverse()
      )
    }

    // Catch CSV encode prep
    for (const [key, value] of Object.entries(sortedObject)) {
      csvReadyEncodedArr.push(
        {
          title : key,
          url : value
        }
      )
    }

    // Testing logs
    // console.log(sortedObject)
    // console.log(csvReadyEncodedArr)
    await exportCSV(csvReadyEncodedArr)
    return

  }


  // ====== ORGANIZE ARTICLES BY DECENDING POPULARITY ======
  // ====== ORGANIZE ARTICLES BY DECENDING POPULARITY ======
  // ====== ORGANIZE ARTICLES BY DECENDING POPULARITY ======
  // ====== ORGANIZE ARTICLES BY DECENDING POPULARITY ======
  // ====== ORGANIZE ARTICLES BY DECENDING POPULARITY ======

  async function popularity() {

    // Clear console
    clear();
    // Dump and prompt variable
    let userNumber;
    let alphaDump = 0;

    // launch browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // go to Hacker News
    await page.goto("https://news.ycombinator.com/news");

    // Prep title and sort objects
    let popObject = new Object();
    let encodedArr = [];
    let matchingArr = [];
    let sortedObject = new Object();
    let csvReadyEncodedArr = [];

    // Prompt user for how many articles to sort in reverse alphabetical order
    while (alphaDump === 0) {
      console.log("Note that articles listing job opportunities do not have scores, and will not be included in this sort.")
      console.log("Also note that Hacker News can on occation duplicate articles between pages. This program has been optimized to eliminate such duplications.")
      console.log("This optimization explains how, on rare occations, it may appear as though the sorting algorithm has included one or two articles more than expected.")
      userNumber = prompt("How many articles from the front page would you like to order by decending popularity? [Valid responses are a number between 1 and 100] ")
      if (parseInt(userNumber) >= 1 && parseInt(userNumber) <= 100) {
        alphaDump++;
      } else {
        clear();
        console.log("Please enter a number between 1 and 100")
      }
    }

    // Locators and count
    const titleLocator = page.locator(".titleline");
    const scoreLocator = page.locator(".score")
    const urlLocator = page.locator(".titleline > a")
    const titleCount = await titleLocator.count();
    let text;
    let correction = 0;
    // let titleCorrection = 0;

    // Oh boy here we go iterating again
    for (let i = 0; i < titleCount; i++) {

      // Store article title in a variable
      text = await titleLocator.nth(i).textContent()

      // Edge case. When a "[BLANK] company is hiring" post appears, it does not have a score
      // The below section compensates for the discrepency between the number of title elements on the page
      // and the number of score elements on the page
      if (text.toLowerCase().includes("is hiring")) {
        correction++
      } else {
        popObject[`${await titleLocator.nth(i).textContent()} ${await urlLocator.nth(i).getAttribute("href")}`] = `${await scoreLocator.nth(i - correction).textContent()}`
      }

      // Exit condition once target number of articles have been reached
      if (parseInt(userNumber) === Object.keys(popObject).length) {

        // This gets pretty crazy
        /*
        Sort does not accept an async custom comparator. This makes things difficult as the default sort() method does not
        sort integers in the way that I wanted, and a custom comparator function that is not async does nothing within this function's context.
        Therefore, I decided to go through a series of encodings to achieve the kind of sort that I was looking for. There is probably a better
        choice that I am unaware of, but boy was it informative and honestly fun.
        */

        /*
        Take the object which looks like this: { "title+url" : "[integer] points"} and encode it
        into an array that holds strings that look like "[integer] points [title] [url]".

        Create a second array of strings that is just "[integer]" that correspond to the integers
        in the first array.
        */
        for (let prop in popObject) {
          encodedArr.push(`${popObject[prop]} ${prop}`)
          matchingArr.push(parseInt(popObject[prop].substring(0, popObject[prop].indexOf(" "))))
        }

        // Create a typed array so that a default sort() function can arrange it as I intend
        // Also create an array to hold the next step
        var numArray = new Float64Array(matchingArr)
        var sortedArr = [];

        /*
        Sort and reverse typed array, then iterate through it in a nested loop that matches
        the now in order numbers of the typed array to the beginnings of the strings in the original
        encoded array, creating a sorted version of the encoded array, and storing it in the new array
        called "sortedArr"
        */
        for (let num of numArray.sort().reverse()) {

          for (let i = 0; i < encodedArr.length; i++) {
              let s = encodedArr[i];

              if (s.startsWith(num.toString())) {

                  sortedArr.push(s);

                  encodedArr.splice(i, 1);
                  break;
              }
          }
        }

        // Turn the now sorted encoded array back into an object
        // with the structure { "[title] [url]" : "[integer] points"}
        for (let s of sortedArr) {
          sortedObject[`${s.substring(s.indexOf("points") + 7, s.length)}`] = `${s.substring(0, s.indexOf("points") + 6)}`
        }

        // last step
        // Prepare data for CSV encoding and skip a step by rearranging the object into an array containing objects
        // with the structure {"title" : [title], "url" : [url], "points" : "[integer] points"}
        // Also acount for edge case involving locally hosted Hacker news urls
        for (const [key, value] of Object.entries(sortedObject)) {

          // This is that edge case. When an "Ask HN" thread is posted, it doesn't have a traditional href pointing to an http address
          // Instead it holds a query string that is added to the y.combinator base url
          if (key.includes("item?id=")) {
            csvReadyEncodedArr.push(
              {
                title : key.substring(0, key.indexOf("item?id=") - 1),
                url : `https://news.ycombinator.com/${key.substring(key.indexOf("item?id="), key.length)}`,
                points : ` ${value}`
              }
            )
          } else {
            csvReadyEncodedArr.push(
              {
                title : key.substring(0, key.indexOf("http") - 1),
                url : key.substring(key.indexOf("http"), key.length),
                points : ` ${value}`
              }
            )
          }

        }

        // Send that array off to the csv export function for final packaging
        await exportCSVPopular(csvReadyEncodedArr)
        return
      }

      // Conditional that determines when/if it is necessary to go to the next page
      if (i === titleCount - 1 && (parseInt(userNumber) != Object.keys(popObject).length)) {
        i = -1;
        correction = 0;
        await page.locator(".morelink").click();
      }
    }

    // All that same encoder fun up above in case I missed something and the loop terminates without correctly packaging the data
    for (let prop in popObject) {
      encodedArr.push(`${popObject[prop]} ${prop}`)
      matchingArr.push(parseInt(popObject[prop].substring(0, popObject[prop].indexOf(" "))))
    }

    var numArray = new Float64Array(matchingArr)
    var sortedArr = [];

    for (let num of numArray.sort().reverse()) {

      for (let i = 0; i < encodedArr.length; i++) {
          let s = encodedArr[i];

          if (s.startsWith(num.toString())) {

              sortedArr.push(s);

              encodedArr.splice(i, 1);
              break;
          }
      }
    }

    for (let s of sortedArr) {
      sortedObject[`${s.substring(s.indexOf("points") + 7, s.length)}`] = `${s.substring(0, s.indexOf("points") + 6)}`
    }

    // Prepare data for CSV encoding
    for (const [key, value] of Object.entries(sortedObject)) {

      if (key.includes("item?id=")) {
        csvReadyEncodedArr.push(
          {
            title : key.substring(0, key.indexOf("item?id=") - 1),
            url : `https://news.ycombinator.com/${key.substring(key.indexOf("item?id="), key.length)}`,
            points : ` ${value}`
          }
        )
      } else {
        csvReadyEncodedArr.push(
          {
            title : key.substring(0, key.indexOf("http") - 1),
            url : key.substring(key.indexOf("http"), key.length),
            points : ` ${value}`
          }
        )
      }

    }

    await exportCSVPopular(csvReadyEncodedArr)
    return

  }


  // Order of operations
  (async () => {

    while (validateNumber > 0) {
      await validateDisplayedArticles();
      await goToNextPage();
    }

    haveALovelyConversation();
    return

  })();

  return

}

// Execute order 66
(async () => {
  await saveHackerNewsArticles();
  return
})();
