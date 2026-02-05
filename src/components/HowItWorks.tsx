import { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { MessageSquare, Cpu, Rocket, ChevronRight, Check } from 'lucide-react';
import { BuilderStrip } from "./BuilderStrip";

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery',
    shortDesc: 'Map your workflows',
    description: 'We analyze your current processes, identify bottlenecks, and pinpoint the highest-impact automation opportunities.',
    details: [
      'Deep-dive into your existing workflows',
      'Identify repetitive, time-consuming tasks',
      'Calculate potential ROI for each automation',
    ],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Build',
    shortDesc: 'Architect AI systems',
    description: 'Our team designs and develops custom AI solutions tailored specifically to your operations and tech stack.',
    details: [
      'Custom AI model development',
      'Seamless integration with your tools',
      'Rigorous testing and validation',
    ],
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch',
    shortDesc: 'Go live with support',
    description: 'Deploy with confidence. We handle the rollout and provide ongoing optimization to ensure peak performance.',
    details: [
      'Phased deployment strategy',
      'Team training and documentation',
      'Continuous monitoring and improvements',
    ],
  },
];

export function HowItWorks() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInView) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current + 1) % steps.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isInView]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-obsidian-950" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/3 rounded-full blur-[200px] opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span
            className={`inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Process
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold text-gradient mb-6 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            How It Works
          </h2>
        </div>
        <BuilderStrip />

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className={`relative transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-1/3 space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = activeStep === index;
                const isHovered = hoveredStep === index;
                const isPast = index < activeStep;

                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepClick(index)}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${
                      isActive
                        ? 'bg-obsidian-800/60 border-accent/30'
                        : 'bg-obsidian-800/20 border-white/[0.04] hover:bg-obsidian-800/40 hover:border-white/[0.08]'
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-light transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <div
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-accent/20'
                            : isPast
                            ? 'bg-accent/10'
                            : 'bg-obsidian-700/50'
                        }`}
                      >
                        {isPast ? (
                          <Check className="w-5 h-5 text-accent" />
                        ) : (
                          <StepIcon
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isActive ? 'text-accent' : 'text-ivory-400'
                            }`}
                          />
                        )}
                        {isActive && (
                          <div className="absolute inset-0 rounded-xl bg-accent/20 animate-ping opacity-50" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono transition-colors duration-300 ${
                              isActive ? 'text-accent' : 'text-ivory-400/50'
                            }`}
                          >
                            {step.number}
                          </span>
                          <h3
                            className={`font-semibold transition-colors duration-300 ${
                              isActive ? 'text-ivory-50' : 'text-ivory-300'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-ivory-400 truncate">
                          {step.shortDesc}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? 'text-accent translate-x-0 opacity-100'
                            : 'text-ivory-400/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:w-2/3">
              <div
                className="relative glass-panel p-8 md:p-12 min-h-[400px] overflow-hidden"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 170, 0.04), transparent 40%), rgba(17, 17, 24, 0.4)`,
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-accent" />
                      </div>
                      <div className="absolute -inset-2 bg-accent/10 rounded-3xl blur-xl opacity-60" />
                    </div>

                    <div className="pt-2">
                      <span className="text-accent font-mono text-sm mb-1 block">
                        Step {currentStep.number}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-ivory-50">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-ivory-300 mb-8 leading-relaxed">
                    {currentStep.description}
                  </p>

                  <div className="space-y-4">
                    {currentStep.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                      >
                        <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-ivory-400">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {steps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleStepClick(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === activeStep
                                ? 'w-8 bg-accent'
                                : 'bg-ivory-400/20 hover:bg-ivory-400/40'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                        className="group flex items-center gap-2 text-accent hover:text-accent-light transition-colors duration-300"
                      >
                        <span className="text-sm font-medium">Next Step</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
