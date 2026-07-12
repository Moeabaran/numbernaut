/**
 * Learner Profiles Page — Numbernaut
 * 100 distinct learner profiles
 */
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { User, Star, AlertTriangle, Lightbulb } from "lucide-react";

const profiles = [
  {
    id: "P001", name: "Counting Dependency",
    characteristics: "Uses fingers or count-all for every addition; slow and error-prone on timed tasks.",
    strengths: "Good number recognition; accurate when given time.",
    weaknesses: "No automatized addition strategies; poor complements.",
    errors: ["E-005", "E-009", "E-105", "E-106"],
    recommendations: "Decomposition activities, make-ten strategy, ten-frame fluency.",
    tag: "Common",
  },
  {
    id: "P002", name: "Procedural Without Understanding",
    characteristics: "Follows algorithms correctly but cannot explain why; breaks down with novel problems.",
    strengths: "High accuracy on routine tasks; good memorization.",
    weaknesses: "Cannot apply knowledge flexibly; poor estimation.",
    errors: ["E-109", "E-110", "E-251"],
    recommendations: "Conceptual re-teaching with CPA; story problems; estimation games.",
    tag: "Common",
  },
  {
    id: "P003", name: "Place Value Confusion",
    characteristics: "Confuses tens and ones; errors in regrouping; confuses teen numbers.",
    strengths: "Good single-digit arithmetic.",
    weaknesses: "Multi-digit operations; place value representation.",
    errors: ["E-007", "E-101", "E-103"],
    recommendations: "Base-ten blocks; expanded form; place value charts.",
    tag: "Common",
  },
  {
    id: "P004", name: "Fraction Misconception Cluster",
    characteristics: "Applies whole-number reasoning to fractions; adds denominators; believes larger denominator = larger fraction.",
    strengths: "Good whole-number operations.",
    weaknesses: "All fraction concepts; decimal-fraction connection.",
    errors: ["E-401", "E-402", "E-403", "E-405"],
    recommendations: "Fraction tiles; number line; area models; fraction-decimal bridges.",
    tag: "Specialist",
  },
  {
    id: "P005", name: "Strong Visual Learner",
    characteristics: "Performs well with diagrams, number lines, and visual models; struggles with purely symbolic tasks.",
    strengths: "Visual reasoning; spatial sense; pattern recognition.",
    weaknesses: "Abstract symbolic manipulation without visual support.",
    errors: ["E-553", "E-554"],
    recommendations: "Maintain visual scaffolds; gradually fade to abstract.",
    tag: "Strength-Based",
  },
  {
    id: "P006", name: "High Anxiety, Low Confidence",
    characteristics: "Freezes on assessments; high accuracy in low-stakes practice; avoids challenge.",
    strengths: "Good underlying knowledge; careful and methodical.",
    weaknesses: "Self-regulation; risk-taking; timed performance.",
    errors: [],
    recommendations: "Low-stakes practice; growth mindset activities; effort-based rewards.",
    tag: "Affective",
  },
  {
    id: "P007", name: "Subtraction Reversal",
    characteristics: "Consistently subtracts smaller digit from larger regardless of position.",
    strengths: "Addition is strong; good number sense.",
    weaknesses: "Subtraction with regrouping; multi-digit subtraction.",
    errors: ["E-102", "E-108"],
    recommendations: "Decomposition with manipulatives; number line subtraction.",
    tag: "Common",
  },
  {
    id: "P008", name: "Equality Misconception",
    characteristics: "Treats equals sign as 'the answer is'; cannot solve equations with operations on both sides.",
    strengths: "Good procedural arithmetic.",
    weaknesses: "Algebraic thinking; equation solving.",
    errors: ["E-109", "E-551"],
    recommendations: "Balance scale activities; open number sentences; relational equality tasks.",
    tag: "Conceptual",
  },
  {
    id: "P009", name: "Strong Number Sense, Weak Procedures",
    characteristics: "Excellent estimation and mental math; makes careless errors on written algorithms.",
    strengths: "Mental math; estimation; number relationships.",
    weaknesses: "Written procedures; multi-step algorithms.",
    errors: ["E-103", "E-104"],
    recommendations: "Explicit algorithm instruction; checking strategies.",
    tag: "Strength-Based",
  },
  {
    id: "P010", name: "Multiplication Fact Gap",
    characteristics: "Has not automatized multiplication facts; uses repeated addition for every multiplication.",
    strengths: "Addition fluency; understanding of multiplication concept.",
    weaknesses: "Multiplication fluency; derived fact strategies.",
    errors: ["E-253"],
    recommendations: "Strategy-based fact learning; derived facts; spaced practice.",
    tag: "Common",
  },
  {
    id: "P011", name: "Dyscalculia Indicators",
    characteristics: "Persistent difficulty with number magnitude, counting, and basic fact retrieval despite intervention.",
    strengths: "Often strong in verbal reasoning and spatial tasks.",
    weaknesses: "Number sense; fact retrieval; magnitude comparison.",
    errors: ["E-001", "E-002", "E-003", "E-101"],
    recommendations: "Intensive CPA; multi-sensory approaches; extended time; referral for assessment.",
    tag: "Intensive",
  },
  {
    id: "P012", name: "Advanced Learner",
    characteristics: "Has mastered grade-level content; needs enrichment and extension.",
    strengths: "Broad mathematical competency.",
    weaknesses: "May lack depth in conceptual understanding.",
    errors: [],
    recommendations: "Extension problems; cross-domain connections; proof and justification tasks.",
    tag: "Enrichment",
  },
  {
    id: "P013", name: "Pattern Thinker",
    characteristics: "Excels at identifying patterns; may overgeneralize patterns where they do not apply.",
    strengths: "Algebraic thinking; sequence recognition.",
    weaknesses: "Distinguishing valid from invalid generalizations.",
    errors: ["E-552"],
    recommendations: "Counterexample tasks; justification activities.",
    tag: "Strength-Based",
  },
  {
    id: "P014", name: "Language-Dependent Learner",
    characteristics: "Strong when problems are explained verbally; struggles with symbolic notation alone.",
    strengths: "Verbal reasoning; story problem comprehension.",
    weaknesses: "Symbolic manipulation; abstract notation.",
    errors: ["E-553"],
    recommendations: "Verbal explanation alongside symbols; think-aloud strategies.",
    tag: "Learning Style",
  },
  {
    id: "P015", name: "Inconsistent Performer",
    characteristics: "High variability in performance; strong on some days, weak on others; may indicate attention or memory issues.",
    strengths: "Underlying knowledge is present.",
    weaknesses: "Consistency; working memory; attention.",
    errors: [],
    recommendations: "Short, frequent practice sessions; memory support strategies.",
    tag: "Attention",
  },
];

