import { useState, cloneElement, ReactElement, MouseEvent } from "react";
import { useTheme } from "../context/ThemeContext";
import { X, Rocket, Check, Sparkles } from "lucide-react";

export function LaunchDemoModal({ children }: { children: ReactElement }) {
  const [showModal, setShowModal] = useState(false);
  const { isChaos } = useTheme();

  const handleClick = () => {
    setShowModal(true);
  };

  const trigger = cloneElement(children, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      handleClick();
      if (children.props.onClick) {
        children.props.onClick(e);
      }
    }
  });

  return (
    <>
      {trigger}
      {showModal && (
        <DemoModal
          onClose={() => setShowModal(false)}
          isChaos={isChaos}
        />
      )}
    </>
  );
}

function DemoModal({
  onClose,
  isChaos,
}: {
  onClose: () => void;
  isChaos: boolean;
}) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Rocket, text: "Initializing agents..." },
    { icon: Sparkles, text: "Configuring workflows..." },
    { icon: Check, text: "Ready to automate!" },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
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
          relative bg-background border rounded-lg p-8 max-w-md w-full space-y-6
          ${isChaos ? "animate-wiggle" : ""}
        `}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-muted"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="text-center space-y-4">
          <div
            className={`
              w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-primary
              ${isChaos ? "animate-float" : ""}
            `}
          >
            <CurrentIcon className="w-10 h-10 text-primary-foreground" />
          </div>

          <h3 className="text-xl font-bold">{steps[step].text}</h3>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl font-medium text-primary-foreground bg-primary transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {step < steps.length - 1 ? "Continue" : "Get Started"}
        </button>
      </div>
    </div>
  );
}
