import React from "react";

function ValidateTwitterTweets() {
  // Get input text from chrome storage and print
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
      alert(
        "weightSpam: " +
          filterOptions.weightSpam +
          "\n" +
          "weightBadWords: " +
          filterOptions.weightBadWords +
          "\n" +
          "weightMisspelling: " +
          filterOptions.weightMisspelling +
          "\n" +
          "weightText: " +
          filterOptions.weightText +
          "\n" +
          "weightUser: " +
          filterOptions.weightUser +
          "\n" +
          "weightSocial: " +
          filterOptions.weightSocial +
          "\n" +
          "maxFollowers: " +
          filterOptions.maxFollowers +
          "\n"
      );
    }
  );
}

function TWCredibility() {
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
