// src/components/TrafficLight.js
import React, { useContext } from 'react';
import GreenLight from './GreenLight';
import YellowLight from './YellowLight';
import RedLight from './RedLight';
import PedestrianButton from './PedestrianButton';
import { TrafficLightContext } from '../context/TrafficLightContext';
const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);

  return (
    <div className="traffic-light-system">
      <div className="traffic-light">
        <RedLight active={state.currentLight === 'red'} />
        <YellowLight active={state.currentLight === 'yellow'} />
        <GreenLight active={state.currentLight === 'green'} />
      </div>
      <PedestrianButton />
      <p className="countdown">Time Remaining: {state.countdown} seconds</p>
    </div>
  );
};

export default TrafficLight;
