import React from "react";
import CONSTANTS from "../utils/constants.js";

export const AlertBanner = ({ isCritical, alert }) => {
  if (!isCritical || !alert) {
    return null;
  }

  return (
    <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="font-bold text-lg">{alert}</p>
          <p className="text-sm mt-1">
            System is under critical load. Please monitor closely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
