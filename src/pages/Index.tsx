import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';
import InteractiveDemo from '@/components/InteractiveDemo';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <InteractiveDemo />
      <CallToAction />
    </main>
  );
};

export default Index;
