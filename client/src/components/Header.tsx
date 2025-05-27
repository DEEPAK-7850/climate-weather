import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import debounce from "lodash/debounce";

interface HeaderProps {
  location: string;
  setLocation: (location: string) => void;
  getCurrentLocation: () => void;
}

export default function Header({ location, setLocation, getCurrentLocation }: HeaderProps) {
  const [searchValue, setSearchValue] = useState(location);

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setLocation(value);
    }, 500),
    [setLocation]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(searchValue);
  };

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Climate AI Helper
        </h1>
        
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search location..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-9 pr-4 w-full"
            />
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={getCurrentLocation}
            title="Use current location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
