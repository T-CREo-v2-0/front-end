import React from "react";

function Popup() {
  return (
    <div className="container max-h-60 p-2.5 w-[700px]">
      <h2 className="title text-3xl font-bold mt-[1px] text-center">T-CREo</h2>
      <div className="row">
        {/* Ejemplo y selección de lenguaje */}
        <div className="col-9">
          <div id="usrform">
            <div className="form-group">
              <label className="labels" htmlFor="tweet">
                Text to Analyze
              </label>
              <textarea
                id="text"
                className="form-control"
                name="tweet"
                rows={2}
                cols={40}
                form="usrform"
              >
                I'm sorry professor, but I must not tell lies
              </textarea>
            </div>
            <select id="language">
              <option value="es">ES</option>
              <option value="en" selected>
                EN
              </option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
        {/* Porcentaje de credibilidad */}
        <div className="col-3">
          <div className="form-group">
            <label className="labels">Credibility</label>
            <p id="credibility" className="flex-center">
              {" "}
              0%{" "}
            </p>
          </div>
        </div>
      </div>
      {/* Botón de análisis */}
      <div className="flex-center">
        <button id="submitButton" type="submit" className="btn btn-primary">
          Verify
        </button>
      </div>
      <hr id="firstHorBar"></hr>
      <h6 id="currentPage" className="flex-center"> </h6>
      <div id="PageSensitiveButtons" className="flex-center">
        <button
          id="VerifyPageButtonScraperTW"
          type="submit"
          className="btn btn-primary"
        >Verify Page Tweets with Scrapping</button>
        <button
          id="VerifyPageButtonTwitterApi"
          type="submit"
          className="btn btn-primary"
        >Verify Page Tweets with Twitter Api</button>
      </div>
      <div id="PageSensitiveButtonsFB" className="flex-center">
        <button
          id="VerifyPageButtonScraperFB"
          type="submit"
          className="btn btn-primary"
        >Verify Page Facebook</button>
      </div>
      <hr id="secondHorBar"/>
      <div className="spinner-container" id="sp-content">
        <img className="img-www" src="../public/static/images/get_started48.png" alt=""/>
        <p className="saving"><span className="span" id="span-one">.</span><span className="span" id="span-two">.</span><span className="span" id="span-three">.</span></p>
    </div>
    </div>
  );
}

export { Popup }