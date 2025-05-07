import React from "react";
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  CloudFog, 
  Sun, 
  CloudSun, 
  Wind 
} from "lucide-react";

export function getWeatherIcon(condition: string, className: string = "") {
  switch (condition.toLowerCase()) {
    case "clouds":
    case "cloudy":
      return <Cloud className={className} />;
    case "rain":
    case "rainy":
      return <CloudRain className={className} />;
    case "snow":
    case "snowy":
      return <CloudSnow className={className} />;
    case "thunder":
    case "thunderstorm":
      return <CloudLightning className={className} />;
    case "drizzle":
      return <CloudDrizzle className={className} />;
    case "mist":
    case "fog":
    case "haze":
      return <CloudFog className={className} />;
    case "clear":
    case "sunny":
      return <Sun className={className} />;
    case "partly cloudy":
    case "partly-cloudy":
    case "partly sunny":
    case "partly-sunny":
      return <CloudSun className={className} />;
    case "windy":
      return <Wind className={className} />;
    default:
      return <Sun className={className} />;
  }
}
