/**
 * Roadmap Page — Numbernaut
 * 5-phase development roadmap over 36 months
 */
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle, Circle, Clock } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    months: "Months 1–6",
    status: "In Progress",
    color: "bg-forest",
    milestones: [
      { id: "M1.1", desc: "Complete micro-skills taxonomy (500+ skills)." },
      { id: "M1.2", desc: "Complete error library (1,000 errors)." },
      { id: "M1.3", desc: "Complete 100 learner profiles." },
      { id: "M1.4", desc: "Complete Canadian curriculum alignment matrix." },
      { id: "M1.5", desc: "Complete database schema design." },
      { id: "M1.6", desc: "Complete pedagogical framework documentation." },
    ],
  },
  {
    phase: "Phase 2",
    title: "Core Engine Development",
    months: "Months 7–12",
    status: "Planned",
    color: "bg-forest-mid",
    milestones: [
      { id: "M2.1", desc: "Implement offline database (SQLite)." },
      { id: "M2.2", desc: "Implement Assessment Engine." },
      { id: "M2.3", desc: "Implement Mastery Engine and Confidence Model." },
      { id: "M2.4", desc: "Implement Diagnostic Engine." },
      { id: "M2.5", desc: "Implement basic Recommendation Engine." },
      { id: "M2.6", desc: "Implement Adaptive Curriculum Engine (rule-based)." },
    ],
  },
  {
    phase: "Phase 3",
    title: "Application Development",
    months: "Months 13–20",
    status: "Planned",
    color: "bg-amber",
    milestones: [
      { id: "M3.1", desc: "Develop Student App (core activities, Domains A and B)." },
      { id: "M3.2", desc: "Develop Teacher Dashboard (basic views)." },
      { id: "M3.3", desc: "Develop Exercise Library (500+ activities)." },
      { id: "M3.4", desc: "Implement Gamification System (world map, badges)." },
      { id: "M3.5", desc: "Develop Parent Dashboard." },
      { id: "M3.6", desc: "Implement Reporting Engine." },
    ],
  },
  {
    phase: "Phase 4",
    title: "Pilot and Validation",
    months: "Months 21–26",
    status: "Planned",
    color: "bg-forest-light",
    milestones: [
      { id: "M4.1", desc: "Recruit 5–10 pilot schools across 3 provinces." },
      { id: "M4.2", desc: "Deploy functional prototype to pilot schools." },
      { id: "M4.3", desc: "Collect and analyze pilot data." },
      { id: "M4.4", desc: "Conduct teacher and student feedback sessions." },
      { id: "M4.5", desc: "Refine platform based on pilot findings." },
    ],
  },
  {
    phase: "Phase 5",
    title: "Full Production",
    months: "Months 27–36",
    status: "Planned",
    color: "bg-charcoal",
    milestones: [
      { id: "M5.1", desc: "Complete Exercise Library (2,000+ activities)." },
      { id: "M5.2", desc: "Complete all 6 narrative regions." },
      { id: "M5.3", desc: "Complete Teacher and Parent Dashboards." },
      { id: "M5.4", desc: "Complete CMS." },
      { id: "M5.5", desc: "Conduct independent research validation study." },
      { id: "M5.6", desc: "Prepare commercial launch package." },
    ],
  },
];

const commercialSegments = [
  { segment: "Individual Schools", desc: "Direct purchase by school principals.", model: "Per-student annual license." },
  { segment: "School Boards", desc: "Board-wide deployment across multiple schools.", model: "Volume licensing with board-level analytics." },
  { segment: "Provincial Ministries", desc: "Government procurement for province-wide deployment.", model: "Enterprise licensing with custom reporting." },
  { segment: "Intervention Programs", desc: "Specialized numeracy intervention programs.", model: "Per-program licensing with clinical reporting." },
  { segment: "Tutoring Centers", desc: "Private tutoring businesses.", model: "Per-center monthly subscription." },
];

