import React from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-red-500 text-white px-6 py-4 mx-6 mt-4 rounded-lg animate-slide-down">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <span className="font-semibold">{message}</span>
        </div>
        <button 
          onClick={onDismiss}
          className="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;