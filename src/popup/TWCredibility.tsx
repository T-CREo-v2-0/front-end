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
            "weightSemantic",
            "weightText",
            "weightUser",
            "weightSocial",
            "weightTopic",
            "maxFollowers",
          ],
          function (filterOptions) {
            if (response.instruction === "api") {
              let promiseList: Promise<{ credibility: number }>[] =
                response.tweetIds.map((tweet_id_str: string) => {
                  return client.getTweetCredibility(
                    tweet_id_str,
                    {
                      weightBadWords: filterOptions.weightBadWords,
                      weightMisspelling: filterOptions.weightMisspelling,
                      weightSpam: filterOptions.weightSpam,
                      weightSemantic: filterOptions.weightSemantic,
                      weightText: filterOptions.weightText,
                      weightSocial: filterOptions.weightSocial,
                      weightUser: filterOptions.weightUser,
                      weightTopic: filterOptions.weightTopic,
                    },
                    filterOptions.maxFollowers
                  );
                });

              Promise.all(promiseList)
                .then((values) => {
                  port.postMessage({
                    sender: "www",
                    instruction: "update",
                    credList: values.map((value) => Math.round(value.credibility * 100) / 100),
                  });
                  setIsLoading(false);
                })
                .catch((error: any) => {
                  console.log(error);
                  setIsLoading(false);
                });
            }
          }
        );
      });
    });
  };

  return (
    <div id="PageSensitiveButtons" className="flex flex-col justify-center">
      <hr id="firstHorBar" className="h-0.5 my-2.5 bg-white" />
      <div className="flex flex-col justify-center">
        <h6 id="currentPage" className="flex justify-center text-base">
          You are currently on a Twitter page
        </h6>
        {!isLoading ? (
          <button
            id="VerifyPageButtonTwitterApi"
            type="submit"
            className="bg-[#1DA1F2] hover:bg-[#657786] text-white font-bold py-2 px-4 rounded w-1/3 self-center my-2.5"
            onClick={ValidateTwitterTweets}
          >
            Verify Page Tweets
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export { TWCredibility };