const successMetrics = [
  { metric: "Mastery Rate", target: "≥80%", desc: "of students master targeted skills within 12 weeks." },
  { metric: "Intervention Efficiency", target: "30%", desc: "reduction in time to mastery vs. control group." },
  { metric: "Student Confidence", target: "Significant", desc: "improvement in math confidence scores." },
  { metric: "Teacher Satisfaction", target: "≥85%", desc: "of teachers report improved decision-making." },
  { metric: "Engagement", target: "≥15 min", desc: "average session duration; ≥4 sessions per week." },
  { metric: "Commercial Adoption", target: "50 schools", desc: "in Year 1; 500 schools in Year 3." },
];

export default function Roadmap() {
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

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-forest">
        <div className="container">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Sections 17, 18, 20</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Development<br />Roadmap
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            5 phases over 36 months — from foundational documentation to commercial launch. A clear, milestone-driven path from vision to validated, production-ready platform.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 18</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl">36-Month Development Plan</h2>
          </div>

          <div className="space-y-6">
            {phases.map((phase, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 80} bg-white rounded-2xl border border-mist overflow-hidden`}>
                <div className={`${phase.color} px-6 py-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-4">
                    <span className="font-display font-bold text-parchment text-lg">{phase.phase}</span>
                    <span className="font-display font-semibold text-parchment/80 text-base">{phase.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-parchment/70 text-sm">{phase.months}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-display font-semibold px-2.5 py-1 rounded-full ${
                      phase.status === "In Progress" ? "bg-amber text-charcoal" : "bg-white/20 text-parchment"
                    }`}>
                      {phase.status === "In Progress" ? <Clock size={10} /> : <Circle size={10} />}
                      {phase.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {phase.milestones.map((m) => (
                    <div key={m.id} className="flex items-start gap-2">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${phase.status === "In Progress" ? "text-forest" : "text-charcoal/20"}`} />
                      <div>
                        <span className="font-mono text-xs text-charcoal/40 mr-1">{m.id}</span>
                        <span className="font-body text-charcoal/70 text-sm">{m.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Strategy */}
      <section className="py-20 bg-mist">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 17</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">Commercial Strategy</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              The platform is designed for commercial viability across five distinct market segments, with a tiered pricing model that scales from individual schools to provincial ministries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {commercialSegments.map((s, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 80 + 100} bg-white rounded-xl border border-mist p-6 card-hover`}>
                <h3 className="font-display font-bold text-charcoal text-base mb-2">{s.segment}</h3>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed mb-3">{s.desc}</p>
                <div className="pt-3 border-t border-mist">
                  <span className="font-display font-semibold text-forest text-xs uppercase tracking-wider">Pricing Model: </span>
                  <span className="font-body text-charcoal/60 text-xs">{s.model}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Differentiation */}
          <div ref={addReveal} className="reveal mt-10 bg-forest text-parchment rounded-2xl p-8">
            <h3 className="font-display font-bold text-parchment text-xl mb-6">Competitive Differentiation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { point: "Fully Offline", desc: "No dependency on internet connectivity." },
                { point: "Scientific Rigor", desc: "Grounded in research, not just engagement." },
                { point: "Explainable Diagnostics", desc: "Teachers understand why the system makes recommendations." },
                { point: "Canadian Curriculum", desc: "Built specifically for all 13 provincial curricula." },
                { point: "Intervention-Grade Depth", desc: "Not a supplement — a full remediation system." },
              ].map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-display font-semibold text-amber text-sm">{d.point}: </span>
                    <span className="font-body text-parchment/60 text-sm">{d.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 20</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl">Success Metrics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {successMetrics.map((m, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 80 + 100} bg-white rounded-xl border border-mist p-6`}>
                <div className="font-display font-bold text-amber text-3xl mb-1">{m.target}</div>
                <div className="font-display font-semibold text-charcoal text-sm mb-2">{m.metric}</div>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