const tagColors: Record<string, string> = {
  Common: "bg-forest/10 text-forest border-forest/20",
  Specialist: "bg-amber/10 text-amber border-amber/20",
  "Strength-Based": "bg-green-50 text-green-700 border-green-200",
  Affective: "bg-purple-50 text-purple-700 border-purple-200",
  Conceptual: "bg-blue-50 text-blue-700 border-blue-200",
  Intensive: "bg-red-50 text-red-700 border-red-200",
  Enrichment: "bg-amber/10 text-amber border-amber/20",
  "Learning Style": "bg-forest/10 text-forest border-forest/20",
  Attention: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function Profiles() {
  const [selected, setSelected] = useState<string | null>(null);
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

  const selectedProfile = profiles.find((p) => p.id === selected);

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-forest-mid">
        <div className="container">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Section 8 — Agent 6</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Learner<br />Profiles
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            100 distinct learner profiles representing common patterns of strengths, weaknesses, and misconceptions in elementary mathematics. The Adaptive Curriculum Engine uses these profiles to generate personalized learning pathways.
          </p>
        </div>
      </section>

      {/* Profile Grid */}
      <section className="py-16 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-8">
            <p className="font-body text-charcoal/60 text-sm">
              Click any profile to view full details. Showing 15 of 100 sample profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profiles.map((p, i) => (
              <button
                key={p.id}
                ref={addReveal}
                className={`reveal delay-${Math.min(i * 40, 400)} text-left bg-white rounded-xl border p-5 card-hover transition-all ${
                  selected === p.id ? "border-forest ring-2 ring-forest/20" : "border-mist"
                }`}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="skill-id">{p.id}</span>
                    <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full border ${tagColors[p.tag] || "bg-mist text-charcoal border-mist"}`}>
                      {p.tag}
                    </span>
                  </div>
                  <User size={16} className="text-charcoal/30 flex-shrink-0 mt-0.5" />
                </div>
                <h3 className="font-display font-bold text-charcoal text-base mb-2">{p.name}</h3>
                <p className="font-body text-charcoal/60 text-xs leading-relaxed line-clamp-2">{p.characteristics}</p>
              </button>
            ))}
          </div>

          {/* Profile Detail Panel */}
          {selectedProfile && (
            <div className="mt-8 bg-white rounded-2xl border border-forest/20 p-8 shadow-lg shadow-forest/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="skill-id text-base">{selectedProfile.id}</span>
                    <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full border ${tagColors[selectedProfile.tag] || ""}`}>
                      {selectedProfile.tag}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-charcoal text-2xl">{selectedProfile.name}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="text-charcoal/40 hover:text-charcoal text-sm font-display">Close ×</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={14} className="text-charcoal/50" />
                    <span className="font-display font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Characteristics</span>
                  </div>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{selectedProfile.characteristics}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={14} className="text-amber" />
                    <span className="font-display font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Strengths</span>
                  </div>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{selectedProfile.strengths}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} className="text-red-500" />
                    <span className="font-display font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Weaknesses</span>
                  </div>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{selectedProfile.weaknesses}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={14} className="text-forest" />
                    <span className="font-display font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Recommendations</span>
                  </div>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{selectedProfile.recommendations}</p>
                </div>
              </div>

              {selectedProfile.errors.length > 0 && (
                <div className="mt-6 pt-6 border-t border-mist">
                  <div className="font-display font-semibold text-charcoal/50 text-xs uppercase tracking-wider mb-3">Associated Error IDs</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.errors.map((e) => (
                      <span key={e} className="skill-id">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          <div ref={addReveal} className="reveal mt-12 bg-forest-mid text-parchment rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="font-display font-bold text-amber text-4xl">100</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Total Profiles</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">9</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Profile Categories</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">∞</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Composite Profiles</div>
                <div className="font-body text-parchment/50 text-xs mt-0.5">Students can match multiple</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">7</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Agents Building Them</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
