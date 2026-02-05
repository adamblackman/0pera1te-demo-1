import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { ArrowRight, Mail, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative pt-32 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 to-obsidian-900" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/5 rounded-full blur-[150px] opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          className={`relative glass-panel p-12 md:p-16 text-center mb-24 overflow-hidden transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 212, 170, 0.08), transparent 40%)`,
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
              Ready to Automate?
            </h2>
            <p className="text-lg text-ivory-400 max-w-xl mx-auto mb-10">
              Tell us what you want to automate. We'll show you what's possible.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:hello@0pera1te.com?subject=Automation Inquiry&body=Email: ${email}`;
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-obsidian-800/50 border border-white/[0.08] rounded-full text-ivory-100 placeholder-ivory-400/50 focus:outline-none focus:border-accent/50 transition-colors duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="group btn-primary flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-12 mb-16 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <a
              href="#"
              className="text-2xl font-semibold tracking-tight text-ivory-50 hover:text-accent transition-colors duration-300"
            >
              0perA1te
            </a>
            <p className="mt-4 text-ivory-400 text-sm leading-relaxed">
              Elite AI automation for forward-thinking companies.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-ivory-200 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Capabilities', 'Process', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-ivory-400 hover:text-ivory-100 transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-ivory-200 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: 'mailto:hello@0pera1te.com', label: 'Email' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-obsidian-800/50 border border-white/[0.06] flex items-center justify-center text-ivory-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm text-ivory-400">
            {new Date().getFullYear()} 0perA1te. All rights reserved.
          </p>
          <p className="text-xs text-ivory-400/60">
            Trusted by innovative teams worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
