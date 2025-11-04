import React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  city: string;
  country: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, city, country }) => {
  return (
    <section className="p-6 sm:p-8 bg-black/20 backdrop-blur-md rounded-3xl shadow-lg border border-white/10 text-center">
      <h2 className="text-3xl sm:text-4xl font-semibold">{city}, {country}</h2>
      <p className="text-lg text-gray-200 capitalize">{data.condition}</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center my-6 gap-4 sm:gap-8">
        <div className="w-32 h-32 sm:w-40 sm:h-40">
          <WeatherIcon condition={data.condition} />
        </div>
        <div className="text-7xl sm:text-8xl font-bold tracking-tighter">
          {Math.round(data.temperature)}°C
        </div>
      </div>

      <div className="flex justify-around items-center text-sm sm:text-base mt-6 pt-6 border-t border-white/20">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{data.humidity}%</span>
          <span className="text-gray-300">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">{Math.round(data.windSpeed)} km/h</span>
          <span className="text-gray-300">Wind</span>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
