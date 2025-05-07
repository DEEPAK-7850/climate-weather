import { WeatherData, Forecast } from "@/types";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastSection from "./ForecastSection";
import HourlyForecast from "./HourlyForecast";
import AITipBox from "../AI/AITipBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface WeatherDashboardProps {
  weatherData: WeatherData | undefined;
  forecastData: Forecast | undefined;
  isLoading: boolean;
  error: Error | null;
  location: string;
}

export default function WeatherDashboard({
  weatherData,
  forecastData,
  isLoading,
  error,
  location,
}: WeatherDashboardProps) {

  // Handle loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Skeleton className="h-72 w-full rounded-xl" />
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <div className="col-span-1">
          <Skeleton className="h-[500px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error loading weather data: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2">
        <CurrentWeatherCard weatherData={weatherData} location={location} />
        
        {/* Force the forecast sections to always render with opacity-100 */}
        <div className="opacity-100">
          <ForecastSection forecast={forecastData?.daily || []} />
        </div>
        <div className="opacity-100">
          <HourlyForecast hourly={forecastData?.hourly || []} />
        </div>
      </div>
      
      <div className="col-span-1">
        <AITipBox weatherData={weatherData} />
      </div>
    </div>
  );
}
