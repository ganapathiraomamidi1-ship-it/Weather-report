import React from 'react';
import { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastDay[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <section className="p-6 bg-black/20 backdrop-blur-md rounded-3xl shadow-lg border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {data.slice(0, 5).map((day, index) => (
          <div key={index} className="flex flex-col items-center p-3 bg-white/10 rounded-2xl text-center">
            <p className="font-semibold text-lg">{day.day.substring(0, 3)}</p>
            <div className="w-16 h-16 my-2">
              <WeatherIcon condition={day.condition} />
            </div>
            <p className="text-lg font-bold">{Math.round(day.highTemp)}°</p>
            <p className="text-sm text-gray-300">{Math.round(day.lowTemp)}°</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
