/**
 * Taxonomy Page — Numbernaut
 * Micro-Skills Taxonomy: 500+ skills across 6 domains
 */
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const domains = [
  {
    id: "A",
    name: "Counting and Cardinality",
    range: "M001–M060",
    color: "bg-forest",
    light: "bg-forest/10",
    text: "text-forest",
    skills: [
      { id: "M001", name: "Count to 5", desc: "Recite number words in order from 1 to 5.", prereqs: "None" },
      { id: "M002", name: "Count to 10", desc: "Recite number words in order from 1 to 10.", prereqs: "M001" },
      { id: "M003", name: "Count to 20", desc: "Recite number words in order from 1 to 20.", prereqs: "M002" },
      { id: "M004", name: "Count to 100", desc: "Recite number words in order from 1 to 100, including decade transitions.", prereqs: "M003" },
      { id: "M005", name: "One-to-one correspondence to 5", desc: "Touch and count objects to 5, matching one number word to one object.", prereqs: "M001" },
      { id: "M009", name: "Subitize to 3", desc: "Instantly recognize quantities of 1, 2, and 3 without counting.", prereqs: "None" },
      { id: "M010", name: "Subitize to 5", desc: "Instantly recognize quantities of 1 through 5 without counting.", prereqs: "M009" },
      { id: "M012", name: "Count on from a given number", desc: "Begin counting from any given number, not always from 1.", prereqs: "M004, M008" },
      { id: "M015", name: "Skip count by 2s to 20", desc: "Count by 2s: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.", prereqs: "M003" },
      { id: "M016", name: "Skip count by 5s to 50", desc: "Count by 5s: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.", prereqs: "M004" },
    ],
  },
  {
    id: "B",
    name: "Number Sense and Place Value",
    range: "M061–M140",
    color: "bg-forest-mid",
    light: "bg-forest-mid/10",
    text: "text-forest-mid",
    skills: [
      { id: "M061", name: "Part-whole relationships to 5", desc: "Know that a number can be broken into two parts in multiple ways.", prereqs: "M007" },
      { id: "M062", name: "Part-whole relationships to 10", desc: "Decompose numbers to 10 in multiple ways.", prereqs: "M008, M061" },
      { id: "M067", name: "Complements to 5", desc: "Know all pairs that make 5 (e.g., 1+4, 2+3).", prereqs: "M065" },
      { id: "M068", name: "Complements to 10", desc: "Know all pairs that make 10 (e.g., 1+9, 2+8, 3+7).", prereqs: "M066" },
      { id: "M071", name: "Understand tens and ones", desc: "Know that numbers 11–19 are composed of one ten and some ones.", prereqs: "M070" },
      { id: "M072", name: "Place value to 99", desc: "Decompose two-digit numbers into tens and ones.", prereqs: "M071" },
      { id: "M073", name: "Place value to 999", desc: "Decompose three-digit numbers into hundreds, tens, and ones.", prereqs: "M072" },
      { id: "M076", name: "Round to nearest 10", desc: "Round two-digit numbers to the nearest ten.", prereqs: "M072" },
      { id: "M078", name: "Even and odd numbers", desc: "Identify and explain even and odd numbers to 20.", prereqs: "M070" },
    ],
  },
  {
    id: "C",
    name: "Addition and Subtraction",
    range: "M141–M240",
    color: "bg-amber",
    light: "bg-amber/10",
    text: "text-amber",
    skills: [
      { id: "M141", name: "Doubles to 10", desc: "Know all doubles: 1+1, 2+2, 3+3, 4+4, 5+5.", prereqs: "M066" },
      { id: "M142", name: "Doubles to 20", desc: "Know all doubles: 6+6, 7+7, 8+8, 9+9, 10+10.", prereqs: "M141" },
      { id: "M143", name: "Near doubles", desc: "Use doubles to solve near-doubles (e.g., 6+7 = 6+6+1).", prereqs: "M142" },
      { id: "M144", name: "Make ten strategy", desc: "Add by making a ten (e.g., 8+6 = 8+2+4 = 10+4 = 14).", prereqs: "M068" },
      { id: "M149", name: "Add two-digit numbers with regrouping", desc: "Add two-digit numbers requiring regrouping (carrying).", prereqs: "M148" },
      { id: "M151", name: "Subtract two-digit numbers with regrouping", desc: "Subtract two-digit numbers requiring borrowing.", prereqs: "M150" },
      { id: "M156", name: "Commutative property of addition", desc: "Know that a+b = b+a.", prereqs: "M145" },
      { id: "M158", name: "Addition and subtraction as inverses", desc: "Know that addition and subtraction are inverse operations.", prereqs: "M146" },
    ],
  },
  {
    id: "D",
    name: "Multiplication and Division",
    range: "M241–M340",
    color: "bg-forest-light",
    light: "bg-forest-light/10",
    text: "text-forest-light",
    skills: [
      { id: "M241", name: "Multiplication as repeated addition", desc: "Understand that 3×4 means 3 groups of 4.", prereqs: "M145" },
      { id: "M242", name: "Multiplication as an array", desc: "Represent multiplication using rows and columns.", prereqs: "M241" },
      { id: "M243", name: "Multiplication facts ×2", desc: "Know all ×2 facts fluently.", prereqs: "M141" },
      { id: "M248", name: "Multiplication facts ×6, ×7, ×8, ×9", desc: "Know all remaining multiplication facts fluently.", prereqs: "M247" },
      { id: "M249", name: "Commutative property of multiplication", desc: "Know that a×b = b×a.", prereqs: "M242" },
      { id: "M250", name: "Distributive property", desc: "Know that a×(b+c) = a×b + a×c.", prereqs: "M249" },
      { id: "M251", name: "Division as equal sharing", desc: "Understand division as distributing equally.", prereqs: "M241" },
      { id: "M253", name: "Division facts (inverse of multiplication)", desc: "Use multiplication knowledge to solve division facts.", prereqs: "M248, M252" },
    ],
  },
  {
    id: "E",
    name: "Fractions, Decimals & Percentages",
    range: "M341–M440",
    color: "bg-charcoal",
    light: "bg-charcoal/10",
    text: "text-charcoal",
    skills: [
      { id: "M341", name: "Fractions as parts of a whole", desc: "Know that a fraction represents equal parts of a whole.", prereqs: "M066" },
      { id: "M342", name: "Identify unit fractions", desc: "Recognize and name 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10.", prereqs: "M341" },
      { id: "M343", name: "Compare unit fractions", desc: "Know that 1/2 > 1/3 > 1/4 (larger denominator = smaller fraction).", prereqs: "M342" },
      { id: "M344", name: "Equivalent fractions", desc: "Identify and generate equivalent fractions.", prereqs: "M342" },
      { id: "M348", name: "Add fractions with different denominators", desc: "Find common denominators and add.", prereqs: "M344, M346" },
      { id: "M351", name: "Decimals as fractions", desc: "Know that 0.5 = 1/2, 0.25 = 1/4, etc.", prereqs: "M342" },
      { id: "M355", name: "Understand percent", desc: "Know that percent means per hundred; 50% = 1/2.", prereqs: "M352" },
    ],
  },
  {
    id: "F",
    name: "Patterns and Algebraic Thinking",
    range: "M441–M500",
    color: "bg-forest",
    light: "bg-forest/10",
    text: "text-forest",
    skills: [
      { id: "M441", name: "Identify repeating patterns", desc: "Recognize and extend AB, ABB, ABC patterns.", prereqs: "None" },
      { id: "M443", name: "Identify growing patterns", desc: "Recognize and extend patterns that grow by a constant amount.", prereqs: "M441" },
      { id: "M446", name: "Understand equality", desc: "Know that the equals sign means 'the same as,' not 'the answer is.'", prereqs: "M145" },
      { id: "M447", name: "Solve one-step equations (addition)", desc: "Find the unknown in equations like □ + 3 = 7.", prereqs: "M446, M158" },
      { id: "M451", name: "Understand variables", desc: "Use letters to represent unknown quantities.", prereqs: "M447" },
      { id: "M454", name: "Identify arithmetic sequences", desc: "Recognize sequences with a constant difference.", prereqs: "M443" },
    ],
  },
];

