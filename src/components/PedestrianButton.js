import React, { useContext } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';
import '../styles/pedestrianButton.css';

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const handleClick = () => {
    if (!state.pedestrianRequest) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button
      className={`pedestrian-button ${state.pedestrianRequest ? 'blinking' : ''}`}
      onClick={handleClick}
    >
      Request Pedestrian Crossing
    </button>
  );
};

export default PedestrianButton;
