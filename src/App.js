import React from 'react';
import { useState } from "react";

import SearchBar from './components/searchBar/searchBar';
import Weather from './components/weather/weather';

import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearch = (selected) => {
    setCurrentWeather(selected)
  };

  return (
    <div className='App'>
      <p>
        Go ahead, check the weather!
      </p>
      <SearchBar onSearch={handleOnSearch}></SearchBar>
      {currentWeather && <Weather data={currentWeather} />}
    </div>
  );
}

export default App;
