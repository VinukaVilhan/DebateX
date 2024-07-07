import React from "react";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  message: string;
  success: "0" | "1"; // Assuming success is either "0" or "1"
  button: string;
}

const Modal: React.FC<ModalProps> = ({ show, onHide, message, success, button }) => {
  const modalBgColor = success === "1" ? "bg-green-100" : "bg-red-100";
  const modalBorderColor = success === "1" ? "border-green-500" : "border-red-500";
  const modalTextColor = success === "1" ? "text-green-900" : "text-red-900";

  return (
    <>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${modalBgColor} ${modalBorderColor}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className={`px-4 pt-5 pb-4 sm:p-6 ${modalTextColor}`}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6" id="modal-headline">
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={onHide}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  {button}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
