import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { BuildStrip } from './components/BuildStrip';
import { ConsolePeek, useConsoleLog } from './components/ConsolePeek';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const { logs, addLog } = useConsoleLog();

  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <section className="py-12 relative z-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
            <BuildStrip onLog={addLog} />
            <ConsolePeek logs={logs} />
          </div>
        </section>
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
