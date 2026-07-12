/**
 * Platform Architecture Page — Numbernaut
 * 9 modules, adaptive engine, database schema, gamification
 */
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Database, Cpu, BookOpen, BarChart3, Users, Gamepad2, Settings, FileText, Brain } from "lucide-react";

const modules = [
  { icon: <Users size={20} />, name: "Student App", desc: "Personalized dashboard, CPA-sequenced activities, gamification elements, daily challenges, and progress journal.", tag: "Student-Facing" },
  { icon: <BarChart3 size={20} />, name: "Teacher Dashboard", desc: "Micro-skill level diagnostics, learner profiles with explanations, automated recommendations, and future risk flags.", tag: "Teacher-Facing" },
  { icon: <Users size={20} />, name: "Parent Dashboard", desc: "Weekly progress summaries, mastery milestones, engagement metrics, and at-home support suggestions.", tag: "Parent-Facing" },
  { icon: <Brain size={20} />, name: "Assessment Engine", desc: "Diagnostic, formative, mastery, and retention assessments embedded throughout the learning experience.", tag: "Core Engine" },
  { icon: <Cpu size={20} />, name: "Mastery Engine", desc: "Processes accuracy and confidence data, applies four-condition mastery rules, triggers advancement or remediation.", tag: "Core Engine" },
  { icon: <Brain size={20} />, name: "Diagnostic Engine", desc: "Matches observed errors to the Error Library, builds student error profiles, generates diagnostic reports.", tag: "Core Engine" },
  { icon: <Settings size={20} />, name: "Recommendation Engine", desc: "Selects next micro-skills, recommends activities from the Exercise Library, generates intervention suggestions.", tag: "Core Engine" },
  { icon: <FileText size={20} />, name: "Reporting Engine", desc: "Student, class, and school-level reports. Export capabilities for offline use (PDF, CSV).", tag: "Reporting" },
  { icon: <BookOpen size={20} />, name: "Content Management System", desc: "Manages exercise library, micro-skills taxonomy, error library, and curriculum templates.", tag: "Admin" },
];

const engineSteps = [
  { step: "Observe", desc: "Collects data from every student interaction: answers, response time, error patterns, confidence." },
  { step: "Diagnose", desc: "Analyzes observations against the Error Library and Micro-Skills Taxonomy to identify gaps." },
  { step: "Create Profile", desc: "Matches diagnosed patterns to Learner Profiles, creating a composite profile." },
  { step: "Generate Curriculum", desc: "Selects next micro-skills, activities, and sequences them via CPA progression." },
  { step: "Teach", desc: "The Student App presents personalized lessons and activities." },
  { step: "Assess", desc: "Collects new evidence for the Mastery Engine and Confidence Model." },
  { step: "Adjust", desc: "Modifies difficulty, representation, or strategy based on progress." },
  { step: "Mastery", desc: "Cycle continues with spaced repetition until all four mastery conditions are met." },
];

const dbTables = [
  { name: "Students", desc: "Student records, grade, class assignment, date of birth." },
  { name: "Classes", desc: "Class records, teacher assignment, grade, school year." },
  { name: "Teachers", desc: "Teacher profiles, email, school association." },
  { name: "MicroSkills", desc: "Full taxonomy with prerequisites, domain, difficulty, CPA level." },
  { name: "Exercises", desc: "Exercise library with question type, difficulty, CPA level, distractors." },
  { name: "Activities", desc: "Activity library linked to micro-skills with duration and type." },
  { name: "Sessions", desc: "Student session records with start/end times and activity counts." },
  { name: "Assessments", desc: "Individual assessment records with score, response time, CPA level." },
  { name: "MasteryEvidence", desc: "Accumulated mastery evidence per student per skill." },
  { name: "ConfidenceEvidence", desc: "Observation counts and confidence levels per skill." },
  { name: "ProgressHistory", desc: "Event log of mastery, regression, and skill start events." },
  { name: "Curricula", desc: "Generated curriculum sequences per student." },
  { name: "Recommendations", desc: "Skill, activity, and intervention recommendations with priority." },
  { name: "Achievements", desc: "Badges, certificates, and treasures earned by students." },
  { name: "Reports", desc: "Generated reports for students, classes, and schools." },
];

const tagColors: Record<string, string> = {
  "Student-Facing": "bg-forest/10 text-forest border-forest/20",
  "Teacher-Facing": "bg-amber/10 text-amber border-amber/20",
  "Parent-Facing": "bg-blue-50 text-blue-700 border-blue-200",
  "Core Engine": "bg-charcoal/10 text-charcoal border-charcoal/20",
  "Reporting": "bg-forest-mid/10 text-forest-mid border-forest-mid/20",
  "Admin": "bg-mist text-charcoal/60 border-mist",
};

