export interface CurrentWeather {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

export interface ForecastDay {
  day: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
}

export interface WeatherData {
  city: string;
  country: string;
  currentWeather: CurrentWeather;
  forecast: ForecastDay[];
}
