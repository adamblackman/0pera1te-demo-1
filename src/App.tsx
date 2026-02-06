import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { BuildStrip } from './components/BuildStrip';
import { ConsolePeek, useConsoleLog } from './components/ConsolePeek';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isChaos } = useTheme();
  const { logs, addLog } = useConsoleLog();

  return (
    <div className={`relative min-h-screen ${isChaos ? 'chaos-mode' : ''}`}>
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <div className="container mx-auto px-4 py-12 space-y-8">
           <BuildStrip onLog={addLog} />
           <ConsolePeek logs={logs} />
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
