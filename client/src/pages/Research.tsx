/**
 * Research Page — Numbernaut
 * Research validation plan, evidence base, references
 */
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, FlaskConical, BarChart3, Users, ExternalLink } from "lucide-react";

const validationObjectives = [
  "Improved student mastery of foundational numeracy skills.",
  "Reduced time required for effective intervention.",
  "Increased student confidence in mathematics.",
  "Improved teacher decision-making through actionable data.",
  "Increased student engagement.",
];

const outcomeMeasures = [
  { measure: "Numeracy proficiency", instrument: "Validated numeracy assessment (e.g., KeyMath-3, Number Sense Screener)", timing: "Pre, Post, 3-month follow-up" },
  { measure: "Mastery rate", instrument: "Platform mastery data", timing: "Continuous" },
  { measure: "Engagement", instrument: "Platform session data", timing: "Continuous" },
  { measure: "Teacher satisfaction", instrument: "Survey", timing: "Post-intervention" },
  { measure: "Student confidence", instrument: "Math Anxiety Rating Scale (adapted)", timing: "Pre, Post" },
];

const references = [
  { num: 1, citation: "Maths — No Problem!. (n.d.). The CPA Approach: The Definitive Guide to Concrete-Pictorial-Abstract.", url: "http://mathsnoproblem.com/en/approach/concrete-pictorial-abstract" },
  { num: 2, citation: "Haring, N.G., Lovitt, T.C., Eaton, M.D., & Hansen, C.L. (1978). The Fourth R: Research in the Classroom. Columbus, OH: Charles E. Merrill Publishing Co.", url: null },
  { num: 3, citation: "Think Academy Canada. (2025). Understanding Canada's Math Curriculum: Structure and Key Concepts.", url: "https://www.thinkacademy.ca/blog/blog/2025/09/14/understanding-canadas-math-curriculum-structure-and-key-concepts/" },
  { num: 4, citation: "Ontario Ministry of Education. (2020). The Ontario Curriculum, Grades 1–8: Mathematics.", url: "https://www.ontario.ca/page/math-curriculum-grades-1-8" },
  { num: 5, citation: "Structural Learning. (2024). Mastery Learning: Definition, Examples & Strategies.", url: "https://www.structural-learning.com/post/mastery-learning" },
  { num: 6, citation: "Gardner-Medwin, A. R., & Gahan, M. (2019). Certainty-based marking in a formative assessment improves reflective learning. BMC Medical Education.", url: "https://link.springer.com/article/10.1186/s12909-019-1610-2" },
  { num: 7, citation: "Locize. (2025). Offline-First Apps: Architecture, Frameworks & Real Examples.", url: "https://www.locize.com/blog/offline-first-apps" },
  { num: 8, citation: "Discovery Education. (2026). Math Intervention Guide: 10 Research-Based Strategies That Work.", url: "https://www.discoveryeducation.com/blog/teaching-and-learning/math-intervention/" },
  { num: 9, citation: "Frontiers in Education. (2024). Impact of gamification on school engagement: a systematic review.", url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1466926/full" },
  { num: 10, citation: "Third Space Learning. (n.d.). Common Elementary Math Misconceptions & How To Fix Them.", url: "https://thirdspacelearning.com/us/blog/math-misconceptions-elementary/" },
  { num: 11, citation: "EDUCAUSE Review. (2016). Adaptive Learning Systems: Surviving the Storm.", url: "https://er.educause.edu/articles/2016/10/adaptive-learning-systems-surviving-the-storm" },
  { num: 12, citation: "Bruner, J. S. (1966). Toward a Theory of Instruction. Cambridge, MA: Harvard University Press.", url: null },
];

const agentDeliverables = [
  { agent: "Agent 1", role: "Project Director", deliverables: "Vision, roadmap, milestones, coordination." },
  { agent: "Agent 2", role: "Canadian Curriculum Expert", deliverables: "Curriculum matrix, grade progression, competencies map." },
  { agent: "Agent 3", role: "Numeracy Research Team", deliverables: "Evidence report, reference library, pedagogical recommendations." },
  { agent: "Agent 4", role: "Micro-Skills Architect", deliverables: "500+ micro-skills taxonomy." },
  { agent: "Agent 5", role: "National Error Library Team", deliverables: "1,000-error library." },
  { agent: "Agent 6", role: "Learning Profile Team", deliverables: "100 learner profiles." },
  { agent: "Agent 7", role: "Adaptive Curriculum Team", deliverables: "Adaptive engine logic and personalized curriculum generation." },
];

export default function Research() {
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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 30%, oklch(0.72 0.16 75 / 0.15) 0%, transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.28 0.08 155 / 0.3) 0%, transparent 45%)",
            }}
          />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>
        <div className="container relative z-10">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Sections 5, 19, 21</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Research &<br />Evidence
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            Numbernaut is grounded in peer-reviewed research on numeracy development, mastery learning, CPA methodology, and evidence-based intervention. Every design decision traces back to the literature.
          </p>
        </div>
      </section>

      {/* Multi-Agent Structure */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 5</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">Multi-Agent Organizational Structure</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              The project is organized as a multi-agent system where each agent works independently within a defined scope and has their outputs reviewed by another agent. This structure ensures quality, accountability, and specialization.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist overflow-hidden">
            <div className="grid grid-cols-3 bg-forest text-parchment text-xs font-display font-semibold uppercase tracking-wider">
              <div className="p-4">Agent</div>
              <div className="p-4">Role</div>
              <div className="p-4">Primary Deliverables</div>
            </div>
            {agentDeliverables.map((a, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-mist ${i % 2 === 1 ? "bg-mist/30" : ""}`}>
                <div className="p-4 font-mono text-forest text-sm font-semibold">{a.agent}</div>
                <div className="p-4 font-display font-semibold text-charcoal text-sm">{a.role}</div>
                <div className="p-4 font-body text-charcoal/70 text-sm">{a.deliverables}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation Plan */}
      <section className="py-20 bg-mist">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 19</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">Research Validation Plan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Study Design */}
            <div ref={addReveal} className="reveal">
              <div className="flex items-center gap-3 mb-6">
                <FlaskConical size={20} className="text-forest" />
                <h3 className="font-display font-bold text-charcoal text-xl">Study Design</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Design", value: "Quasi-experimental" },
                  { label: "Intervention Group", value: "Students using Numbernaut for 12 weeks." },
                  { label: "Control Group", value: "Students receiving standard classroom instruction." },
                  { label: "Sample Size", value: "Minimum 200 students across 3 provinces." },
                  { label: "Duration", value: "12 weeks of intervention." },
                  { label: "Measures", value: "Pre- and post-assessments using validated numeracy assessments (KeyMath-3, Number Sense Screener)." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="font-display font-semibold text-charcoal/50 text-sm w-36 flex-shrink-0">{item.label}</span>
                    <span className="font-body text-charcoal/70 text-sm leading-relaxed">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Objectives */}
            <div ref={addReveal} className="reveal delay-200">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={20} className="text-forest" />
                <h3 className="font-display font-bold text-charcoal text-xl">Validation Objectives</h3>
              </div>
              <div className="space-y-3">
                {validationObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-forest text-parchment font-display font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="font-body text-charcoal/70 text-sm leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outcome Measures Table */}
          <div ref={addReveal} className="reveal mt-10">
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-forest" />
              <h3 className="font-display font-bold text-charcoal text-xl">Key Outcome Measures</h3>
            </div>
            <div className="bg-white rounded-xl border border-mist overflow-hidden">
              <div className="grid grid-cols-3 bg-forest text-parchment text-xs font-display font-semibold uppercase tracking-wider">
                <div className="p-4">Measure</div>
                <div className="p-4">Instrument</div>
                <div className="p-4">Timing</div>
              </div>
              {outcomeMeasures.map((m, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-mist ${i % 2 === 1 ? "bg-mist/30" : ""}`}>
                  <div className="p-4 font-display font-semibold text-charcoal text-sm">{m.measure}</div>
                  <div className="p-4 font-body text-charcoal/70 text-sm">{m.instrument}</div>
                  <div className="p-4 font-mono text-forest-mid text-xs">{m.timing}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} className="text-forest" />
              <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest">Section 21</span>
            </div>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl">References</h2>
          </div>

          <div className="space-y-4">
            {references.map((ref, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${Math.min(i * 40, 400)} flex items-start gap-4 bg-white rounded-xl border border-mist p-5`}>
                <span className="font-mono text-forest text-sm font-semibold w-6 flex-shrink-0">[{ref.num}]</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{ref.citation}</p>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-forest text-xs font-display font-medium mt-1.5 hover:text-forest-mid transition-colors"
                    >
                      View source <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
