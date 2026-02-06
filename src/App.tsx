import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ChaosMode } from './components/ChaosMode';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ChaosMode />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
