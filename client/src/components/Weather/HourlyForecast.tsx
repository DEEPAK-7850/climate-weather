import { HourlyForecast as HourlyForecastType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/weatherIcons";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  if (!hourly || hourly.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-4 opacity-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-5 min-w-max">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center w-16">
                  <div className="animate-pulse bg-gray-200 h-5 w-10 rounded mb-2"></div>
                  <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full my-2"></div>
                  <div className="animate-pulse bg-gray-200 h-5 w-8 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get next 24 hours of forecast (limited to 8 for display)
  const hourlyForecast = hourly.slice(0, 8);

  // Format hour
  const getHourFormat = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4 opacity-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-5 min-w-max">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex flex-col items-center text-center w-16">
                <div className="text-sm font-medium text-gray-500">
                  {getHourFormat(hour.dt)}
                </div>
                <div className="my-2 text-secondary-500">
                  {getWeatherIcon(hour.weather[0].main, "text-2xl")}
                </div>
                <div className="text-base font-semibold">
                  {Math.round(hour.temp)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
