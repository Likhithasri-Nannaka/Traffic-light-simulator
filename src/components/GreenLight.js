// src/components/GreenLight.js
import React from 'react';

const GreenLight = ({ active }) => {
  return <div className={`light green ${active ? 'active' : ''}`}></div>;
};

export default GreenLight;
