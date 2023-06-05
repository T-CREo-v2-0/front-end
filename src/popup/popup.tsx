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

  // If Twitter page, show Twitter credibility button
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const tabUrl = tab.url;

    if (!tabUrl.includes("twitter.com")) {
      document.getElementById("VerifyPageButtonTwitterApi").style.display =
        "none";
    }
  });
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
      {/* <hr id="secondHorBar" />
      <div
        className="bg-cover display-none text-8xl h-full left-0 mt-0 mb-auto absolute top-0 w-full"
        id="sp-content"
      >
        <img
          className="img-www"
          src="../public/static/images/get_started48.png"
          alt=""
        />
        <p className="saving text-center -mt-12 mb-[40%]">
          <span className="span" id="span-one">
            .
          </span>
          <span className="span" id="span-two">
            .
          </span>
          <span className="span" id="span-three">
            .
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default Popup;
