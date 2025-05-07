import { WeatherData } from "@/types";
import { Card } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/weatherIcons";
import { formatDate, formatTime } from "@/lib/api";

interface CurrentWeatherCardProps {
  weatherData: WeatherData | undefined;
  location: string;
}

export default function CurrentWeatherCard({ weatherData, location }: CurrentWeatherCardProps) {
  if (!weatherData) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-6 shadow-lg opacity-100">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Loading weather data...</h2>
            </div>
            <p className="text-lg">Please wait while we fetch the latest weather information for {location || 'your location'}</p>
          </div>
        </div>
      </div>
    );
  }

  const weatherCondition = weatherData.weather[0]?.main || "";
  const weatherDescription = weatherData.weather[0]?.description || "";
  const temperature = Math.round(weatherData.main.temp);
  const tempUnit = "°F"; // This could be made configurable
  const tempHigh = Math.round(weatherData.main.temp_max);
  const tempLow = Math.round(weatherData.main.temp_min);
  
  const windSpeed = Math.round(weatherData.wind.speed);
  const humidity = weatherData.main.humidity;
  const visibility = Math.round(weatherData.visibility / 1609.34); // Convert meters to miles
  const pressure = weatherData.main.pressure;
  
  // Current date and time
  const now = new Date();
  const currentDate = formatDate(now);
  const currentTime = formatTime(now);

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-6 shadow-lg opacity-100">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">{weatherData.name || location}</h2>
            <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded">{weatherData.sys.country}</span>
          </div>
          
          <div className="flex items-center mb-2">
            {getWeatherIcon(weatherCondition, "w-16 h-16 rounded-full bg-white/30")}
            <div className="ml-4">
              <div className="text-5xl font-bold">{temperature}{tempUnit}</div>
              <div className="text-xl capitalize">{weatherCondition}</div>
            </div>
          </div>
          
          <div className="text-sm opacity-90 mb-4">
            {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)} with a high of {tempHigh}{tempUnit} and a low of {tempLow}{tempUnit}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                </svg>
                <span>Wind</span>
              </div>
              <div className="font-semibold">{windSpeed} mph</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>Humidity</span>
              </div>
              <div className="font-semibold">{humidity}%</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Visibility</span>
              </div>
              <div className="font-semibold">{visibility} mi</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                </svg>
                <span>Pressure</span>
              </div>
              <div className="font-semibold">{pressure} hPa</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 md:ml-6">
          <div className="flex flex-col">
            <div className="text-sm mb-1 opacity-80">
              <span>{currentDate}</span>
            </div>
            <div className="text-sm mb-1 opacity-80">
              <span>{currentTime}</span>
            </div>
          </div>
          
          <div className="mt-4 bg-white/20 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
              <span className="text-sm">Air Quality</span>
            </div>
            <div className="font-semibold">Good (32 AQI)</div>
            <div className="h-2 bg-white/30 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-primary-200 rounded-full" style={{ width: "32%" }}></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">
              <svg className="w-4 h-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3v12" />
                <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M15 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                <path d="M6 15h9" />
                <path d="M18 9c0 1.5 1.5 3 3 3" />
              </svg> Carbon Footprint
            </div>
            <div className="px-3 py-2 bg-amber-500 bg-opacity-30 rounded-lg text-sm">
              <svg className="w-4 h-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span>Average air conditioner use today could increase emissions by 20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
