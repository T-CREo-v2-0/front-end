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
      "weightSemantic",
      "weightText",
      "weightUser",
      "weightSocial",
      "weightTopic",
      "maxFollowers",
    ],
    function (filterOptions) {
      if (!filterOptions.weightSpam) {
        chrome.storage.sync.set({ weightSpam: 0.34 });
        chrome.storage.sync.set({ weightBadWords: 0.43 });
        chrome.storage.sync.set({ weightMisspelling: 0.23 });
        chrome.storage.sync.set({ weightSemantic: 0.0 });
        chrome.storage.sync.set({ weightText: 0.25 });
        chrome.storage.sync.set({ weightUser: 0.25 });
        chrome.storage.sync.set({ weightSocial: 0.25 });
        chrome.storage.sync.set({ weightTopic: 0.25 });
        chrome.storage.sync.set({ maxFollowers: 2000000 });
      }
    }
  );
});

const Popup = () => {
  // If Twitter page, show Twitter credibility button
  const [showTwButton, setShowTwButton] = React.useState(false);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const tabUrl = tab.url;

    if (tabUrl.includes("twitter.com") || tabUrl.includes("localhost:5173")) setShowTwButton(true);
  });

  return (
    <div className="container p-2.5 w-[480px] bg-gradient-to-r from-[#F5F8FA] to-[#e0f4ff] rounded-lg shadow-lg">
      <h2 className="title text-3xl font-bold my-1 text-center py-2 text-transparent bg-clip-text bg-gradient-to-r to-[#657786] from-[#1DA1F2]">
        T-CREo v2.0
      </h2>

      {/* Plain Text Credibility */}
      <PlainTextCredibility />

      {/* TW Credibility */}
      {showTwButton && <TWCredibility />}
    </div>
  );
};

export default Popup;
