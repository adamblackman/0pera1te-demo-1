import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseOffset: number;
}

interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  const PARTICLE_COUNT = 120;
  const CONNECTION_DISTANCE = 180;
  const MOUSE_RADIUS = 250;
  const PARTICLE_SPEED = 0.4;

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const gridSize = 60;
    const waveAmplitude = 8;
    const waveSpeed = 0.002;

    ctx.strokeStyle = 'rgba(0, 212, 170, 0.03)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      for (let y = 0; y <= height; y += 5) {
        const wave = Math.sin((y * 0.01) + (time * waveSpeed) + (x * 0.005)) * waveAmplitude;
        if (y === 0) {
          ctx.moveTo(x + wave, y);
        } else {
          ctx.lineTo(x + wave, y);
        }
      }
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 5) {
        const wave = Math.sin((x * 0.01) + (time * waveSpeed) + (y * 0.005)) * waveAmplitude;
        if (x === 0) {
          ctx.moveTo(x, y + wave);
        } else {
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();
    }

    for (let x = gridSize; x < width; x += gridSize) {
      for (let y = gridSize; y < height; y += gridSize) {
        const wave = Math.sin((x * 0.01 + y * 0.01) + time * waveSpeed) * waveAmplitude;
        const pulse = Math.sin(time * 0.003 + x * 0.01 + y * 0.01) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(x + wave * 0.5, y + wave * 0.5, 2 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.1 + pulse * 0.15})`;
        ctx.fill();
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = dimensionsRef.current;
    ctx.clearRect(0, 0, width, height);

    timeRef.current += 16;
    const time = timeRef.current;

    drawGrid(ctx, width, height, time);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      if (mouse.active) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          particle.vx += (dx / dist) * force * 0.03;
          particle.vy += (dy / dist) * force * 0.03;
        }
      }

      particle.vx *= 0.98;
      particle.vy *= 0.98;

      const pulse = Math.sin(time * 0.003 + particle.pulseOffset) * 0.3 + 0.7;
      const currentSize = particle.size * pulse;
      const currentOpacity = particle.opacity * pulse;

      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, currentSize * 3
      );
      gradient.addColorStop(0, `rgba(0, 212, 170, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(0, 212, 170, ${currentOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(0, 212, 170, 0)');

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 204, ${currentOpacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2;
          const lineGradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          lineGradient.addColorStop(0, `rgba(0, 212, 170, ${opacity * pulse})`);
          lineGradient.addColorStop(0.5, `rgba(0, 255, 204, ${opacity * 1.5 * pulse})`);
          lineGradient.addColorStop(1, `rgba(0, 212, 170, ${opacity * pulse})`);

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1 + (1 - dist / CONNECTION_DISTANCE) * 0.5;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const opacity = (1 - dist / MOUSE_RADIUS) * 0.4;
          const lineGradient = ctx.createLinearGradient(
            particle.x, particle.y, mouse.x, mouse.y
          );
          lineGradient.addColorStop(0, `rgba(0, 212, 170, ${opacity})`);
          lineGradient.addColorStop(1, `rgba(0, 255, 204, ${opacity * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    });

    if (mouse.active) {
      const cursorGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 80
      );
      cursorGradient.addColorStop(0, 'rgba(0, 255, 204, 0.15)');
      cursorGradient.addColorStop(0.5, 'rgba(0, 212, 170, 0.05)');
      cursorGradient.addColorStop(1, 'rgba(0, 212, 170, 0)');

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fillStyle = cursorGradient;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [drawGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      dimensionsRef.current = { width: rect.width * dpr, height: rect.height * dpr };

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        dimensionsRef.current = { width: rect.width, height: rect.height };
      }

      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
