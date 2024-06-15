import React, { useEffect, useState } from 'react';
import axios from 'axios';
import alanBtn from '@alan-ai/alan-sdk-web';
import { WiThermometer, WiCloud, WiHumidity, WiBarometer, WiStrongWind } from 'react-icons/wi';
import './styles.css';
import { Link } from 'react-router-dom';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f345577cc2f799878b461c92b791477e`
            );
            setWeatherData(response.data);
        } catch (error) {
            setError('Failed to fetch weather data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (weatherData && weatherData.main.temp > 20) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [weatherData]);

    useEffect(() => {
        alanBtn({
            key: 'cbce9aad0f3a43cc69919bfed6d4601a2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if (commandData.command === 'go:back') {
                    // Call the client code that will react to the received command
                }
            }
        });
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="weather-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">Get Weather</button>
            </form>
            {loading ? (
                <p>Loading weather data...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : weatherData ? (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p><WiThermometer /> Temperature: {weatherData.main.temp}°C</p>
                    <p><WiCloud /> Description: {weatherData.weather[0].description}</p>
                    <p><WiThermometer /> Feels like: {weatherData.main.feels_like}°C</p>
                    <p><WiHumidity /> Humidity: {weatherData.main.humidity}%</p>
                    <p><WiBarometer /> Pressure: {weatherData.main.pressure}</p>
                    <p><WiStrongWind /> Wind Speed: {weatherData.wind.speed}m/s</p>
                </div>
            ) : null}
            {showWarning && (
                <div className="warning-banner">
                    <p>Warning: Temperature above 10°C. Be cautious!</p>
                </div>
            )}
            <Link to="/health-info">Please fill out your health survey.</Link>
            
        </div>
    );
};

export default Weather;