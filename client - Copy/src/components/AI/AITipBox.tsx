import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Bot, Lightbulb, Info } from "lucide-react";
import { WeatherData } from "@/types";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

interface AITipBoxProps {
  weatherData: WeatherData | undefined;
}

export default function AITipBox({ weatherData }: AITipBoxProps) {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  
  // Add default tips when weather data becomes available
  useEffect(() => {
    if (weatherData && !aiResponse) {
      setAiResponse(`
        <strong>Default Climate Tips:</strong>
        <ul>
          <li>Reduce your carbon footprint by using public transportation or carpooling when possible.</li>
          <li>Conserve energy by using energy-efficient appliances and turning off lights when not in use.</li>
          <li>Consider using renewable energy sources like solar panels to power your home.</li>
        </ul>
        <p>Click "Generate Tips for Current Weather" for personalized suggestions based on current conditions.</p>
      `);
    }
  }, [weatherData, aiResponse]);

  const { mutate: generateTip, isPending } = useMutation({
    mutationFn: async ({ prompt }: { prompt: string }) => {
      const res = await apiRequest("POST", "/api/generate-tip", { prompt });
      return res.json();
    },
    onSuccess: (data) => {
      setAiResponse(data.tip);
    },
    onError: (error) => {
      console.error("Error generating tip:", error);
      setAiResponse("Failed to generate tips. Please try again.");
    },
  });

  // Generate tips based on current weather
  const autoGenerateTip = () => {
    if (!weatherData) return;

    const weatherCondition = weatherData.weather[0]?.main || "Clear";
    const temperature = Math.round(weatherData.main.temp);
    const location = weatherData.name;

    // Create a prompt based on weather data
    const prompt = `Suggest 3 practical climate-friendly tips for someone experiencing ${weatherCondition} weather at ${temperature}°F in ${location}. Focus on energy saving and reducing environmental impact. Format with bold headers.`;
    
    generateTip({ prompt });
  };

  // Handle custom prompt from user
  const handleCustomPrompt = () => {
    if (!userPrompt.trim()) return;
    generateTip({ prompt: userPrompt });
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="bg-primary-500 text-white p-4 rounded-t-xl">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold">AI Climate Assistant</h3>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="bg-primary-50 rounded-lg p-4 mb-4 border border-primary-200">
          <h4 className="font-medium text-primary-800 mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
            Get personalized tips based on weather
          </h4>
          <Button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white"
            onClick={autoGenerateTip}
            disabled={isPending || !weatherData}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Tips for Current Weather"
            )}
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="mb-2 font-medium text-gray-700">Or ask a custom climate question:</div>
          <Textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="E.g., How can I reduce energy usage during hot weather?"
            rows={3}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <Button 
            className="mt-2 bg-secondary-500 hover:bg-secondary-600 text-white w-full"
            onClick={handleCustomPrompt}
            disabled={isPending || !userPrompt.trim()}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Ask Question"
            )}
          </Button>
        </div>
        
        {/* AI response area */}
        <div className="border-t border-gray-200 pt-4 mt-auto">
          <h4 className="font-medium text-gray-700 mb-2">Climate Tips:</h4>
          
          {/* Loading state */}
          {isPending && (
            <div className="flex justify-center items-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          )}
          
          {/* Response state */}
          {!isPending && aiResponse && (
            <div className="p-3 bg-gray-50 rounded-lg whitespace-pre-line">
              <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: aiResponse }} />
            </div>
          )}
          
          {/* Empty state */}
          {!isPending && !aiResponse && (
            <div className="text-center text-gray-500 py-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-300 mb-2"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M7 8h.01" />
                <path d="M12 8h.01" />
                <path d="M17 8h.01" />
              </svg>
              <p>Get personalized climate tips based on current weather conditions or ask a custom question</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
