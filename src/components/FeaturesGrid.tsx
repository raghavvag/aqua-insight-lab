import { Bot, Map, TrendingUp, Globe, Search, Zap } from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot for Ocean Data",
      description: "Ask natural language questions about ocean conditions and get intelligent responses from our AI assistant.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Temperature & Salinity Profiles",
      description: "Access live data from thousands of Argo floats measuring ocean temperature and salinity worldwide.",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: Map,
      title: "Interactive Maps & Charts",
      description: "Visualize ocean data through beautiful, interactive maps and charts that update in real-time.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Globe,
      title: "Global Ocean Coverage",
      description: "Explore data from every ocean basin with comprehensive coverage from the Arctic to Antarctic.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Search,
      title: "Compare Regions",
      description: "Easily compare ocean conditions between different regions like the Arabian Sea vs Bay of Bengal.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get immediate insights and analysis of ocean patterns, trends, and anomalies with AI-powered processing.",
      gradient: "from-pink-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Powerful <span className="bg-gradient-aqua bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to explore, analyze, and understand ocean data through AI-powered conversations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 mb-4 p-3 rounded-lg bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover effect indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-accent mb-2">10,000+</div>
            <div className="text-muted-foreground">Active Argo Floats</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Real-time Monitoring</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-secondary mb-2">Global</div>
            <div className="text-muted-foreground">Ocean Coverage</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;