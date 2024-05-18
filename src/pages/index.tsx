import React, { useState } from 'react';
import axios from 'axios';
import Bar from '../components/Bar';
import Feed from '../components/Feed';

interface Calculation {
  id: string;
  operation: string;
  left: number;
  right: number;
  result: number;
  message: string;
  status: string;
}

function Home() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNewCalculation = async () => {
    setButtonDisabled(true); // Disable the button New Calculation
    setErrorMessage(null);

    try {
      const response = await axios.get('/api/get-calculation'); // Get the data to show the progress of the execution
      const { data } = response;

      setCalculations([...calculations, { ...data }]);
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000); // Activate the button New Calculation after 1 second to avoid DoS attack
    }
  };

  const handleClearHistory = () => { // Remove all cards from page
    setCalculations([]);
  };

  return (
    <main
      className="flex flex-col items-center justify-between p-24"
    >
      <Bar
        onNewCalculation={handleNewCalculation}
        onClearHistory={handleClearHistory}
        isButtonDisabled={buttonDisabled}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Feed calculations={calculations} />
    </main>
  );
}

export default Home;
