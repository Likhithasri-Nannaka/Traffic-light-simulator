import React, { useContext } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';

const EmergencyButton = () => {
  const { dispatch } = useContext(TrafficLightContext);

  const handleClick = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE' });
  };

  return (
    <button onClick={handleClick} className="emergency-button ">
      Emergency Override
    </button>
  );
};

export default EmergencyButton;
