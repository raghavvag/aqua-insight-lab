import { Button } from '@/components/ui/button';
import Ocean3DScene from './Ocean3DScene';
import FloatingBuoys from './FloatingBuoys';
import { MessageCircle, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Ocean Background */}
      <div className="absolute inset-0">
        <Ocean3DScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
      
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
          
          {/* Right Side - Info Badge */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 max-w-sm">
              <h3 className="text-lg font-semibold text-accent mb-2">Live Ocean Data</h3>
              <p className="text-sm text-muted-foreground">
                Connected to over 4,000 Argo floats worldwide, providing real-time temperature and salinity measurements.
              </p>
            </div>
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