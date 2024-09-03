import React from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  meetingLink: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onCopy, meetingLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Share Meeting</h2>
        <p className="mb-4">Click the button below to copy the meeting link:</p>
        <button
          onClick={onCopy}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Join Info
        </button>
        <div className="text-gray-700">{meetingLink}</div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
