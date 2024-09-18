import React, { createContext, useReducer, useEffect } from 'react';

const TrafficLightContext = createContext();

const initialState = {
  currentLight: 'green',          // Start with green light
  pedestrianRequest: false,       // No pedestrian request initially
  countdown: 10,                  // Start with 10 seconds for green light
  emergencyOverride: false,       // No emergency override initially
  isAdditionalRedTime: false,     // Flag to handle additional red time for pedestrian
};

// Reducer function to manage state changes
const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      return {
        ...state,
        currentLight: action.payload,
        countdown: action.timer,
      };
    case 'REQUEST_CROSSING':
      return {
        ...state,
        pedestrianRequest: true,
      };
    case 'RESET_TIMER':
      return {
        ...state,
        countdown: action.payload,
      };
    case 'START_ADDITIONAL_RED_TIME':
      return {
        ...state,
        isAdditionalRedTime: true,
        countdown: 5, // Set additional 5 seconds for red
      };
    case 'RESET_PEDESTRIAN_REQUEST':
      return {
        ...state,
        pedestrianRequest: false,
        isAdditionalRedTime: false,
      };
    case 'EMERGENCY_OVERRIDE':
      return {
        ...state,
        currentLight: 'green',  // Immediately switch to green
        countdown: 10,
        pedestrianRequest: false,  // Reset pedestrian request
        emergencyOverride: true,   // Set emergency override active
      };
    case 'FINISH_EMERGENCY':
      return {
        ...state,
        emergencyOverride: false,  // End emergency override
      };
    default:
      return state;
  }
};

// Context Provider
const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!state.emergencyOverride) {
        if (state.countdown > 0) {
          dispatch({ type: 'RESET_TIMER', payload: state.countdown - 1 });
        } else {
          // Handle pedestrian request and additional red time
          if (state.pedestrianRequest && state.currentLight !== 'red') {
            // Switch to red for 7 seconds initially
            dispatch({ type: 'CHANGE_LIGHT', payload: 'red', timer: 7 });
          } else if (state.pedestrianRequest && state.currentLight === 'red' && !state.isAdditionalRedTime) {
            // After 7 seconds of red, give additional 5 seconds
            dispatch({ type: 'START_ADDITIONAL_RED_TIME' });
          } else if (state.isAdditionalRedTime && state.countdown === 0) {
            // After the additional 5 seconds, reset pedestrian request and resume normal sequence
            dispatch({ type: 'RESET_PEDESTRIAN_REQUEST' });
            dispatch({ type: 'CHANGE_LIGHT', payload: 'green', timer: 10 });
          } else {
            // Normal light sequence
            switch (state.currentLight) {
              case 'green':
                dispatch({ type: 'CHANGE_LIGHT', payload: 'yellow', timer: 3 });
                break;
              case 'yellow':
                dispatch({ type: 'CHANGE_LIGHT', payload: 'red', timer: 7 });
                break;
              case 'red':
                dispatch({ type: 'CHANGE_LIGHT', payload: 'green', timer: 10 });
                break;
              default:
                break;
            }
          }
        }
      } else {
        // Finish the emergency override and return to normal light sequence
        dispatch({ type: 'FINISH_EMERGENCY' });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.countdown, state.currentLight, state.pedestrianRequest, state.emergencyOverride, state.isAdditionalRedTime, dispatch]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export { TrafficLightContext, TrafficLightProvider };
