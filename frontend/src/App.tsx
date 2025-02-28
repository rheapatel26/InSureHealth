import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import ViewClaims from './components/ViewClaims';
import SignUp from './components/SignUp';

import TermsAndConditionsPopup from './components/TermsAndConditionsPopup';

import ClaimVerify from './components/ClaimVerify';


function App() {
  // State to control the visibility of the T&Cs popup
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the T&Cs
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowTermsPopup(true); // Show the popup if not accepted
    }
  }, []);

  // Function to handle T&Cs acceptance
  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true'); // Store acceptance in localStorage
    setShowTermsPopup(false); // Hide the popup
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Render the T&Cs popup if showTermsPopup is true */}
        {showTermsPopup && <TermsAndConditionsPopup onAccept={handleAcceptTerms} />}

        <Routes>

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            }
          />

          <Route path="/" element={
            <>
              <Navbar />
              <LandingPage />
            </>
          } />
          <Route path="/verify" element={<>
              <Navbar />
              <ClaimVerify />
            </>} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/claims/:type" element={<ViewClaims />} />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <SignUp />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;