import axios from 'axios';
import { WeatherData, ForecastData } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const response = await api.get(`/weather?lat=${lat}&lon=${lon}`);
  return response.data;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const response = await api.get(`/weather?q=${encodeURIComponent(city)}`);
  return response.data;
}

export async function fetchForecastData(lat: number, lon: number): Promise<ForecastData> {
  const response = await api.get(`/forecast?lat=${lat}&lon=${lon}`);
  return response.data;
}

// Date formatting utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Convert temperature from Kelvin to Fahrenheit
export function kelvinToFahrenheit(kelvin: number): number {
  return Math.round(((kelvin - 273.15) * 9/5) + 32);
}

// Convert temperature from Kelvin to Celsius
export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

// Get weather icon URL from OpenWeatherMap
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred while fetching data');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
      throw new Error('An error occurred while making the request');
    }
  }
);
