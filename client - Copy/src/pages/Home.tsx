import Header from "@/components/Header";
import WeatherDashboard from "@/components/Weather/WeatherDashboard";
import ClimateInfo from "@/components/ClimateInfo";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { WeatherData, Forecast } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  // Get user's location on initial load
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Get user's geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to a default location (San Francisco)
          setCoordinates({ lat: 37.7749, lon: -122.4194 });
          setLocation("San Francisco");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      // Fallback to a default location
      setCoordinates({ lat: 37.7749, lon: -122.4194 });
      setLocation("San Francisco");
    }
  };

  // Search for a location
  const searchLocation = (query: string) => {
    setLocation(query);
  };

  // Fetch current weather based on coordinates
  const { 
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError 
  } = useQuery<WeatherData>({
    queryKey: coordinates ? [`/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`] : [],
    enabled: !!coordinates
  });

  // Fetch forecast data based on coordinates
  const { 
    data: forecastData,
    isLoading: isForecastLoading,
    error: forecastError 
  } = useQuery<Forecast>({
    queryKey: coordinates ? [`/api/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`] : [],
    enabled: !!coordinates
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header
          location={location}
          setLocation={searchLocation}
          getCurrentLocation={getCurrentLocation}
        />
        <main>
          <WeatherDashboard 
            weatherData={weatherData}
            forecastData={forecastData}
            isLoading={isWeatherLoading || isForecastLoading}
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
