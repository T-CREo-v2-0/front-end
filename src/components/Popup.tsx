/**
 * Popup main component T-CREo
 *
 */
import React from "react";

function Popup() {
  return (
    <div className="container max-h-60 p-2.5 w-[480px]">
      <h2 className="title text-3xl font-bold my-[1px] text-center py-2">
        T-CREo v2.0
      </h2>
      <div className="row flex">
        {/* Ejemplo y selección de lenguaje */}
        <div className="col-9 flex-auto w-2/3">
          <div id="usrform">
            <div className="form-group text-center">
              <label className="labels" htmlFor="tweet">
                Text to Analyze
              </label>
              <textarea
                id="text"
                className="form-control rounded-lg h-20 my-2.5 max-w-[90%] p-[3%] border-2 border-gray-300 font-mono text-sm"
                name="tweet"
                rows={2}
                cols={40}
                form="usrform"
              >
                I'm sorry professor, but I must not tell lies
              </textarea>
            </div>
            <select id="language" className="bg-white rounded p-1 float-right">
              <option value="es">ES</option>
              <option value="en" selected>
                EN
              </option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>

        {/* Porcentaje de credibilidad */}
        <div className="col-3 w-1/4">
          <div className="form-group text-center">
            <label className="labels">Credibility</label>
            <p
              id="credibility"
              className="flex justify-center text-gray-500 text-3xl"
            >
              {" "}
              0%{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Botón de análisis */}
      <div className="flex justify-center">
        <button
          id="submitButton"
          type="submit"
          className="btn btn-primary mt-2.5"
        >
          Verify
        </button>
      </div>
      <hr id="firstHorBar"></hr>
      <h6 id="currentPage" className="flex justify-center text-base">
        {" "}
      </h6>
      <div id="PageSensitiveButtons" className="flex justify-center">
        <button
          id="VerifyPageButtonTwitterApi"
          type="submit"
          className="btn btn-primary"
        >
          Verify Page Tweets with Twitter Api
        </button>
      </div>

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
}

export { Popup };
