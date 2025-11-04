import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "The name of the city for the forecast." },
    country: { type: Type.STRING, description: "The country where the city is located." },
    currentWeather: {
      type: Type.OBJECT,
      properties: {
        temperature: { type: Type.NUMBER, description: "Current temperature in Celsius." },
        condition: { type: Type.STRING, description: "A brief text description of the weather condition (e.g., 'Sunny', 'Partly Cloudy')." },
        windSpeed: { type: Type.NUMBER, description: "Wind speed in kilometers per hour (km/h)." },
        humidity: { type: Type.NUMBER, description: "Humidity percentage (e.g., 65 for 65%)." },
      },
      required: ["temperature", "condition", "windSpeed", "humidity"],
    },
    forecast: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "The day of the week for the forecast (e.g., 'Tuesday')." },
          highTemp: { type: Type.NUMBER, description: "The forecasted high temperature in Celsius." },
          lowTemp: { type: Type.NUMBER, description: "The forecasted low temperature in Celsius." },
          condition: { type: Type.STRING, description: "A brief text description of the forecasted weather condition." },
        },
        required: ["day", "highTemp", "lowTemp", "condition"],
      },
    },
  },
  required: ["city", "country", "currentWeather", "forecast"],
};


export const getWeatherForecast = async (location: string): Promise<WeatherData> => {
  const prompt = `Generate a realistic weather forecast for ${location}. Include the current weather and a 5-day forecast. Provide details like temperature in Celsius, weather condition (e.g., Sunny, Partly Cloudy, Rain), wind speed in km/h, and humidity percentage.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    const jsonText = response.text.trim();
    const weatherData = JSON.parse(jsonText);

    // Validate and return
    if (weatherData && weatherData.city && weatherData.currentWeather && weatherData.forecast) {
      return weatherData as WeatherData;
    } else {
      throw new Error("Invalid data structure received from API");
    }

  } catch (error) {
    console.error("Error fetching weather data from Gemini API:", error);
    throw new Error("Could not retrieve weather forecast.");
  }
};
