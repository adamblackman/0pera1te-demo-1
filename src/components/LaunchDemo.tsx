import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Rocket, Sparkles, Check, X } from "lucide-react";

export function LaunchDemo({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isChaos } = useTheme();
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Rocket, text: "Initializing agents..." },
    { icon: Sparkles, text: "Configuring workflows..." },
    { icon: Check, text: "Ready to automate!" },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
    }
  }, [isOpen]);


  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const CurrentIcon = steps[step].icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className={`
          relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full space-y-6
          ${isChaos ? "animate-wiggle" : ""}
        `}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-gray-500/20"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>

        <div className="text-center space-y-4">
          <div
            className={`
              w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500
              ${isChaos ? "animate-float" : ""}
            `}
          >
            <CurrentIcon className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-xl font-bold">{steps[step].text}</h3>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === step ? "w-6" : ""} ${i <= step ? "bg-cyan-500" : "bg-neutral-800"}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          {step < steps.length - 1 ? "Continue" : "Get Started"}
        </button>
      </div>
    </div>
  );
}
