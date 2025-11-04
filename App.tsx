import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from './types';
import { getWeatherForecast } from './services/geminiService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeatherForecast(location);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. The location might not be recognized or there was an API error.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback((lat: number, lon: number) => {
    fetchWeather(`${lat},${lon}`);
  }, [fetchWeather]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError('Geolocation is not enabled. Please enable it or use the search bar.');
        // Fallback to a default location if geolocation fails
        fetchWeather('Tokyo');
      }
    );
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWeatherByCoords]);

  const handleSearch = (city: string) => {
    if (city) {
      fetchWeather(city);
    }
  };

  const getBackgroundClass = (condition: string = 'clear') => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('storm') || lowerCondition.includes('drizzle')) {
      return 'from-slate-600 to-gray-800';
    }
    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast') || lowerCondition.includes('fog')) {
      return 'from-sky-400 to-gray-500';
    }
    if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
      return 'from-blue-200 to-slate-400';
    }
    // Default for sunny/clear
    return 'from-blue-400 to-orange-400';
  };

  const backgroundClass = weatherData ? getBackgroundClass(weatherData.currentWeather.condition) : 'from-gray-700 to-gray-900';

  return (
    <div className={`min-h-screen w-full font-sans text-white bg-gradient-to-br ${backgroundClass} transition-all duration-1000`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <header className="w-full max-w-2xl mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-shadow">Gemini Weather</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main className="w-full max-w-2xl">
          {loading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {weatherData && !loading && (
            <div className="space-y-8 animate-fade-in">
              <CurrentWeather data={weatherData.currentWeather} city={weatherData.city} country={weatherData.country} />
              <Forecast data={weatherData.forecast} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
