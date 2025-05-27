import Header from "@/components/Header";
import WeatherDashboard from "@/components/Weather/WeatherDashboard";
import ClimateInfo from "@/components/ClimateInfo";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { WeatherData, Forecast } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, fetchForecastData, fetchWeatherByCity } from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  // Fetch weather data
  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ['weather', coordinates?.lat, coordinates?.lon, location],
    queryFn: async () => {
      if (coordinates) {
        return fetchWeatherData(coordinates.lat, coordinates.lon);
      } else if (location) {
        return fetchWeatherByCity(location);
      }
      return null;
    },
    enabled: !!(coordinates || location),
  });

  // Fetch forecast data
  const {
    data: forecastData,
    isLoading: forecastLoading,
    error: forecastError,
  } = useQuery({
    queryKey: ['forecast', coordinates?.lat, coordinates?.lon],
    queryFn: () => {
      if (coordinates) {
        return fetchForecastData(coordinates.lat, coordinates.lon);
      }
      return null;
    },
    enabled: !!coordinates,
  });

  // Get current location
  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocation(''); // Clear location search when using coordinates
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Try to get location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Handle location search
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setCoordinates(null); // Clear coordinates when searching by location
  };

  // Show error if both queries failed
  if (weatherError || forecastError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header
          location={location}
          setLocation={handleLocationChange}
          getCurrentLocation={getCurrentLocation}
        />
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {weatherError instanceof Error
              ? weatherError.message
              : 'Error loading weather data. Please try again.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header
          location={location}
          setLocation={handleLocationChange}
          getCurrentLocation={getCurrentLocation}
        />
        <main>
          <WeatherDashboard 
            weatherData={weatherData}
            forecastData={forecastData}
            isLoading={weatherLoading || forecastLoading}
            error={weatherError || forecastError}
            location={location}
          />
          <ClimateInfo location={weatherData?.name || location} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
