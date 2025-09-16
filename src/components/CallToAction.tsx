import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Zap } from 'lucide-react';
import { ChatModal } from "@/components/ChatModal";
import oceanWavesBg from '@/assets/ocean-waves-bg.jpg';

const CallToAction = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        {/* Background with animated waves */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat ocean-waves"
          style={{ backgroundImage: `url(${oceanWavesBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/90" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Main CTA Content */}
            <div className="space-y-6 animate-slide-in-up">
              <h2 className="text-4xl md:text-6xl font-bold glow-text">
                Make Ocean Data 
                <br />
                <span className="bg-gradient-aqua bg-clip-text text-transparent">
                  Accessible to Everyone
                </span>
                <span className="ml-4">🌍</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join researchers, students, and ocean enthusiasts worldwide in exploring 
                the mysteries of our oceans through AI-powered data analysis.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                className="cta-glow text-xl px-12 py-6 group"
                onClick={() => setIsChatOpen(true)}
              >
                🌊 Try FloatChat Now
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Social Proof / Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30">
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/30 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Global Access</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Access ocean data from anywhere in the world, anytime
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/30 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">For Everyone</h3>
                <p className="text-muted-foreground text-center text-sm">
                  From students to researchers, no technical background required
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-card/30 backdrop-blur-sm rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Instant Results</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Get answers and visualizations in seconds, not hours
                </p>
              </div>
            </div>

            {/* Final Message */}
            <div className="mt-16 p-8 bg-gradient-glow rounded-2xl border border-accent/20">
              <p className="text-lg text-center font-medium">
                "The future of ocean science is conversational. 
                <br />
                <span className="text-accent">Ask questions, get insights, make discoveries.</span>"
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default CallToAction;