// src/App.js
import React from 'react';
import TrafficLight from './components/TrafficLight';
import EmergencyButton from './components/EmergencyButton';
import { TrafficLightProvider } from './context/TrafficLightContext';
import './App.css';

function App() {
  return (
    <TrafficLightProvider>
      <div className="App">
        {/* Traffic Light */}
        <TrafficLight />
        {/* Container for buttons */}
        <div className="button-container">
          <EmergencyButton />
        </div>
      </div>
    </TrafficLightProvider>
  );
}

export default App;
