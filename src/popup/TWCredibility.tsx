import React from "react";
import TCREoClient from "../api/client";
import { Language } from "../api/types";

// Create client
const client = new TCREoClient();

function TWCredibility() {
  const ValidateTwitterTweets = () => {
    // Chrome scripting and send message
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const port = chrome.tabs.connect(tabs[0].id as number);

      port.postMessage({ sender: "www", instruction: "api" });

      // Get parameters
      port.onMessage.addListener(function (response) {
        chrome.storage.sync.get(
          [
            "weightSpam",
            "weightBadWords",
            "weightMisspelling",
            "weightText",
            "weightUser",
            "weightSocial",
            "maxFollowers",
          ],
          function (filterOptions) {
            // TO-MODIFY Get tweets
            if (response.instruction === "api") {
              // TO-MODIFY
              let promiseList: Promise<{ credibility: number }>[] =
                response.tweetTexts.map((tweet: number) => {
                  return client.getPlainTextCredibility(
                    {
                      weightBadWords: filterOptions.weightBadWords,
                      weightMisspelling: filterOptions.weightMisspelling,
                      weightSpam: filterOptions.weightSpam,
                    },
                    {
                      text: tweet.toString(),
                      lang: "en" as Language,
                    }
                  );
                });

              Promise.all(promiseList).then((values) => {
                port.postMessage({
                  sender: "www",
                  instruction: "update",
                  credList: values.map((value) => value.credibility),
                });
              });
            }
          }
        );
      });
    });
  };

  return (
    <div id="PageSensitiveButtons" className="flex justify-center">
      <button
        id="VerifyPageButtonTwitterApi"
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={ValidateTwitterTweets}
      >
        Verify Page Tweets with Twitter Api
      </button>
    </div>
  );
}

export { TWCredibility };
