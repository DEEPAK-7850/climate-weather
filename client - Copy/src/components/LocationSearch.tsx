import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface LocationSearchProps {
  location: string;
  setLocation: (location: string) => void;
  getCurrentLocation: () => void;
}

export default function LocationSearch({ 
  location, 
  setLocation, 
  getCurrentLocation 
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState(location || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(searchQuery);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search location..."
          className="w-full md:w-72 pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={getCurrentLocation}
            className="h-8 w-8 p-0"
            title="Get current location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
          <Button 
            type="submit" 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
