import { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Bot, Workflow, Database, Zap } from 'lucide-react';
import { BuildStrip } from './BuildStrip';

const capabilities = [
  {
    icon: Bot,
    title: 'Intelligent Agents',
    description: 'Autonomous AI systems that handle complex workflows end-to-end.',
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'Transform manual operations into self-running pipelines.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Connect and synchronize data across all your platforms.',
  },
  {
    icon: Zap,
    title: 'Custom AI Tools',
    description: 'Purpose-built solutions tailored to your specific needs.',
  },
];

interface CardProps {
  capability: typeof capabilities[0];
  index: number;
  isVisible: boolean;
}

function CapabilityCard({ capability, index, isVisible }: CardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = capability.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative glass-panel-hover p-8 cursor-default transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 170, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6 text-accent" />
        </div>

        <h3 className="text-xl font-semibold text-ivory-50 mb-3">
          {capability.title}
        </h3>

        <p className="text-ivory-400 leading-relaxed">
          {capability.description}
        </p>
      </div>

      <div
        className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export function Capabilities() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/50 to-obsidian-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span
            className={`inline-block text-accent text-sm font-medium tracking-widest uppercase mb-4 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Capabilities
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold text-gradient mb-6 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            What We Build
          </h2>
          <p
            className={`text-lg text-ivory-400 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            End-to-end automation solutions powered by cutting-edge AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
              isVisible={isInView}
            />
          ))}
        </div>
        <BuildStrip />
      </div>
    </section>
  );
}
