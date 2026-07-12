/**
 * Navigation — Numbernaut
 * Northern Expedition design: forest green, transparent → opaque on scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Compass } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pedagogy", label: "Pedagogy" },
  { href: "/taxonomy", label: "Micro-Skills" },
  { href: "/error-library", label: "Error Library" },
  { href: "/profiles", label: "Learner Profiles" },
  { href: "/platform", label: "Platform" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/research", label: "Research" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-forest shadow-lg shadow-forest/20"
            : "bg-forest/90 backdrop-blur-sm"
        }`}
        style={{ backgroundColor: scrolled || mobileOpen ? "oklch(0.28 0.08 155)" : undefined }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-amber/20 flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5 text-amber" aria-label="Numbernaut" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-parchment text-sm tracking-tight">Numbernaut</span>
                <span className="font-display text-amber text-xs font-medium tracking-widest uppercase">Canada</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-display font-medium transition-colors duration-150 ${
                    location === link.href
                      ? "bg-amber/20 text-amber"
                      : "text-parchment/80 hover:text-parchment hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="px-4 py-2 bg-amber text-charcoal font-display font-semibold text-sm rounded-md hover:bg-amber-light transition-colors duration-150 active:scale-95"
              >
                Request Demo
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-parchment hover:text-amber transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-forest border-t border-white/10">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-md text-sm font-display font-medium transition-colors ${
                    location === link.href
                      ? "bg-amber/20 text-amber"
                      : "text-parchment/80 hover:text-parchment hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="mt-2 px-4 py-2.5 bg-amber text-charcoal font-display font-semibold text-sm rounded-md text-center"
              >
                Request Demo
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
