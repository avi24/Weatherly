import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState(''); // Store the user input
  const [weather, setWeather] = useState(null); // Store weather data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '9590c38178cc46dce2f98cb5e0a350e0';

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError('City not found');
      }
    } catch (error) {
      setError('An error occurred while fetching the data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="App">
      <h1>Weatherly</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;