export default function Platform() {
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
      <section className="pt-32 pb-16 bg-charcoal">
        <div className="container">
          <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">Sections 9, 12, 13</span>
          <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl leading-tight mb-6">
            Platform<br />Architecture
          </h1>
          <p className="font-body text-parchment/70 text-xl leading-relaxed max-w-2xl">
            9 application modules, an offline-first SQLite database, and a rule-based adaptive curriculum engine — all operating without any internet connection or AI service.
          </p>
        </div>
      </section>

      {/* Application Modules */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 12</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl">9 Application Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${Math.min(i * 60, 400)} bg-white rounded-xl border border-mist p-6 card-hover`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center flex-shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-display font-semibold px-2 py-0.5 rounded-full border ${tagColors[m.tag]}`}>{m.tag}</span>
                    <h3 className="font-display font-bold text-charcoal text-sm mt-1">{m.name}</h3>
                  </div>
                </div>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive Engine */}
      <section className="py-20 bg-mist">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 9 — Agent 7</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">Adaptive Curriculum Engine</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              A rule-based, deterministic system that operates entirely offline without requiring any AI service. It continuously processes student interaction data to generate personalized learning pathways.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {engineSteps.map((s, i) => (
                <div key={i} ref={addReveal} className={`reveal delay-${Math.min(i * 60, 400)} bg-white rounded-xl border border-mist p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-forest text-parchment font-display font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-bold text-charcoal text-sm">{s.step}</h3>
                  </div>
                  <p className="font-body text-charcoal/60 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Rules */}
          <div ref={addReveal} className="reveal mt-10">
            <h3 className="font-display font-bold text-charcoal text-xl mb-6">6 Curriculum Generation Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { rule: "Prerequisite Enforcement", desc: "A skill is never introduced until all prerequisite skills are mastered." },
                { rule: "CPA Sequencing", desc: "Every new skill is introduced at the Concrete level before progressing to Pictorial and Abstract." },
                { rule: "Error-Driven Remediation", desc: "When a specific error is detected with sufficient confidence, a targeted remediation sequence is inserted." },
                { rule: "Spaced Repetition", desc: "Mastered skills are periodically reviewed using a spaced repetition schedule to ensure retention." },
                { rule: "Confidence Gating", desc: "The system does not advance a student until the confidence threshold is met, not just the accuracy threshold." },
                { rule: "Engagement Balancing", desc: "The engine balances challenging new content with consolidation of recent learning to maintain engagement." },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-mist p-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-sm mb-1">{r.rule}</h4>
                    <p className="font-body text-charcoal/60 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Database */}
      <section className="py-20 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Section 13</span>
            <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">Offline-First Database Architecture</h2>
            <p className="font-body text-charcoal/70 text-lg leading-relaxed max-w-3xl">
              The database is designed for offline-first operation using <strong className="text-charcoal">SQLite</strong>. All data is stored locally on the device. The schema is normalized for efficiency and supports the full range of diagnostic and adaptive functions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dbTables.map((t, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${Math.min(i * 40, 400)} flex items-start gap-3 bg-white rounded-lg border border-mist p-4`}>
                <Database size={14} className="text-forest mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-mono text-forest text-xs font-semibold">{t.name}</span>
                  <p className="font-body text-charcoal/60 text-xs leading-relaxed mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-20 bg-forest text-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-12">
            <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-3 block">Section 11</span>
            <h2 className="font-display font-bold text-parchment text-3xl md:text-4xl mb-4">Gamification System</h2>
            <p className="font-body text-parchment/70 text-lg leading-relaxed max-w-3xl">
              The child becomes an explorer in the <strong className="text-amber">World of Numbers</strong>. Each mastered skill restores a part of the world. The learner progresses toward becoming the Guardian of Numbers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { el: "World Map", desc: "Visual map unlocked by mastery" },
              { el: "Missions", desc: "Narrative multi-skill quests" },
              { el: "Badges", desc: "Achievement markers" },
              { el: "Avatars", desc: "Customizable characters" },
              { el: "Certificates", desc: "Formal mastery recognition" },
            ].map((g, i) => (
              <div key={i} ref={addReveal} className={`reveal delay-${i * 80 + 100} bg-white/10 border border-white/20 rounded-xl p-4 text-center`}>
                <Gamepad2 size={20} className="text-amber mx-auto mb-2" />
                <div className="font-display font-bold text-parchment text-sm">{g.el}</div>
                <div className="font-body text-parchment/50 text-xs mt-1">{g.desc}</div>
              </div>
            ))}
          </div>

          <div ref={addReveal} className="reveal bg-white/10 border border-white/20 rounded-2xl p-6">
            <h3 className="font-display font-bold text-amber text-lg mb-4">Reward Philosophy</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { reward: "Effort", desc: "Points for attempting tasks, not just correct answers." },
                { reward: "Perseverance", desc: "Special recognition for continuing after difficulty." },
                { reward: "Improvement", desc: "Rewards for measurable progress over time." },
                { reward: "Mastery", desc: "Highest-tier rewards for genuine, demonstrated mastery." },
              ].map((r, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-bold text-amber text-base mb-1">{r.reward}</div>
                  <div className="font-body text-parchment/60 text-xs leading-relaxed">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
