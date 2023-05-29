/**
 * Credibility parameters component
 *
 */
import React from "react";
// import constants from './constants'

const labels = [
  {
    id: 1,
    title: "Customize text credibility parameters",
    inputs: [
      {
        id: 1,
        title: "Spam detection",
        placeholder: "Spam",
        type: "text",
        name: "weightSpam",
      },
      {
        id: 2,
        title: "Bad words proportion to text",
        placeholder: "Bad words",
        type: "text",
        name: "weightBadWords",
      },
      {
        id: 3,
        title: "Misspelling detection",
        placeholder: "Misspelling",
        type: "text",
        name: "weightMisspelling",
      },
    ],
  },
  {
    id: 2,
    title: "Customize tweet credibility parameters",
    inputs: [
      {
        id: 1,
        title: "Text credibility",
        placeholder: "Text",
        type: "text",
        name: "weightText",
      },
      {
        id: 2,
        title: "User credibility",
        placeholder: "User",
        type: "text",
        name: "weightUser",
      },
      {
        id: 3,
        title: "Social credibility",
        placeholder: "Social",
        type: "text",
        name: "weightSocial",
      },
    ],
  },
  {
    id: 3,
    title: "Max followers parameter",
    inputs: [
      {
        id: 1,
        title: "Max followers",
        placeholder: "Max followers",
        type: "text",
        name: "maxFollowers",
      },
    ],
  },
];

function OptionsForm() {
  const [inputs, setInputs] = React.useState({
    weightSpam: "",
    weightBadWords: "",
    weightMisspelling: "",
    weightText: "",
    weightUser: "",
    weightSocial: "",
    maxFollowers: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    // Guarda en Chrome Storage
    chrome.storage.sync.set({ inputs: inputs }, function () {
      console.log("Inputs saved");
    });

  };

  return (
    <div className="container p-2.5 ">
      <h1 className="title text-2xl font-bold mb-4">
        T-Creo v2.0 - Credibility parameters
      </h1>
      <form onSubmit={handleSubmit}>
        {labels.map((label) => (
          <div key={label.id}>
            <h2 className="title text-xl font-bold">{label.title}</h2>
            {label.inputs.map((input) => (
              <div className="md:flex md:items-center my-3" key={input.id}>
                <div className="md:w-1/3">
                  <label
                    htmlFor=""
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  >
                    {input.title}
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type={input.type}
                    id={input.name}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder={input.placeholder}
                    onChange={(event) =>
                      setInputs({
                        ...inputs,
                        [input.name]: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save Weights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { OptionsForm };
