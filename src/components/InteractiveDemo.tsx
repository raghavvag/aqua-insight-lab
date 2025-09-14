import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';

const InteractiveDemo = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      content: 'Show me salinity near the equator in March 2023',
      timestamp: '2:34 PM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Simulate AI response after a delay
    const timer = setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          type: 'ai',
          content: "I've found salinity data for the equatorial region in March 2023. Here's what the data shows:",
          timestamp: '2:35 PM'
        }]);
        
        // Show chart after message
        setTimeout(() => {
          setShowChart(true);
        }, 500);
      }, 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            See It In <span className="bg-gradient-aqua bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how FloatChat transforms your questions into beautiful visualizations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <div className="chat-window">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-aqua rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">FloatChat AI</div>
                  <div className="text-xs text-muted-foreground">Ocean Data Assistant</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[300px]">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gradient-aqua text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-md p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs opacity-60 mt-1">{message.timestamp}</div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-aqua rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Chart */}
            {showChart && (
              <div className="demo-chart p-6 border-t border-border/50 animate-slide-in-up">
                <div className="bg-gradient-glow p-6 rounded-xl">
                  <h4 className="font-semibold mb-4 text-center">Equatorial Salinity - March 2023</h4>
                  
                  {/* Mock Chart */}
                  <div className="relative h-48 bg-background/50 rounded-lg p-4">
                    <div className="absolute inset-4">
                      {/* Chart bars */}
                      <div className="flex items-end justify-between h-full space-x-2">
                        {[65, 85, 92, 78, 88, 95, 82, 90].map((height, i) => (
                          <div
                            key={i}
                            className="bg-gradient-aqua rounded-t flex-1 animate-slide-in-up"
                            style={{ 
                              height: `${height}%`,
                              animationDelay: `${i * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Chart labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-2">
                        <span>0°W</span>
                        <span>45°W</span>
                        <span>90°W</span>
                        <span>135°W</span>
                        <span>180°</span>
                        <span>135°E</span>
                        <span>90°E</span>
                        <span>45°E</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-center text-muted-foreground">
                    Interactive salinity readings across the equatorial Pacific
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Try asking: 'What's the temperature in the Atlantic?'"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled
                />
                <Button size="sm" className="rounded-full" disabled>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-2">
                This is a demo preview - Try the full version to chat with real data!
              </div>
            </div>
          </div>

          {/* CTA Below Demo */}
          <div className="text-center mt-8">
            <Button className="cta-glow">
              🌊 Try the Real FloatChat Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;