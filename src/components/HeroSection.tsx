import { Button } from '@/components/ui/button';
import OceanGlobe from './OceanGlobe';
import FloatingBuoys from './FloatingBuoys';
import { MessageCircle, ArrowRight } from 'lucide-react';
import oceanWavesBg from '@/assets/ocean-waves-bg.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${oceanWavesBg})`,
          filter: 'blur(1px)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-deep opacity-80" />
      
      {/* Floating Buoys */}
      <FloatingBuoys />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8 lg:text-left text-center animate-slide-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold glow-text">
                Chat with the 
                <span className="bg-gradient-aqua bg-clip-text text-transparent"> Ocean's Data</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Ask questions like <em>"What's the salinity near the equator?"</em> and get instant graphs + maps from real ocean scientific data.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="cta-glow group">
                <MessageCircle className="w-5 h-5 mr-2" />
                🌊 Try FloatChat Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
                <span>Interactive Maps</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - 3D Globe */}
          <div className="flex justify-center lg:justify-end">
            <OceanGlobe />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;