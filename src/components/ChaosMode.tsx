import { useEffect } from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { TopBar } from './TopBar';

function ChaosModeInner() {
  const { isChaos } = useTheme();

  useEffect(() => {
    if (isChaos) {
      document.body.classList.add('chaos-mode');
    } else {
      document.body.classList.remove('chaos-mode');
    }
  }, [isChaos]);

  return <TopBar />;
}

export function ChaosMode() {
  return (
    <ThemeProvider>
      <ChaosModeInner />
    </ThemeProvider>
  );
}
