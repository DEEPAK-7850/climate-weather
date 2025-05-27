import React, { createContext, useContext, useState, useEffect } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit';

interface Settings {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
}

const SettingsContext = createContext<Settings | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    // Try to get saved preference from localStorage
    const saved = localStorage.getItem('temperatureUnit');
    return (saved as TemperatureUnit) || 'fahrenheit';
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('temperatureUnit', temperatureUnit);
  }, [temperatureUnit]);

  const value = {
    temperatureUnit,
    setTemperatureUnit,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Temperature conversion utilities
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

// Format temperature based on unit
export function formatTemperature(temp: number, unit: TemperatureUnit): string {
  if (unit === 'celsius') {
    return `${Math.round(fahrenheitToCelsius(temp))}°C`;
  }
  return `${Math.round(temp)}°F`;
} 