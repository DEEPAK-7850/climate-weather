import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Thermometer } from 'lucide-react';

export default function TemperatureToggle() {
  const { temperatureUnit, setTemperatureUnit } = useSettings();

  const toggleUnit = () => {
    setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleUnit}
      className="flex items-center gap-2"
    >
      <Thermometer className="h-4 w-4" />
      <span>{temperatureUnit === 'celsius' ? '°C' : '°F'}</span>
    </Button>
  );
} 