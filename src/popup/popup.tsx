
import React, { useState } from "react";
import TCREoClient from "../api/client";
import { Language } from "../api/types";
import { TWCredibility } from "./TWCredibility";

const client = new TCREoClient();

const defaultWeight = {
  weightBadWords: 0.33,
  weightMisspelling: 0.23,
  weightSpam: 0.44,
  weightText: 0.34,
  weightUser: 0.33,
  weightSocial: 0.33,
  maxFollowers: 2000000,
};

const Popup = () => {
    // Plain text to analyze
  const [inputs, setInput] = useState({
    text: "I'm sorry professor, but I must not tell lies",
    lang: "en",
  });
  const [credibility, setCredibility] = useState(0);
  const [weights, setWeights] = useState(defaultWeight);

  // Get weights from local storage
  React.useEffect(() => {
    const weightSpam = localStorage.getItem("weightSpam");
    const weightBadWords = localStorage.getItem("weightBadWords");
    const weightMisspelling = localStorage.getItem("weightMisspelling");
    const weightText = localStorage.getItem("weightText");
    const weightUser = localStorage.getItem("weightUser");
    const weightSocial = localStorage.getItem("weightSocial");
    const maxFollowers = localStorage.getItem("maxFollowers");

    if (
      weightSpam &&
      weightBadWords &&
      weightMisspelling &&
      weightText &&
      weightUser &&
      weightSocial &&
      maxFollowers
    ) {
      setWeights({
        weightSpam: Number(weightSpam),
        weightBadWords: Number(weightBadWords),
        weightMisspelling: Number(weightMisspelling),
        weightText: Number(weightText),
        weightUser: Number(weightUser),
        weightSocial: Number(weightSocial),
        maxFollowers: Number(maxFollowers),
      });
    }
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...inputs, text: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    // Get input text from chrome storage and print
    chrome.storage.sync.get(["inputs"], function (result) {
        alert("Inputs " + result.inputs.weightSpam);
        }
    );

    client
      .getPlainTextCredibility(
        {
          weightBadWords: weights.weightBadWords,
          weightMisspelling: weights.weightMisspelling,
          weightSpam: weights.weightSpam,
        },
        {
          text: inputs.text,
          lang: inputs.lang as Language,
        }
      )
      .then((credibility: { credibility: number }) => {
        console.log(credibility);
        // Guarda credibilidad redondeada a 2 decimales
        setCredibility(Math.round(credibility.credibility * 100) / 100);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="container max-h-60 p-2.5 w-[480px]">
      <h2 className="title text-3xl font-bold my-1 text-center py-2">
        T-CREo v2.0.0
      </h2>
      <form id="usrform" onSubmit={handleSubmit}>
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
                  onChange={handleTextChange}
                >
                  {inputs.text}
                </textarea>
              </div>
              <select
                id="language"
                className="bg-white rounded p-1 float-right mr-3"
                onChange={(event) =>
                  setInput({ ...inputs, lang: event.target.value })
                }
              >
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
                className="flex items-center justify-center h-20 my-2.5 text-gray-500 text-3xl"
              >
                {credibility}%
              </p>
            </div>
          </div>
        </div>

        {/* Botón de análisis */}
        <div className="flex justify-center">
          <button
            id="submitButton"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verify
          </button>
        </div>
      </form>

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