import React from 'react';

const Ticket = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiURL = import.meta.env.VITE_BASE_URL
  return (
    <div>
      <h1>Ticket Page</h1>
      {/* Add content to display show-related information */}
      <p>{apiKey}</p>
    </div>
  );
};

export default Ticket;
