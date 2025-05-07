import LocationSearch from "./LocationSearch";

interface HeaderProps {
  location: string;
  setLocation: (location: string) => void;
  getCurrentLocation: () => void;
}

export default function Header({ location, setLocation, getCurrentLocation }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <svg
            className="h-8 w-8 text-primary-500 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3v12" />
            <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M15 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            <path d="M6 15h9" />
            <path d="M18 9c0 1.5 1.5 3 3 3" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">ClimateWeather</h1>
        </div>
        
        <LocationSearch 
          location={location}
          setLocation={setLocation}
          getCurrentLocation={getCurrentLocation}
        />
      </div>
    </header>
  );
}
