import { HourlyForecast as HourlyForecastType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/weatherIcons";
import { useSettings, formatTemperature } from "@/contexts/SettingsContext";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  const { temperatureUnit } = useSettings();

  if (!hourly || hourly.length === 0) {
    return (
      <Card className="mt-6 bg-white shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-5 min-w-max">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center w-16">
                  <div className="animate-pulse bg-gray-200 h-5 w-12 mb-2 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full mb-2"></div>
                  <div className="animate-pulse bg-gray-200 h-5 w-8 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 bg-white shadow-lg">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-5 min-w-max">
            {hourly.slice(0, 24).map((hour, index) => (
              <div key={index} className="flex flex-col items-center text-center w-16">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })}
                </div>
                {getWeatherIcon(hour.weather[0].main, "w-12 h-12 mb-2")}
                <div className="text-sm font-semibold text-gray-900">
                  {formatTemperature(hour.temp, temperatureUnit)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
