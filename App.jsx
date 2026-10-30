// SettingsPage.js - COMPLETED LOGIC FOR ADARSH

import React, { useState, useEffect } from 'react';
// Assume Modal component is imported along with others
import { SettingsContainer, Section, ToggleSwitch, Button, Modal } from './UIComponents';

function App() {
  // Define state for the main toggle (Task 1.5)
  const [isSmarterModeEnabled, setIsSmarterModeEnabled] = useState(false);
  // State for showing the permission pop-up (Task 2)
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  // State for Google connection status (Task 3)
  const [googleStatus, setGoogleStatus] = useState('Not Connected'); 
  
  // Hardcoded URL from Kartikaya
  const KARTIKAYA_OAUTH_URL = "http://localhost:5002/api/v1/google/connect";

  // --- Dhruv's Integration Hook (Placeholder for logic to activate his service) ---
  const activateDhruvService = (enable) => {
    console.log(`[DHURV HOOK]: Telling Perception Service to set active=${enable}`);
    // **NOTE:** In the real system, this would be an API call or a file system write 
    // to signal Dhruv's background process to start reading the screen.
  };

  // --- Task 2: Permission Pop-up Logic ---
  const handleToggle = () => {
    if (!isSmarterModeEnabled) {
      // If the user is turning it ON, show the modal first (Trust Step)
      setShowPermissionModal(true);
    } else {
      // If the user is turning it OFF, disable immediately
      setIsSmarterModeEnabled(false);
      activateDhruvService(false); // Deactivate Dhruv's service
    }
  };

  const handleModalAccept = () => {
    // 1. Close the modal
    setShowPermissionModal(false);
    // 2. Enable Smarter Mode
    setIsSmarterModeEnabled(true);
    // 3. Activate Dhruv's service (CRITICAL SECURITY HOOK)
    activateDhruvService(true); 
  };

  const handleModalDecline = () => {
    // 1. Close the modal, keep Smarter Mode OFF
    setShowPermissionModal(false);
    setIsSmarterModeEnabled(false);
  };
  
  // --- Task 3: Connection Logic ---

  // Function to initiate OAuth flow
  const initiateGoogleConnect = () => {
    console.log('Redirecting to Kartikaya for OAuth...');
    window.location.href = KARTIKAYA_OAUTH_URL; 
  };
  
  // Placeholder function for Task 3.3 (Fetching status from Kartikaya)
  const checkConnectionStatus = async () => {
    // **NOTE:** This would use Kartikaya's GET /api/v1/user/connections
    // For now, simulate a check.
    setGoogleStatus('Checking...');
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // If connected:
    // setGoogleStatus('Connected to Calendar & Gmail');
    // If not:
    setGoogleStatus('Not Connected'); 
  };

  // Placeholder function for Task 3.4 (Disconnecting)
  const handleDisconnect = async () => {
    console.log('Calling Kartikaya POST /api/v1/user/disconnect/google');
    // **NOTE:** In the real system, this would call Kartikaya's Disconnect API.
    setGoogleStatus('Disconnecting...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setGoogleStatus('Not Connected');
  };
  
  useEffect(() => {
    // Check status when the component loads (Task 3.3)
    checkConnectionStatus(); 
  }, []);


  // --- Task 4: UI Design for Feedback States (Not executed here, but designed) ---
  const AssistantFeedback = () => {
    // Placeholder for the element where Anurag's progress messages will display.
    // E.g., This would show "Thinking...", "Checking your calendar..."
    return (
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', textAlign: 'center' }}>
        Assistant Status: Ready. 
        {/* Replace 'Ready' with dynamic status from Anurag via a state hook */}
      </div>
    );
  };


  // --- JSX Render ---
  return (
    <SettingsContainer>
      
      {/* ------------------------------------- */}
      {/* ➡️ Smarter Mode Section */}
      {/* ------------------------------------- */}
      <Section title="Smarter Mode">
        
        {/* Task 4: Feedback Placeholder */}
        <AssistantFeedback />

        {/* Main Toggle (Task 1.4) */}
        <ToggleSwitch 
          label="Enable Smarter Mode"
          description="Gives the AI permission to check your screen content (Dhruv) and use external tools (Kartikaya)."
          checked={isSmarterModeEnabled}
          onChange={handleToggle}
        />
        
        <hr style={{ margin: '20px 0' }} />

        {/* ------------------------------------- */}
        {/* 🔑 External Account Connection (Task 3) */}
        {/* ------------------------------------- */}
        <h3>External Account Connections</h3>
        
        <p>Integrate services like Google to use email and calendar functions.</p>
        
        {/* Conditional Rendering based on Google Status (Task 3.3 & 3.4) */}
        {googleStatus === 'Not Connected' || googleStatus.includes('ing') ? (
          // Connect Button (Visible when NOT connected)
          <Button 
            variant="primary" 
            onClick={initiateGoogleConnect}
            disabled={googleStatus.includes('ing')}
          >
            {googleStatus === 'Checking...' ? 'Checking Status...' : 'Connect Google Account'}
          </Button>
        ) : (
          // Disconnect Button and Status (Visible when CONNECTED)
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              **Status:** {googleStatus} ✅
            </span>
            <Button variant="danger" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        )}
      
      </Section>

      {/* ------------------------------------- */}
      {/* 🛑 Task 2: Permission Modal (The Trust Gateway) */}
      {/* ------------------------------------- */}
      <Modal 
        isOpen={showPermissionModal} 
        title="Enable AI Screen Context Access"
      >
        <p>
          This is a critical trust step. Enabling Smarter Mode allows the AI to **read the text content** of your active window (like webpages, documents, and chat apps) to provide relevant assistance.
        </p>
        <p>
          This data is processed locally. Do you grant this permission, which also activates the feature?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="secondary" onClick={handleModalDecline}>
            No, Keep Off
          </Button>
          <Button variant="primary" onClick={handleModalAccept} style={{ marginLeft: '10px' }}>
            Yes, Enable
          </Button>
        </div>
      </Modal>
      
    </SettingsContainer>
  );
}

export default App;
