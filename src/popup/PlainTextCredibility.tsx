import React, { useState } from "react";
import TCREoClient from "../api/client";
import { Language } from "../api/types";

const client = new TCREoClient();

function PlainTextCredibility() {
  // Plain text to analyze
  const [inputs, setInput] = useState({
    text: "I'm sorry professor, but I must not tell lies",
    lang: "en",
  });
  const [credibility, setCredibility] = useState(0);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...inputs, text: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get weights from chrome storage
    chrome.storage.sync.get(
      ["weightSpam", "weightBadWords", "weightMisspelling"],
      function (filterOptions) {
        client
          .getPlainTextCredibility(
            {
              weightBadWords: filterOptions.weightBadWords,
              weightMisspelling: filterOptions.weightMisspelling,
              weightSpam: filterOptions.weightSpam,
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
      }
    );
  };

  return (
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
                className="form-control rounded-lg h-20 my-2.5 max-w-[90%] p-[3%] border-2 border-gray-300 font-mono text-sm bg-gray-50"
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
          className="bg-[#1DA1F2] hover:bg-[#657786] text-white font-bold py-2 px-4 rounded"
        >
          Verify
        </button>
      </div>
    </form>
  );
}

export { PlainTextCredibility };
