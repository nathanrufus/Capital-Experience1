// J5v8u2NLrNscblyp

// components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ temp, main, description, icon }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-lg p-6 shadow-lg max-w-xs text-center">
      <div className="weather-icon mb-4">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main} className="w-24 h-24" />
      </div>
      <div className="weather-info">
        <h2 className="text-4xl font-bold mb-2">{temp}°C</h2>
        <h3 className="text-2xl font-semibold mb-1">{main}</h3>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
