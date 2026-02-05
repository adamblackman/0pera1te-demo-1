import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-950/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-ivory-50 hover:text-accent transition-colors duration-300"
          >
            0perA1te
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ivory-300 hover:text-ivory-50 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-obsidian-950 bg-accent hover:bg-accent-light px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,212,170,0.4)]"
          >
            Start Project
          </a>

          <button className="md:hidden p-2 text-ivory-300 hover:text-ivory-50 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
