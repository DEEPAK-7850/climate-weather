import { DailyForecast } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/weatherIcons";

interface ForecastSectionProps {
  forecast: DailyForecast[];
}

export default function ForecastSection({ forecast }: ForecastSectionProps) {
  if (!forecast || forecast.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-4 opacity-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center h-28 flex flex-col justify-center items-center">
                <div className="animate-pulse bg-gray-200 h-5 w-12 mb-2 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-5 w-8 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get next 5 days of forecast
  const fiveDayForecast = forecast.slice(0, 5);

  // Day names
  const getDayName = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4 opacity-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {fiveDayForecast.map((day, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm font-medium text-gray-500 mb-1">
                {getDayName(day.dt)}
              </div>
              <div className="w-12 h-12 mx-auto mb-1">
                {getWeatherIcon(day.weather[0].main, "text-3xl text-secondary-500")}
              </div>
              <div className="text-lg font-semibold">
                {Math.round(day.temp.max)}°
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {day.weather[0].main}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
