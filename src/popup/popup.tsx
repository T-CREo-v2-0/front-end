import React from "react";
import { TWCredibility } from "./TWCredibility";
import { PlainTextCredibility } from "./PlainTextCredibility";

// Get parameters
document.addEventListener("DOMContentLoaded", function () {
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
      if (!filterOptions.weightSpam) {
        chrome.storage.sync.set({ weightSpam: 0.34 });
        chrome.storage.sync.set({ weightBadWords: 0.43 });
        chrome.storage.sync.set({ weightMisspelling: 0.23 });
        chrome.storage.sync.set({ weightText: 0.34 });
        chrome.storage.sync.set({ weightUser: 0.33 });
        chrome.storage.sync.set({ weightSocial: 0.33 });
        chrome.storage.sync.set({ maxFollowers: 2000000 });
      }
    }
  );

  // // If Twitter page, show Twitter credibility button
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   const tab = tabs[0];
  //   const tabUrl = tab.url;

  //   if (!tabUrl.includes("twitter.com")) {
  //     document.getElementById("VerifyPageButtonTwitterApi").style.display =
  //       "none";
  //   }
  // });
});

const Popup = () => {

  return (
    <div className="container max-h-60 p-2.5 w-[480px]">
      <h2 className="title text-3xl font-bold my-1 text-center py-2">
        T-CREo v2.0.0
      </h2>

      {/* Plain Text Credibility */}
      <PlainTextCredibility />

      <hr id="firstHorBar" className="my-2.5" />
      <h6 id="currentPage" className="flex justify-center text-base">
        {" "}
      </h6>

      {/* TW Credibility */}
      <TWCredibility />

      {/* Spinner */}
    </div>
  );
};

export default Popup;
