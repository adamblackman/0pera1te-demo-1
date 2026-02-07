import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, X, Rocket, Check } from 'lucide-react';

export function Modal({
  onClose,
  onLog
}: {
  onClose: () => void;
  onLog?: (msg: string) => void;
}) {
  const { isChaos } = useTheme();
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Rocket, text: 'Initializing agents...' },
    { icon: Sparkles, text: 'Configuring workflows...' },
    { icon: Check, text: 'Ready to automate!' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
      onLog?.(`Demo step ${step + 2}: ${steps[step + 1].text}`);
    } else {
      onClose();
    }
  };

  const CurrentIcon = steps[step].icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className={`
          relative panel p-8 max-w-md w-full space-y-6
          ${isChaos ? 'animate-wiggle' : ''}
        `}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-gray-500/20"
        >
          <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
        </button>

        <div className="text-center space-y-4">
          <div
            className={`
              w-20 h-20 mx-auto rounded-2xl flex items-center justify-center
              ${isChaos ? 'animate-float' : ''}
            `}
            style={{ background: 'var(--accent-gradient)' }}
          >
            <CurrentIcon className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-xl font-bold">{steps[step].text}</h3>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === step ? 'w-6' : ''}`}
                style={{
                  background: i <= step ? 'var(--accent-1)' : 'var(--bg-accent)'
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: 'var(--accent-gradient)' }}
        >
          {step < steps.length - 1 ? 'Continue' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
