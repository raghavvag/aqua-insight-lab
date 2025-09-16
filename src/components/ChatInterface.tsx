import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, BarChart3, Map, Table } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  hasVisualization?: boolean;
}

interface ChatInterfaceProps {
  onQueryResponse: (response: any) => void;
}

const exampleQueries = [
  "Show floats near the equator in 2018",
  "Plot temperature vs depth for float 2903123",
  "What's the salinity around Australia?",
  "Compare temperature profiles in the Pacific",
];

export const ChatInterface = ({ onQueryResponse }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm FloatChat AI. Ask me anything about ocean data from ARGO floats. Try asking about temperature, salinity, or specific float locations!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAPIResponse = (query: string) => {
    // Simulate different types of responses based on query content
    if (query.toLowerCase().includes('temperature') || query.toLowerCase().includes('temp')) {
      return {
        answerText: `Here's the temperature data for your query. I found ${Math.floor(Math.random() * 50) + 10} matching records.`,
        chartData: {
          type: 'temperature-depth',
          values: Array.from({length: 20}, (_, i) => ({
            depth: i * 50,
            temperature: 25 - (i * 0.8) + Math.random() * 2
          }))
        },
        hasVisualization: true
      };
    } else if (query.toLowerCase().includes('salinity')) {
      return {
        answerText: `Found salinity data across ${Math.floor(Math.random() * 100) + 20} float measurements.`,
        chartData: {
          type: 'salinity-depth',
          values: Array.from({length: 20}, (_, i) => ({
            depth: i * 50,
            salinity: 35 + Math.random() * 2 - 1
          }))
        },
        hasVisualization: true
      };
    } else if (query.toLowerCase().includes('float') && /\d+/.test(query)) {
      return {
        answerText: `Here's the profile data for the requested float. This float has been active for ${Math.floor(Math.random() * 300) + 100} days.`,
        chartData: {
          type: 'time-series',
          values: Array.from({length: 30}, (_, i) => ({
            date: new Date(2023, 0, i + 1),
            temperature: 20 + Math.sin(i * 0.2) * 5 + Math.random() * 2
          }))
        },
        mapData: [{
          id: query.match(/\d+/)?.[0],
          lat: -10 + Math.random() * 20,
          lng: 100 + Math.random() * 60,
          name: `Float ${query.match(/\d+/)?.[0]}`
        }],
        hasVisualization: true
      };
    } else {
      return {
        answerText: `I found relevant ocean data for your query. The dataset includes measurements from multiple ARGO floats across different time periods.`,
        tableData: Array.from({length: 10}, (_, i) => ({
          floatId: `29031${20 + i}`,
          lat: (-30 + Math.random() * 60).toFixed(2),
          lng: (50 + Math.random() * 100).toFixed(2),
          temperature: (15 + Math.random() * 15).toFixed(1),
          salinity: (34 + Math.random() * 2).toFixed(2),
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
        })),
        hasVisualization: true
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const response = simulateAPIResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.answerText,
        timestamp: new Date(),
        hasVisualization: response.hasVisualization,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Send data to parent component for visualization
      onQueryResponse(response);
    }, 1500);
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  const handleVisualize = (messageId: string, type: 'chart' | 'map' | 'table') => {
    // This would trigger specific visualization in the parent
    console.log(`Visualizing ${type} for message ${messageId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white mb-2">FloatChat AI</h2>
        <p className="text-sm text-white/70">Ask about ocean data, floats, or specific measurements</p>
      </div>

      {/* Example Queries */}
      <div className="p-4 border-b border-white/10">
        <p className="text-sm text-white/70 mb-2">Try these examples:</p>
        <div className="grid grid-cols-1 gap-2">
          {exampleQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs text-white/80 border-white/20 hover:bg-white/10 justify-start"
              onClick={() => handleExampleClick(query)}
            >
              {query}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex gap-3",
            message.type === 'user' ? "justify-end" : "justify-start"
          )}>
            {message.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.type === 'user'
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-white/10 text-white"
            )}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
              
              {message.hasVisualization && message.type === 'bot' && (
                <div className="flex gap-2 mt-3 pt-2 border-t border-white/20">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs"
                    onClick={() => handleVisualize(message.id, 'chart')}
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Chart
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs"
                    onClick={() => handleVisualize(message.id, 'map')}
                  >
                    <Map className="h-3 w-3 mr-1" />
                    Map
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs"
                    onClick={() => handleVisualize(message.id, 'table')}
                  >
                    <Table className="h-3 w-3 mr-1" />
                    Table
                  </Button>
                </div>
              )}
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-secondary" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-white/10 text-white rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ocean data, floats, temperature, salinity..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};