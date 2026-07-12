/**
 * Pedagogy Page — Numbernaut
 * CPA Framework, Instructional Hierarchy, What the Platform Rejects
 */
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";

const cpaExamples = [
  { concept: "7 × 11", concrete: "7 groups of 11 objects", pictorial: "Array model, area model", abstract: "7 × 10 + 7 × 1 = 77" },
  { concept: "8 + 7", concrete: "Counters and ten-frame", pictorial: "Number bond diagram", abstract: "Make ten: 10 + 5 = 15" },
  { concept: "Fractions", concrete: "Folded paper, fraction tiles", pictorial: "Bar model, number line", abstract: "1/2 = 2/4 = 0.5" },
];

const hierarchyStages = [
  {
    stage: "1. Acquisition",
    color: "bg-forest/10 border-forest/20 text-forest",
    accent: "bg-forest",
    desc: "Students need explicit instruction, guided practice, and feedback at every step. The system never rushes past this stage.",
  },
  {
    stage: "2. Fluency",
    color: "bg-amber/10 border-amber/20 text-amber",
    accent: "bg-amber",
    desc: "The goal shifts to building automaticity through repeated, well-structured practice. Fluency is built on understanding, not memorization.",
  },
  {
    stage: "3. Generalization",
    color: "bg-forest-mid/10 border-forest-mid/20 text-forest-mid",
    accent: "bg-forest-mid",
    desc: "Students apply the skill flexibly in new and unfamiliar contexts. Transfer is the ultimate evidence of genuine mastery.",
  },
];

const rejected = [
  { label: "Rote memorization as the starting point", reason: "Memorizing facts without understanding leads to fragile knowledge that cannot be applied flexibly." },
  { label: "Repetitive drill without understanding", reason: "Practice without conceptual grounding produces mechanical performance, not genuine competence." },
  { label: "One-size-fits-all instruction", reason: "Every child arrives with different prior knowledge, different misconceptions, and different learning needs." },
];

