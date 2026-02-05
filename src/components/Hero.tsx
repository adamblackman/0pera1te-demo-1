import { useRef, useEffect, useState } from 'react';
import { ParticleField } from './ParticleField';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setTaglineVisible(true), 600);
    const timer2 = setTimeout(() => setSubtitleVisible(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950" />

      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 170, 0.06), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 212, 170, 0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <ParticleField className="opacity-80" />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-glow-pulse animation-delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[150px] animate-float" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-8 opacity-0 animate-fade-in-down">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI Automation Agency
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 opacity-0 animate-fade-in animation-delay-200">
          <span className="text-gradient">0per</span>
          <span className="text-gradient-accent">A1</span>
          <span className="text-gradient">te</span>
        </h1>

        <div className="h-12 mb-8 overflow-hidden">
          <p
            className={`text-2xl sm:text-3xl md:text-4xl font-light text-ivory-200 tracking-wide transition-all duration-700 ${
              taglineVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Automate Anything.
          </p>
        </div>

        <div className="h-8 mb-12 overflow-hidden">
          <p
            className={`text-lg text-ivory-400 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              subtitleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            We build AI systems that eliminate repetitive work and scale operations.
          </p>
        </div>

        <div className="opacity-0 animate-fade-in-up animation-delay-600">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 btn-primary text-lg"
          >
            <span>Request Automation</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800">
          <div className="flex flex-col items-center gap-2 text-ivory-400">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-ivory-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
