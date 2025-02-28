import React, { useState, useEffect } from 'react';

interface TermsAndConditionsPopupProps {
  onAccept: () => void;
}

const TermsAndConditionsPopup: React.FC<TermsAndConditionsPopupProps> = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [terms, setTerms] = useState<string>(''); // State to store T&Cs content
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch T&Cs from the backend when the component mounts
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/terms');
        if (!response.ok) {
          throw new Error('Failed to fetch Terms and Conditions');
        }
        const data = await response.json();
        setTerms(data.terms); // Set the fetched T&Cs content
      } catch (error) {
        setError('An error occurred while fetching the Terms and Conditions.');
        console.error(error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchTerms();
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAccept = () => {
    if (isChecked) {
      localStorage.setItem('termsAccepted', 'true'); // Store acceptance in localStorage
      onAccept(); // Close the popup
    } else {
      alert('You must accept the Terms and Conditions to proceed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
        <div className="overflow-y-auto max-h-60 mb-4">
          {isLoading ? (
            <p>Loading Terms and Conditions...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="whitespace-pre-line">{terms}</p>
          )}
        </div>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>I accept the Terms and Conditions</span>
        </label>
        <button
          onClick={handleAccept}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Accept and Continue
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditionsPopup;