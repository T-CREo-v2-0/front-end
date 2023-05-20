/**
 * Credibility parameters component
 * 
 */
// import React from "react";

function Options() {
  return (
    <div className="container">
      <h1>Customize text credibility parameters</h1>
      <div className="row">
        <div className="col-sm-6">
          <h3>Filters</h3>
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
        <div className="col-sm-6">
          <h3>Weights</h3>
          <div>
            <input type="text" id="weightSpam"/>
          </div>
          <div>
            <input type="text" id="weightBadWords"/>
          </div>
          <div>
            <input type="text" id="weightMisspelling"/>
          </div>
        </div>
        <div className="col-sm">
        </div>
      </div>
      <h1>Customize tweet credibility parameters</h1>
      <div className="row">
        <div className="col-sm-6">
          <h3>Filters</h3>
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
        <div className="col-sm-6">
          <h3>Weights</h3>
          <div>
            <input type="text" id="weightText"/>
          </div>
          <div>
            <input type="text" id="weightUser"/>
          </div>
          <div>
            <input type="text" id="weightSocial"/>
          </div>
        </div>
        <div className="col-sm">
        </div>
      </div>
      <h1>Max followers parameter</h1>
      <div className="row">
        <div className="col-sm-6">
          <div>
            <p>Max followers</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div>
            <input type="text" id="maxFollowers"/>
          </div>
        </div>
        <div className="col-sm">
        </div>
      </div>
      <input type="submit" id="SaveWeights" value="Save Weights"/>
    </div>
    );
}

export { Options }