import React from "react";
import TCREoClient from "../api/client";
import { Language } from "../api/types";
import Spinner from "./Spinner";

// Create client
const client = new TCREoClient();

function TWCredibility() {
  const [isLoading, setIsLoading] = React.useState(false);

  const ValidateTwitterTweets = () => {
    setIsLoading(true);

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
                // response.tweetIds.map((_: number) => {
                //   return client.getTweetCredibility(
                //     "1651454488429879300",
                //     { weightBadWords: +filterOptions.weightBadWords,
                //       weightMisspelling: +filterOptions.weightMisspelling,
                //       weightSpam: +filterOptions.weightSpam,
                //       weightText: +filterOptions.weightText,
                //       weightSocial: +filterOptions.weightSocial,
                //       weightUser: +filterOptions.weightUser
                //     },
                //     +filterOptions.maxFollowers
                //   );
                // });
                response.tweetTexts.map((tweet: number) => {
                  return client.getPlainTextCredibility(
                    {
                      weightBadWords: filterOptions.weightBadWords,
                      weightMisspelling: filterOptions.weightMisspelling,
                      weightSpam: filterOptions.weightSpam,
                    },
                    {
                      text: tweet.toString(),
                      lang: "es" as Language,
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

              setIsLoading(false);
            }
          }
        );
      });
    });
  };

  return (
    <div id="PageSensitiveButtons" className="flex flex-col justify-center">
      <hr id="firstHorBar" className="h-0.5 my-2.5 bg-white" />
      {!isLoading ? (
        <div className="flex flex-col justify-center">
          <h6 id="currentPage" className="flex justify-center text-base">
            You are currently on a Twitter page
          </h6>
          <button
            id="VerifyPageButtonTwitterApi"
            type="submit"
            className="bg-[#1DA1F2] hover:bg-[#657786] text-white font-bold py-2 px-4 rounded w-1/3 self-center my-2.5"
            onClick={ValidateTwitterTweets}
          >
            Verify Page Tweets
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export { TWCredibility };
