/**
 * Error Library Page — Numbernaut
 * National Error Library: 1,000 common mathematical errors
 */
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const categories = [
  {
    id: "1",
    name: "Counting Errors",
    range: "E-001–E-100",
    count: 100,
    errors: [
      { id: "E-001", desc: "Skips a number when counting aloud.", cause: "Incomplete memorization of count sequence.", skills: "M001, M002, M003", severity: "Medium", remediation: "Choral counting, number line tracing." },
      { id: "E-002", desc: "Recites numbers but cannot apply cardinality principle.", cause: "Counting without understanding 'how many.'", skills: "M007, M008", severity: "High", remediation: "'How many?' games with physical objects." },
      { id: "E-003", desc: "Double-counts one object.", cause: "Lack of one-to-one correspondence.", skills: "M005, M006", severity: "High", remediation: "Structured counting with physical movement." },
      { id: "E-005", desc: "Starts counting from 1 when asked to count on.", cause: "Cannot count on from a given number.", skills: "M012", severity: "High", remediation: "'Start from' games, number line practice." },
      { id: "E-007", desc: "Confuses teen numbers (e.g., 13 and 30).", cause: "Insufficient place value understanding.", skills: "M071, M072", severity: "High", remediation: "Place value blocks, explicit teen number instruction." },
      { id: "E-009", desc: "Counts all objects when adding (count-all strategy).", cause: "Has not developed count-on strategy.", skills: "M012, M145", severity: "High", remediation: "Count-on games, number line." },
    ],
  },
  {
    id: "2",
    name: "Addition and Subtraction Errors",
    range: "E-101–E-250",
    count: 150,
    errors: [
      { id: "E-101", desc: "Adds digits without regard to place value (e.g., 27+45=612).", cause: "Treats each column as independent single digits.", skills: "M072, M149", severity: "High", remediation: "Place value blocks, expanded form addition." },
      { id: "E-102", desc: "Subtracts smaller from larger digit regardless of position (e.g., 52-27=35).", cause: "'Always subtract the smaller from the larger' misconception.", skills: "M151", severity: "High", remediation: "Decomposition with base-ten blocks." },
      { id: "E-103", desc: "Forgets to regroup when adding.", cause: "Procedural gap; does not recognize when regrouping is needed.", skills: "M149", severity: "High", remediation: "Explicit regrouping instruction with manipulatives." },
      { id: "E-105", desc: "Cannot recall complements to 10.", cause: "Complements not yet automatized.", skills: "M068", severity: "High", remediation: "Ten-frame games, complement drills." },
      { id: "E-109", desc: "Incorrect use of the equals sign (treats it as 'the answer').", cause: "Operational rather than relational understanding of equality.", skills: "M446", severity: "High", remediation: "Balance scale activities, open number sentences." },
    ],
  },
  {
    id: "3",
    name: "Multiplication and Division Errors",
    range: "E-251–E-400",
    count: 150,
    errors: [
      { id: "E-251", desc: "Believes multiplication always makes numbers bigger.", cause: "Overgeneralization from whole number experience.", skills: "M241", severity: "High", remediation: "Fractions and decimals context; visual models." },
      { id: "E-252", desc: "Confuses multiplication and addition (e.g., 3×4=7).", cause: "Insufficient understanding of multiplication as repeated addition.", skills: "M241", severity: "High", remediation: "Array models, equal groups activities." },
      { id: "E-253", desc: "Skips facts when reciting multiplication tables.", cause: "Incomplete memorization; no strategy backup.", skills: "M243–M248", severity: "Medium", remediation: "Strategy-based fact learning, not just memorization." },
      { id: "E-254", desc: "Cannot apply distributive property.", cause: "Procedural knowledge without conceptual understanding.", skills: "M250", severity: "High", remediation: "Area model, visual decomposition." },
      { id: "E-256", desc: "Divides in wrong direction (e.g., 12÷4 computed as 4÷12).", cause: "Confusion about dividend and divisor roles.", skills: "M251", severity: "High", remediation: "Equal sharing activities with manipulatives." },
    ],
  },
  {
    id: "4",
    name: "Fraction and Decimal Errors",
    range: "E-401–E-550",
    count: 150,
    errors: [
      { id: "E-401", desc: "Believes larger denominator means larger fraction.", cause: "Applies whole number reasoning to fractions.", skills: "M343", severity: "High", remediation: "Fraction tiles, number line, visual comparison." },
      { id: "E-402", desc: "Adds denominators when adding fractions (e.g., 1/2+1/3=2/5).", cause: "Treats numerator and denominator as independent whole numbers.", skills: "M348", severity: "High", remediation: "Fraction bars, common denominator instruction." },
      { id: "E-403", desc: "Cannot identify equivalent fractions.", cause: "Does not understand fractions as ratios.", skills: "M344", severity: "High", remediation: "Fraction wall, area models." },
      { id: "E-404", desc: "Confuses decimal place value (e.g., believes 0.3 < 0.25).", cause: "Applies whole number place value reasoning to decimals.", skills: "M353", severity: "High", remediation: "Number line, decimal grids." },
      { id: "E-405", desc: "Cannot convert between fractions and decimals.", cause: "Treats fractions and decimals as unrelated.", skills: "M351", severity: "High", remediation: "Hundred grids, fraction-decimal matching." },
    ],
  },
  {
    id: "5",
    name: "Algebraic Thinking Errors",
    range: "E-551–E-650",
    count: 100,
    errors: [
      { id: "E-551", desc: "Interprets equals sign as 'the answer is' (operational).", cause: "Insufficient exposure to relational equality.", skills: "M446", severity: "High", remediation: "Balance scale, open equations on both sides." },
      { id: "E-552", desc: "Cannot extend a growing pattern beyond 2 steps.", cause: "Identifies pattern visually but cannot articulate rule.", skills: "M443, M444", severity: "Medium", remediation: "Table of values, explicit rule articulation." },
      { id: "E-553", desc: "Confuses variable with a specific unknown value.", cause: "Does not understand variables can represent any value.", skills: "M451", severity: "Medium", remediation: "Multiple-value substitution activities." },
      { id: "E-554", desc: "Applies arithmetic operations in wrong order.", cause: "No understanding of order of operations.", skills: "M453", severity: "High", remediation: "BEDMAS/PEMDAS instruction with visual cues." },
    ],
  },
];

const severityConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  High: { icon: <AlertTriangle size={12} />, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  Medium: { icon: <AlertCircle size={12} />, color: "text-amber", bg: "bg-amber/10 border-amber/20" },
  Low: { icon: <Info size={12} />, color: "text-forest-light", bg: "bg-forest/10 border-forest/20" },
};

export default function ErrorLibrary() {
  const [activeCategory, setActiveCategory] = useState("1");
  const revealRefs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal">
        <div className="container">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Section 7 — Agent 5</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            National Error<br />Library
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            1,000 common mathematical errors observed in elementary school students — each with probable causes, severity ratings, related micro-skills, and evidence-based remediation strategies. The diagnostic core of the platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`rounded-lg px-4 py-2 text-sm font-display font-medium transition-all border ${
                  activeCategory === c.id
                    ? "bg-amber text-charcoal border-amber"
                    : "bg-white/10 text-parchment/70 border-white/20 hover:bg-white/20 hover:text-parchment"
                }`}
              >
                {c.name} <span className="opacity-60 text-xs ml-1">{c.range}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Error entries */}
      <section className="py-16 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">{current.name}</h2>
              <p className="font-body text-charcoal/50 text-sm mt-1">{current.count} entries in this category · {current.range}</p>
            </div>
          </div>

          <div className="space-y-4">
            {current.errors.map((err, i) => {
              const sev = severityConfig[err.severity] || severityConfig.Low;
              return (
                <div
                  key={err.id}
                  ref={addReveal}
                  className={`reveal delay-${Math.min(i * 60, 400)} bg-white rounded-xl border border-mist p-6`}
                >
                  <div className="flex items-start gap-4">
                    <span className="skill-id flex-shrink-0 mt-0.5">{err.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="font-display font-semibold text-charcoal text-sm leading-snug">{err.desc}</p>
                        <span className={`inline-flex items-center gap-1 text-xs font-display font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${sev.color} ${sev.bg}`}>
                          {sev.icon} {err.severity}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-display font-semibold text-charcoal/40 text-xs uppercase tracking-wider mb-1">Probable Cause</div>
                          <p className="font-body text-charcoal/70 text-sm leading-relaxed">{err.cause}</p>
                        </div>
                        <div>
                          <div className="font-display font-semibold text-charcoal/40 text-xs uppercase tracking-wider mb-1">Related Skills</div>
                          <p className="font-mono text-forest-mid text-xs">{err.skills}</p>
                        </div>
                        <div>
                          <div className="font-display font-semibold text-charcoal/40 text-xs uppercase tracking-wider mb-1">Remediation</div>
                          <p className="font-body text-charcoal/70 text-sm leading-relaxed">{err.remediation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div ref={addReveal} className="reveal mt-12 bg-charcoal text-parchment rounded-2xl p-8">
            <h3 className="font-display font-bold text-parchment text-xl mb-6">Full Library Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="font-display font-bold text-amber text-4xl">1,000</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Total Errors</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">5</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Categories</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">3</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Severity Levels</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">500+</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Linked Micro-Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
