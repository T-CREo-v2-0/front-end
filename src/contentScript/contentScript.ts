/**
 * Content script to scrape tweets from Twitter and inject credibility ranking
 */
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    // Request to scrape tweets
    if (msg.sender === "www" && msg.instruction === "api") {
      // SCRAPING ZONE: Get tweets ids
      const times = document.querySelectorAll("[data-testid=tweet] time");
      const tweetIds = [];

      // Example: /username/status/1234567890123456789
      for (let i = 0; i < times.length; i++) {
        const href = times[i].parentElement.getAttribute("href");
        if (href) {
          const tweetId = href.split("/")[3];
          tweetIds.push(tweetId);
        }
      }

      // TO-MODIFY:
      // Get tweets texts
      const tweetTextDivs = document.querySelectorAll(
        "[data-testid=tweetText]"
      );
      const texts = [];
      for (let i = 0; i < tweetTextDivs.length; i++) {
        texts.push(tweetTextDivs[i].querySelector("span").innerText);
      }
      const tweetTexts = texts;
      console.log("T-CREo:", "Number of tweets:", tweetIds.length);

      let tweetContainers = Array.from(
        document.querySelectorAll("[data-testid=tweet]")
      );
      tweetContainers.map((tweetContainer, index: number) => {
        // If doesnt have Creditability-Ranking class, create one
        if (
          tweetContainer.children[0].querySelector(".Credibility-Ranking") ==
          null
        ) {
          const credibilityDiv = document.createElement("div");
          credibilityDiv.id = "TweetNumber" + index;
          credibilityDiv.className = "Credibility-Ranking";
          credibilityDiv.innerText = "T-CREo Credibility: Loading...";
          credibilityDiv.style.color = "#1DA1F2";
          credibilityDiv.style.fontSize = "14px";
          credibilityDiv.style.fontWeight = "bold";
          credibilityDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
          credibilityDiv.style.textAlign = "right";
          credibilityDiv.style.paddingRight = "5px";
          // Append credibility div to the child of tweetContainer.
          tweetContainer.children[0].appendChild(credibilityDiv);
        }
      });

      // Send response to sender
      port.postMessage({
        instruction: "api",
        tweetIds: tweetIds,
        tweetTexts: tweetTexts,
        tweetContainers: tweetContainers,
      });
    } else if (msg.sender === "www" && msg.instruction === "update") {
      // Update credibility ranking
      UpdateTweetCredibility(msg.credList);
    }
  });
});

/* Function to update the credibility of the tweets
 * @param credibilityList: list of credibility values
 */
function UpdateTweetCredibility(credibilityList: string[]) {
  //console.log(credibilityList)
  console.log("T-CREo:", "Number of analyzed tweets:", credibilityList.length);

  credibilityList.map((credibilityItem, index: number) => {
    const tweetContainer = document.querySelector<HTMLElement>(
      "#TweetNumber" + index
    );
    if (credibilityItem !== "--") {
      const Green = Math.floor(parseInt(credibilityItem) * 2.55);
      const Red = 255 - Math.floor(parseInt(credibilityItem) * 2.55);
      let GreenHex = Green.toString(16);
      if (GreenHex.length < 2) {
        GreenHex = "0" + GreenHex;
      }
      let RedHex = Red.toString(16);
      if (RedHex.length < 2) {
        RedHex = "0" + RedHex;
      }
      const FinalColor: string = "#" + RedHex + GreenHex + "00";
      if (tweetContainer != null) {
        tweetContainer.innerText =
          "T-CREo Credibility: " + credibilityItem + "%";
        tweetContainer.style.color = FinalColor;
      }
    } else {
      if (tweetContainer != null) {
        tweetContainer.innerText = "T-CREo Credibility: --";
      }
    }
  });
}
