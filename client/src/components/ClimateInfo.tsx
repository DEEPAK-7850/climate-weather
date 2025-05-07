import { Card, CardContent } from "@/components/ui/card";

interface ClimateInfoProps {
  location: string;
}

export default function ClimateInfo({ location }: ClimateInfoProps) {
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Environmental Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carbon Impact */}
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <svg
                  className="h-5 w-5 text-primary-600"
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
              </div>
              <h4 className="font-semibold text-primary-900">Carbon Footprint</h4>
            </div>
            
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm text-gray-600">Current impact (city average)</span>
              <span className="text-sm font-medium text-primary-700">Medium</span>
            </div>
            
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "58%" }}></div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>{location} has a carbon footprint of <span className="font-medium">8.2 tons</span> CO₂ per capita annually.</p>
              <p className="mt-2">Current activity in the city indicates <span className="font-medium">medium energy usage</span> today.</p>
            </div>
          </div>
          
          {/* Energy Usage */}
          <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                <svg
                  className="h-5 w-5 text-secondary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-secondary-900">Energy Sources</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Renewable</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Natural Gas</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "24%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Nuclear</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-500 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-gray-600">
              <p>{location}'s energy is primarily from renewable sources, helping reduce climate impact.</p>
            </div>
          </div>
          
          {/* Air Quality */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <svg
                  className="h-5 w-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900">Air Quality Details</h4>
            </div>
            
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100 mb-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Air Quality Index (AQI)</span>
                <div className="font-bold text-2xl text-green-600">32</div>
              </div>
              <div className="text-green-700 font-medium px-3 py-1 bg-green-100 rounded-full text-sm">
                Good
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">PM2.5</span>
                <span className="font-medium">7 μg/m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ozone</span>
                <span className="font-medium">18 ppb</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NO₂</span>
                <span className="font-medium">12 ppb</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
