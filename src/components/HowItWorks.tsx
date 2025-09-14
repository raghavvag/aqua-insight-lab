import { useEffect, useRef } from 'react';
import { Waves, Database, Brain, BarChart3, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use CSS animations instead of anime.js
            const stepCards = document.querySelectorAll('.step-card');
            const stepArrows = document.querySelectorAll('.step-arrow');
            
            stepCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-slide-in-up');
                card.classList.remove('opacity-0');
              }, index * 200);
            });
            
            stepArrows.forEach((arrow, index) => {
              setTimeout(() => {
                arrow.classList.add('opacity-100');
                arrow.classList.remove('opacity-0');
              }, (index + 1) * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Waves,
      title: "Argo Floats",
      description: "Thousands of autonomous buoys collect ocean temperature, salinity, and pressure data worldwide",
      color: "text-blue-400"
    },
    {
      icon: Database,
      title: "Data Storage",
      description: "Scientific data is continuously collected and stored in global oceanographic databases",
      color: "text-cyan-400"
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Advanced AI processes your natural language questions and queries the relevant datasets",
      color: "text-accent"
    },
    {
      icon: BarChart3,
      title: "Visual Insights",
      description: "Get instant interactive maps, charts, and graphs showing exactly what you asked for",
      color: "text-primary-glow"
    }
  ];

  return (
    <section className="py-20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            How It <span className="bg-gradient-aqua bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From ocean data collection to AI-powered insights in four simple steps
          </p>
        </div>

        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Step Card */}
              <div className="step-card feature-card text-center group opacity-0">
                <div className={`step-icon w-16 h-16 mx-auto mb-4 p-4 rounded-full bg-gradient-glow ${step.color} transition-all duration-300 group-hover:scale-110`}>
                  <step.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow (except for last step) */}
              {index < steps.length - 1 && (
                <div className="step-arrow hidden md:block absolute transform translate-x-20 opacity-0">
                  <ArrowRight className="w-8 h-8 text-accent/60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Data Flow Animation */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 p-4 bg-card/50 rounded-full border border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Ocean Data</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="text-sm font-medium">Processing</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
              <span className="text-sm font-medium">Your Insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;