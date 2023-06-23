import React from "react";
import { labels } from "./labels";
import { VerifySum } from "../controllers/weightCalculation";

const Options = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    weightSpam: 0.44,
    weightBadWords: 0.33,
    weightMisspelling: 0.23,
    weightSemantic: 0.0,
    weightText: 0.25,
    weightUser: 0.25,
    weightSocial: 0.25,
    weightTopic: 0.25,
    maxFollowers: 2000000,
  });

  // Get parameters from storage
  React.useEffect(() => {
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
        if (filterOptions.weightSpam) {
          setInputs(filterOptions as any);
          setIsLoading(false);
        }
      }
    );
  }, []);

  // Show error message
  const [showError, setShowError] = React.useState({
    weightSpam: false,
    weightBadWords: false,
    weightMisspelling: false,
    weightSemantic: false,
    weightText: false,
    weightUser: false,
    weightSocial: false,
    weightTopic: false,
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

    // Check if weights text (spam, badwords, misspelling) sum is 1
    const sum = VerifySum([
      inputs.weightSpam,
      inputs.weightBadWords,
      inputs.weightMisspelling,
      inputs.weightSemantic,
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
      inputs.weightTopic,
    ]);
    if (!sum2) {
      alert(
        "The sum of the weights for tweet credibility parameters must be 1"
      );
      return;
    }

    // Save in chrome storage
    chrome.storage.sync.set(inputs);
    console.log(inputs);
    alert("Parameters saved successfully");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    // Center content
    <div className="container p-4 mx-auto my-4">
      <h1 className="title text-2xl font-bold my-1 text-center py-2 text-[#1DA1F2]">
        T-CREo - Credibility parameters
      </h1>
      <form onSubmit={handleSubmit}>
        {labels.map((label) => (
          <div key={label.id}>
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <h2 className="title text-xl font-bold md:text-right text-[#14171A]">
                  {label.title}
                </h2>
              </div>
              <div className="md:w-1/2"></div>
            </div>
            {label.inputs.map((input) => (
              <div className="md:flex md:items-center my-3" key={input.id}>
                <div className="md:w-1/2">
                  <label
                    htmlFor=""
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  >
                    {input.title}
                  </label>
                </div>
                <div className="md:w-1/2">
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
                  {showError[input.name as keyof typeof showError] && (
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
          <div className="md:w-1/2"></div>
          <div className="md:w-1/2">
            <button
              className="shadow bg-[#1DA1F2] hover:bg-[#657786] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
