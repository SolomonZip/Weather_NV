import React, { useState, useEffect } from 'react';
import '/Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Москва');

  const popularCities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 
    'Екатеринбург', 'Казань', 'Нижний Новгород',
    'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'
  ];

  const getWeatherIcon = (condition) => {
    const icons = {
      'Ясно': '☀️',
      'Облачно': '⛅',
      'Пасмурно': '☁️',
      'Дождь': '🌧️',
      'Снег': '❄️',
      'Гроза': '⛈️',
      'Туман': '🌫️'
    };
    return icons[condition] || '🌈';
  };

  const getBackgroundClass = (condition) => {
    const backgrounds = {
      'Ясно': 'weather-sunny',
      'Облачно': 'weather-cloudy',
      'Пасмурно': 'weather-overcast',
      'Дождь': 'weather-rainy',
      'Снег': 'weather-snowy',
      'Гроза': 'weather-storm',
      'Туман': 'weather-fog'
    };
    return backgrounds[condition] || 'weather-default';
  };

  const fetchWeather = async (cityName = city) => {
    try {
      setLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const weatherConditions = ['Ясно', 'Облачно', 'Пасмурно', 'Дождь', 'Снег', 'Гроза'];
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      
      const baseTemp = {
        'Москва': 15, 'Санкт-Петербург': 13, 'Новосибирск': 10,
        'Екатеринбург': 12, 'Казань': 14, 'Нижний Новгород': 13,
        'Челябинск': 11, 'Самара': 16, 'Омск': 9, 'Ростов-на-Дону': 18
      };
      
      const mockWeather = {
        city: cityName,
        temperature: (baseTemp[cityName] || 15) + Math.floor(Math.random() * 10) - 5,
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 50) + 30,
        windSpeed: (Math.random() * 10).toFixed(1),
        feelsLike: (baseTemp[cityName] || 15) + Math.floor(Math.random() * 8) - 4,
        pressure: Math.floor(Math.random() * 50) + 730,
        icon: getWeatherIcon(randomCondition)
      };
      
      setWeather(mockWeather);
    } catch (err) {
      setError('Ошибка при получении данных о погоде');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleCityChange = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity);
  };

  const handleRefresh = () => {
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="weather-loader">
          <div className="loader-spinner"></div>
        </div>
        <p>Загружаем данные о погоде...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget error">
        <div className="error-icon">⚠️</div>
        <h3>Ошибка</h3>
        <p>{error}</p>
        <button onClick={handleRefresh} className="weather-btn retry-btn">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={`weather-widget ${getBackgroundClass(weather.condition)}`}>
      <div className="weather-header">
        <h2>🌤️ Погода сейчас</h2>
        <div className="city-selector">
          <select 
            value={city} 
            onChange={(e) => handleCityChange(e.target.value)}
            className="city-select"
            aria-label="Выберите город"
          >
            {popularCities.map(cityName => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="weather-main">
        <div className="weather-icon-large">
          {weather.icon}
        </div>
        <div className="weather-primary">
          <div className="temperature-main">
            {weather.temperature}°C
          </div>
          <div className="weather-condition">
            {weather.condition}
          </div>
          <div className="weather-location">
            📍 {weather.city}
          </div>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="weather-detail">
          <span className="detail-icon">🌡️</span>
          <div className="detail-info">
            <span className="detail-label">Ощущается</span>
            <span className="detail-value">{weather.feelsLike}°C</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <span className="detail-label">Влажность</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Ветер</span>
            <span className="detail-value">{weather.windSpeed} м/с</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">📊</span>
          <div className="detail-info">
            <span className="detail-label">Давление</span>
            <span className="detail-value">{weather.pressure} мм</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleRefresh}
        className="weather-btn refresh-btn"
        aria-label="Обновить данные о погоде"
      >
        <span className="btn-icon">🔄</span>
        Обновить
      </button>
    </div>
  );
};

export default Weather;
