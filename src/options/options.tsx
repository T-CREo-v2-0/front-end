import React from "react";
import { labels } from "./labels";
import { VerifySum } from "../controllers/weightCalculation";

const defaultWeight = {
  weightBadWords: 0.33,
  weightMisspelling: 0.23,
  weightSpam: 0.44,
  weightText: 0.34,
  weightUser: 0.33,
  weightSocial: 0.33,
  maxFollowers: 2000000,
};

const Options = () => {
  const [inputs, setInputs] = React.useState({
    weightSpam: defaultWeight.weightSpam,
    weightBadWords: defaultWeight.weightBadWords,
    weightMisspelling: defaultWeight.weightMisspelling,
    weightText: defaultWeight.weightText,
    weightUser: defaultWeight.weightUser,
    weightSocial: defaultWeight.weightSocial,
    maxFollowers: defaultWeight.maxFollowers,
  });

  // Show error message
  interface ShowError {
    weightSpam: boolean;
    weightBadWords: boolean;
    weightMisspelling: boolean;
    weightText: boolean;
    weightUser: boolean;
    weightSocial: boolean;
    maxFollowers: boolean;
  }

  const [showError, setShowError] = React.useState<ShowError>({
    weightSpam: false,
    weightBadWords: false,
    weightMisspelling: false,
    weightText: false,
    weightUser: false,
    weightSocial: false,
    maxFollowers: false,
  });

  // Check if input is valid and show error message
  const handleShowError = (name: string) => {
    const inputElement = document.getElementById(name) as HTMLInputElement;
    const isValid = inputElement.checkValidity();

    setShowError((prevShowError) => ({
      ...prevShowError,
      [name]: !isValid,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs);

    // Check if weights text (spam, badwords, misspelling) sum is 1
    const sum = VerifySum([
      inputs.weightSpam,
      inputs.weightBadWords,
      inputs.weightMisspelling,
    ]);
    if (!sum) {
      alert("The sum of the weights for text credibility parameters must be 1");
      return;
    }

    // Check if weights tweet (text, user, social) sum is 1
    const sum2 = VerifySum([
      inputs.weightText,
      inputs.weightUser,
      inputs.weightSocial,
    ]);
    if (!sum2) {
      alert(
        "The sum of the weights for tweet credibility parameters must be 1"
      );
      return;
    }

    // Save in chrome storage
    chrome.storage.sync.set(inputs);

    // Alert success
    alert("Parameters saved successfully");
  };

  return (
    <div className="container p-2.5 ">
      <h1 className="title text-2xl font-bold mb-4">
        T-Creo - Credibility parameters
      </h1>
      <form onSubmit={handleSubmit}>
        {labels.map((label) => (
          <div key={label.id}>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <h2 className="title text-xl font-bold md:text-right">
                  {label.title}
                </h2>
              </div>
              <div className="md:w-2/3"></div>
            </div>
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
                    required
                    autoComplete="off"
                    {...(input.min && { min: input.min })}
                    {...(input.max && { max: input.max })}
                    {...(input.type === "number" && { step: "any" })}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder={input.placeholder}
                    defaultValue={inputs[input.name as keyof typeof inputs]}
                    onChange={(event) =>
                      setInputs({
                        ...inputs,
                        [input.name]: Number(event.target.value),
                      })
                    }
                    onBlur={() => handleShowError(input.name)}
                  />
                  {showError[input.name as keyof ShowError] && (
                    <span className="ml-1 text-red-500 italic text-sm">
                      {input.errormessage}
                    </span>
                  )}
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
};

export default Options;
