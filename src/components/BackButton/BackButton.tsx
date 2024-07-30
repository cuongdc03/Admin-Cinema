import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton: React.FC = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Back
    </button>
  );
};

export default BackButton;
