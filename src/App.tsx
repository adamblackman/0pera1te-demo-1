import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
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