export default function Taxonomy() {
  const [activeDomain, setActiveDomain] = useState("A");
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

  const current = domains.find((d) => d.id === activeDomain)!;

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-forest">
        <div className="container">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Section 6 — Agent 4</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Micro-Skills<br />Taxonomy
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            500+ individually specified micro-skills across 6 mathematical domains — the structural backbone of the entire platform. Each skill is the smallest meaningful unit of mathematical competency that can be independently assessed and taught.
          </p>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3">
            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDomain(d.id)}
                className={`rounded-lg p-3 text-left transition-all border ${
                  activeDomain === d.id
                    ? "bg-amber text-charcoal border-amber"
                    : "bg-white/10 text-parchment/70 border-white/20 hover:bg-white/20 hover:text-parchment"
                }`}
              >
                <div className="font-display font-bold text-lg">Domain {d.id}</div>
                <div className="font-body text-xs opacity-80 leading-tight mt-0.5">{d.range}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Detail */}
      <section className="py-16 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl ${current.color} text-parchment font-display font-bold text-xl flex items-center justify-center`}>
                {current.id}
              </div>
              <div>
                <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">{current.name}</h2>
                <span className="font-mono text-xs text-charcoal/50">{current.range}</span>
              </div>
            </div>
            <p className="font-body text-charcoal/60 text-base">
              Showing sample entries. The full taxonomy contains 500+ skills with complete prerequisite chains, mastery indicators, and evidence requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {current.skills.map((skill, i) => (
              <div
                key={skill.id}
                ref={addReveal}
                className={`reveal delay-${Math.min(i * 50, 400)} bg-white rounded-xl border border-mist p-5 flex items-start gap-5 card-hover`}
              >
                <div className="flex-shrink-0">
                  <span className="skill-id">{skill.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-charcoal text-sm mb-1">{skill.name}</h3>
                  <p className="font-body text-charcoal/60 text-sm leading-relaxed">{skill.desc}</p>
                </div>
                <div className="flex-shrink-0 text-right hidden sm:block">
                  <div className="text-xs text-charcoal/40 font-body mb-1">Prerequisites</div>
                  <div className="font-mono text-xs text-forest-mid">{skill.prereqs}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Full taxonomy note */}
          <div ref={addReveal} className="reveal mt-10 bg-forest text-parchment rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-display font-bold text-amber text-4xl">500+</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Total Micro-Skills</div>
                <div className="font-body text-parchment/50 text-xs mt-0.5">Across all 6 domains</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">K–6</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">Grade Coverage</div>
                <div className="font-body text-parchment/50 text-xs mt-0.5">Kindergarten through Grade 6</div>
              </div>
              <div>
                <div className="font-display font-bold text-amber text-4xl">3</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">CPA Levels</div>
                <div className="font-body text-parchment/50 text-xs mt-0.5">Concrete, Pictorial, Abstract</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
