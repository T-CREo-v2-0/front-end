import React, { useState } from "react";

const Modal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="btn-modal text-sm font-bold my-1 text-center py-2 text-[#808080]"
      >
        How to use
      </button>

      {modal && (
        <div
          id="small-modal"
          className="flex justify-center align-center fixed z-50 w-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]"
        >
          <div onClick={toggleModal} className="overlay">
            <div className="relative bg-white rounded-lg">
              <div className="flex items-center justify-between align-center p-5 border-b rounded-t">
                <h2>Instructions</h2>
                <button className="close-modal" onClick={toggleModal}>
                  {" "}
                  X{" "}
                </button>
              </div>
              <p>1. Set a number between 0 and 1 in each field.</p>
              <p>
                2. If you want to disable one of the features, its value must be
                0.
              </p>
              <p>
                3. The sum of the inputs of each of the parameters must be 1.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