export default function Pedagogy() {
  const revealRefs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-forest overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.72 0.16 75) 0%, transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.97 0.015 85) 0%, transparent 40%)",
          }}
        />
        <div className="container relative z-10">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Section 3</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Pedagogical<br />Philosophy
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            Every design decision in Numbernaut flows from a single commitment: every mathematical fact must emerge from understanding, not memorization.
          </p>
        </div>
      </section>

      {/* What the Platform Rejects */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">What We Reject</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl">Three approaches the platform explicitly rejects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rejected.map((r, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 100 + 100} bg-white rounded-xl p-6 border border-mist`}>
                <div className="flex items-start gap-3 mb-3">
                  <XCircle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
                  <h3 className="font-display font-semibold text-charcoal text-sm leading-snug">{r.label}</h3>
                </div>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{r.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPA Framework */}
      <section className="py-20 bg-mist">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 3.2</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">The CPA Framework</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              The platform is built on the <strong className="text-charcoal">Concrete-Pictorial-Abstract (CPA)</strong> approach, developed from Jerome Bruner's modes of representation and widely validated in mathematics education research. This is the primary instructional framework used in high-performing mathematics systems in Canada, England, New Zealand, and Singapore.
            </p>
          </div>

          {/* CPA Progression */}
          <div ref={addReveal} className="reveal mb-12">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              {["Concrete", "Pictorial", "Abstract"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-4 flex-1">
                  <div className="flex-1 bg-white rounded-xl p-6 border border-mist text-center card-hover">
                    <div className="font-display font-bold text-forest text-2xl mb-1">{stage}</div>
                    <div className="font-body text-charcoal/60 text-xs">
                      {stage === "Concrete" && "Physical objects, manipulatives"}
                      {stage === "Pictorial" && "Diagrams, models, representations"}
                      {stage === "Abstract" && "Symbols, notation, algorithms"}
                    </div>
                  </div>
                  {i < 2 && <ArrowRight size={20} className="text-amber flex-shrink-0 hidden md:block" />}
                </div>
              ))}
            </div>
            <p className="font-body text-charcoal/60 text-sm italic text-center">
              The progression is not linear but interlaced — students may return to concrete representations when encountering new difficulties at the abstract level.
            </p>
          </div>

          {/* CPA Examples Table */}
          <div ref={addReveal} className="reveal">
            <h3 className="font-display font-semibold text-charcoal text-lg mb-4">Worked Examples</h3>
            <div className="bg-white rounded-xl border border-mist overflow-hidden">
              <div className="grid grid-cols-4 bg-forest text-parchment text-xs font-display font-semibold uppercase tracking-wider">
                <div className="p-4">Concept</div>
                <div className="p-4">Concrete</div>
                <div className="p-4">Pictorial</div>
                <div className="p-4">Abstract</div>
              </div>
              {cpaExamples.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 border-t border-mist ${i % 2 === 1 ? "bg-mist/30" : ""}`}>
                  <div className="p-4 font-mono text-forest font-semibold text-sm">{row.concept}</div>
                  <div className="p-4 font-body text-charcoal/70 text-sm">{row.concrete}</div>
                  <div className="p-4 font-body text-charcoal/70 text-sm">{row.pictorial}</div>
                  <div className="p-4 font-body text-charcoal/70 text-sm">{row.abstract}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instructional Hierarchy */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 3.3</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">The Instructional Hierarchy</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              The platform aligns with the Instructional Hierarchy, which maps three stages of skill development. A critical design principle is that the system <strong className="text-charcoal">never skips stages</strong>. A student who cannot yet consistently get the right answer is never moved into fluency-building practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hierarchyStages.map((s, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 100 + 100} bg-white rounded-xl p-6 border ${s.color.split(" ")[1]} card-hover`}>
                <div className={`w-2 h-8 rounded-full ${s.accent} mb-4`} />
                <h3 className={`font-display font-bold text-lg mb-3 ${s.color.split(" ")[2]}`}>{s.stage}</h3>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mastery Model */}
      <section className="py-20 bg-forest text-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-3 block">Section 10 — Mastery Model</span>
            <h2 className="font-display font-bold text-parchment text-3xl md:text-4xl mb-4">Four conditions for mastery</h2>
            <p className="font-body text-parchment/70 text-lg leading-relaxed max-w-3xl">
              A skill is marked as mastered only when all four conditions are simultaneously met. This prevents premature advancement and ensures genuine, durable learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { cond: "Accuracy Threshold", desc: "Student achieves ≥85% accuracy on the skill across multiple attempts.", icon: "85%" },
              { cond: "Confidence Threshold", desc: "The system has sufficient observations (≥10) to be confident in the accuracy assessment.", icon: "≥10" },
              { cond: "Retention", desc: "Student demonstrates the skill correctly after a spaced delay (1 day, 1 week, 1 month).", icon: "∞" },
              { cond: "Transfer", desc: "Student applies the skill correctly in a novel context or problem type not seen before.", icon: "→" },
            ].map((c, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 100 + 100} flex items-start gap-4 bg-white/10 border border-white/20 rounded-xl p-6`}>
                <div className="w-12 h-12 rounded-lg bg-amber/20 text-amber font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={14} className="text-amber" />
                    <h3 className="font-display font-semibold text-parchment text-sm">{c.cond}</h3>
                  </div>
                  <p className="font-body text-parchment/60 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pedagogy visual */}
      <section className="py-20 bg-mist">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={addReveal} className="reveal">
              <div
                className="rounded-2xl shadow-xl shadow-forest/10 w-full h-72 bg-forest"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 30%, oklch(0.72 0.16 75 / 0.35) 0%, transparent 50%), radial-gradient(circle at 75% 70%, oklch(0.97 0.015 85 / 0.2) 0%, transparent 45%)",
                }}
                role="img"
                aria-label="CPA learning materials"
              />
            </div>
            <div ref={addReveal} className="reveal delay-200">
              <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Canadian Curriculum Alignment</span>
              <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-6">Five core strands, 13 jurisdictions</h2>
              <div className="space-y-4">
                {[
                  { strand: "Number Sense and Numeration", desc: "Whole numbers, operations, place value, fractions, decimals, percentages." },
                  { strand: "Measurement", desc: "Length, area, volume, weight, time; metric and imperial systems." },
                  { strand: "Geometry and Spatial Sense", desc: "2D/3D shapes, properties, transformations, symmetry." },
                  { strand: "Patterns and Algebra", desc: "Patterns, algebraic thinking, equations, variables." },
                  { strand: "Data Management and Probability", desc: "Data collection, organization, analysis, basic probability." },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-display font-semibold text-charcoal text-sm">{s.strand}: </span>
                      <span className="font-body text-charcoal/60 text-sm">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
