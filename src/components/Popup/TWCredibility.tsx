
// import React from "react";



function TWCredibility() {
  return (
    <div id="PageSensitiveButtons" className="flex justify-center">
      <button
        id="VerifyPageButtonTwitterApi"
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log("Verify Page Tweets with Twitter Api");
        }}
      >
        Verify Page Tweets with Twitter Api
      </button>
    </div>
  );
}

export { TWCredibility };
