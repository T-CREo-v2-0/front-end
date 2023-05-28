/**
 * Credibility parameters component
 *
 */
// import React from "react";

function OptionsForm() {
  return (
    <div className="container p-2.5 ">
      <h1 className="title text-2xl font-bold">
        Customize text credibility parameters
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-sm-6 p-2 p-2">
          <h3 className="title text-xl font-bold">Filters</h3>
          <div>
            <p>Spam detection</p>
          </div>
          <div>
            <p>Bad words proportion to text</p>
          </div>
          <div>
            <p>Misspelling detection</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <h3>Weights</h3>
          <div>
            <input
              type="text"
              id="weightSpam"
              className="form-control"
              placeholder="Spam"
            />
          </div>
          <div>
            <input
              type="text"
              id="weightBadWords"
              className="form-control"
              placeholder="Bad words"
            />
          </div>
          <div>
            <input
              type="text"
              id="weightMisspelling"
              className="form-control"
              placeholder="Misspelling"
            />
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <h1 className="title text-2xl font-bold">
        Customize tweet credibility parameters
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-sm-6 p-2">
          <h3 className="title text-xl font-bold">Filters</h3>
          <div>
            <p>Text credibility</p>
          </div>
          <div>
            <p>User credibility</p>
          </div>
          <div>
            <p>Social credibility</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <h3>Weights</h3>
          <div>
            <input
              type="text"
              id="weightText"
              className="form-control"
              placeholder="Text"
            />
          </div>
          <div>
            <input
              type="text"
              id="weightUser"
              className="form-control"
              placeholder="User"
            />
          </div>
          <div>
            <input
              type="text"
              id="weightSocial"
              className="form-control"
              placeholder="Social"
            />
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <h1 className="title text-2xl font-bold">Max followers parameter</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-sm-6 p-2">
          <div>
            <p>Max followers</p>
          </div>
        </div>
        <div className="col-sm-6 p-2">
          <div>
            <input
              type="text"
              id="maxFollowers"
              className="form-control"
              placeholder="Max followers"
            />
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <input type="submit" id="SaveWeights" value="Save Weights" />
    </div>
  );
}

export { OptionsForm };
