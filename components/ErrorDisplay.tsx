import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="p-6 bg-red-500/50 backdrop-blur-sm rounded-2xl text-center border-2 border-red-500 shadow-lg">
    <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
    <p className="text-red-100">{message}</p>
  </div>
);

export default ErrorDisplay;
