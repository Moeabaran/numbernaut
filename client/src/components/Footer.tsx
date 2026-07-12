/**
 * Footer — Numbernaut
 * Northern Expedition design: deep forest green background
 */
import { Link } from "wouter";
import { MapPin, Mail, BookOpen, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest text-parchment">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-amber/20 flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber" aria-label="Numbernaut" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-parchment text-sm">Numbernaut</span>
                <span className="font-display text-amber text-xs font-medium tracking-widest uppercase">Canada</span>
              </div>
            </div>
            <p className="text-parchment/60 text-sm font-body leading-relaxed">
              The definitive numeracy intervention platform for Canadian elementary education.
            </p>
            <div className="mt-4 flex items-center gap-2 text-parchment/50 text-xs">
              <MapPin size={12} />
              <span>Canada — All Provinces & Territories</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold text-amber text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: "/pedagogy", label: "Pedagogy" },
                { href: "/taxonomy", label: "Micro-Skills" },
                { href: "/error-library", label: "Error Library" },
                { href: "/profiles", label: "Learner Profiles" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-parchment/60 hover:text-parchment text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-semibold text-amber text-sm mb-4 uppercase tracking-wider">About</h4>
            <ul className="space-y-2">
              {[
                { href: "/platform", label: "Platform Architecture" },
                { href: "/roadmap", label: "Development Roadmap" },
                { href: "/research", label: "Research & Evidence" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-parchment/60 hover:text-parchment text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-display font-semibold text-amber text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <p className="text-parchment/60 text-sm font-body leading-relaxed mb-4">
              Interested in piloting Numbernaut in your school or board? We'd love to hear from you.
            </p>
            <a
              href="mailto:info@numbernaut.ca"
              className="inline-flex items-center gap-2 text-amber hover:text-amber-light text-sm font-display font-medium transition-colors"
            >
              <Mail size={14} />
              info@numbernaut.ca
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-parchment/40 text-xs font-body">
            © 2026 Numbernaut. Master Planning Document v1.0.
          </p>
          <div className="flex items-center gap-2 text-parchment/40 text-xs font-body">
            <BookOpen size={12} />
            <span>Built on evidence-based numeracy research</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
