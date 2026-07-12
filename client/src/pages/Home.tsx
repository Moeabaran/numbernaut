/**
 * Home Page — Numbernaut
 * Northern Expedition design
 * Sections: Hero, Vision, Core Principles, Platform Overview, Curriculum, CTA
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Brain, MapPin, Shield, Zap, Users, BarChart3, Compass, GraduationCap, Star, Stethoscope, Map } from "lucide-react";

const principles = [
  { icon: <Shield size={20} />, title: "Fully Offline", desc: "No internet required. All student data stored locally. Works in any classroom, anywhere in Canada." },
  { icon: <Brain size={20} />, title: "Scientifically Grounded", desc: "Built on CPA methodology, mastery learning theory, and evidence-based intervention research." },
  { icon: <Zap size={20} />, title: "Explainable Diagnostics", desc: "Teachers always understand why the system makes recommendations. No black boxes." },
  { icon: <MapPin size={20} />, title: "Canadian Curriculum", desc: "Mapped against all 13 provincial and territorial curricula. Built specifically for Canada." },
  { icon: <Users size={20} />, title: "Every Learner", desc: "100 learner profiles. 500+ micro-skills. No two students experience the same pathway." },
  { icon: <BarChart3 size={20} />, title: "Intervention-Grade Depth", desc: "Not a supplement. A full numeracy remediation system with diagnostic precision." },
];

const stats = [
  { value: "500+", label: "Micro-Skills", sub: "Across 6 domains" },
  { value: "1,000", label: "Error Entries", sub: "National Error Library" },
  { value: "100", label: "Learner Profiles", sub: "Personalized pathways" },
  { value: "13", label: "Provinces & Territories", sub: "Full curriculum alignment" },
];

const sections = [
  { href: "/pedagogy", icon: <BookOpen size={18} />, title: "Pedagogical Philosophy", desc: "CPA framework, Instructional Hierarchy, and the science behind every design decision." },
  { href: "/taxonomy", icon: <Compass size={18} />, title: "Micro-Skills Taxonomy", desc: "500+ individually specified skills across 6 mathematical domains, from counting to algebra." },
  { href: "/error-library", icon: <Brain size={18} />, title: "National Error Library", desc: "1,000 common errors with probable causes, severity ratings, and remediation strategies." },
  { href: "/profiles", icon: <Users size={18} />, title: "Learner Profiles", desc: "100 distinct profiles capturing every pattern of mathematical strength and difficulty." },
  { href: "/platform", icon: <Zap size={18} />, title: "Platform Architecture", desc: "9 application modules, offline SQLite database, and the adaptive curriculum engine." },
  { href: "/roadmap", icon: <BarChart3 size={18} />, title: "Development Roadmap", desc: "5 phases over 36 months from foundation to commercial launch." },
];

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 25%, oklch(0.72 0.16 75 / 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 75%, oklch(0.72 0.16 75 / 0.12) 0%, transparent 40%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
        </div>

        <div className="container relative z-10 pt-24 pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 text-amber text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              Master Planning Document v1.0 — June 2026
            </div>

            <h1 className="font-display font-bold text-parchment text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 animate-fade-up delay-100">
              Every child has a<br />
              <span className="text-amber">mathematical</span><br />
              profile.
            </h1>

            <p className="font-body text-parchment/80 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up delay-200">
              Numbernaut is the world's first fully offline numeracy mastery and remediation platform for elementary school students — scientifically grounded, explainable, and built for every Canadian classroom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center gap-2 bg-amber text-charcoal font-display font-semibold px-6 py-3 rounded-md hover:bg-amber-light transition-colors active:scale-95 text-sm"
              >
                Explore the Platform <ArrowRight size={16} />
              </Link>
              <Link
                href="/pedagogy"
                className="inline-flex items-center justify-center gap-2 border border-parchment/30 text-parchment font-display font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors text-sm"
              >
                Read the Pedagogy
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-parchment/40 animate-fade-up delay-600">
          <span className="text-xs font-display tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-parchment/40 to-transparent" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-forest-mid py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-bold text-amber text-3xl md:text-4xl">{s.value}</div>
                <div className="font-display font-semibold text-parchment text-sm mt-1">{s.label}</div>
                <div className="font-body text-parchment/50 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-24 bg-parchment">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={addReveal} className="reveal">
              <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Vision & Mission</span>
              <h2 className="font-display font-bold text-charcoal text-4xl md:text-5xl leading-tight mb-6">
                Not a game.<br />
                <span className="text-forest">An intervention system.</span>
              </h2>
              <p className="font-body text-charcoal/70 text-lg leading-relaxed mb-6">
                Numbernaut is a numeracy intervention system — a scientifically grounded, commercially viable platform designed to reduce math failure, improve student confidence, and provide every child with a personalized path toward mathematical mastery.
              </p>
              <blockquote className="border-l-4 border-amber pl-5 py-2 my-6">
                <p className="font-body italic text-charcoal/80 text-base leading-relaxed">
                  "Build this project as if it could become the reference platform for numeracy intervention in elementary education."
                </p>
              </blockquote>
              <p className="font-body text-charcoal/70 text-base leading-relaxed">
                The platform is built on the recognition that every child possesses a unique cognitive profile, mastery profile, error profile, and personalized curriculum. After initial onboarding, no two students will experience the same application pathway.
              </p>
            </div>

            <div ref={addReveal} className="reveal delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-forest/20 h-80 bg-forest">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, oklch(0.72 0.16 75 / 0.25) 0%, transparent 50%), radial-gradient(circle at 75% 65%, oklch(0.93 0.01 155 / 0.15) 0%, transparent 45%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent flex items-end p-6">
                  <div>
                    <div className="font-display font-bold text-parchment text-xl mb-1">13 Jurisdictions</div>
                    <div className="font-body text-parchment/70 text-sm">Aligned with every provincial and territorial mathematics curriculum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section className="py-24 bg-mist">
        <div className="container">
          <div ref={addReveal} className="reveal text-center mb-14">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Core Principles</span>
            <h2 className="font-display font-bold text-charcoal text-4xl md:text-5xl leading-tight">
              Built on 10 non-negotiable principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div
                key={i}
                ref={addReveal}
                className={`reveal delay-${(i % 3) * 100 + 100} bg-white rounded-xl p-6 border border-mist card-hover`}
              >
                <div className="w-10 h-10 rounded-lg bg-forest/10 text-forest flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-display font-semibold text-charcoal text-base mb-2">{p.title}</h3>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORE SECTIONS ── */}
      <section className="py-24 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal mb-14">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Explore the Platform</span>
            <h2 className="font-display font-bold text-charcoal text-4xl md:text-5xl leading-tight max-w-xl">
              Every section, fully documented
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`group block bg-white rounded-xl p-6 border border-mist card-hover reveal delay-${(i % 3) * 100 + 100}`}
                ref={addReveal}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-parchment transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-sm">{s.title}</h3>
                </div>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-forest text-xs font-display font-semibold group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORYTELLING TEASER ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-forest">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, oklch(0.72 0.16 75 / 0.15) 0%, transparent 45%), radial-gradient(circle at 70% 80%, oklch(0.72 0.16 75 / 0.1) 0%, transparent 40%)",
            }}
          />
          <div className="absolute inset-0 bg-forest/90" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-display font-semibold text-amber text-xs uppercase tracking-widest mb-4 block">The World of Numbers</span>
            <h2 className="font-display font-bold text-parchment text-4xl md:text-5xl leading-tight mb-6">
              Every child becomes an explorer
            </h2>
            <p className="font-body text-parchment/70 text-lg leading-relaxed mb-8">
              The child enters the World of Numbers — a land where mathematical balance has been disrupted. Each mastered skill restores a region. The ultimate goal: becoming the <strong className="text-amber font-semibold">Guardian of Numbers</strong>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {[
                { region: "The Counting Isles", domain: "Counting & Cardinality" },
                { region: "The Number Forest", domain: "Number Sense & Place Value" },
                { region: "The Addition Peaks", domain: "Addition & Subtraction" },
                { region: "The Fraction Seas", domain: "Fractions & Decimals" },
              ].map((r, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="font-display font-semibold text-amber text-sm mb-1">{r.region}</div>
                  <div className="font-body text-parchment/60 text-xs">{r.domain}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT INTERFACES ── */}
      <section className="py-24 bg-parchment">
        <div className="container">
          <div ref={addReveal} className="reveal text-center mb-14">
            <span className="font-display font-semibold text-forest-light text-xs uppercase tracking-widest mb-3 block">Le Produit</span>
            <h2 className="font-display font-bold text-charcoal text-4xl md:text-5xl leading-tight">
              Trois interfaces. Un seul objectif.
            </h2>
            <p className="font-body text-charcoal/60 text-lg mt-4 max-w-2xl mx-auto">
              Numbernaut est une suite logicielle complète — chaque interface conçue pour son utilisateur, toutes alimentées par les mêmes données scientifiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { href: "/app/student", icon: <Star size={22} />, color: "bg-amber/10 text-amber border-amber/20", title: "Application Élève", sub: "Maternelle – 6e année", desc: "Monde narratif gamifié, exercices adaptatifs, progression par micro-compétences. L'apprentissage comme une aventure.", cta: "Voir l'application" },
              { href: "/app/teacher", icon: <GraduationCap size={22} />, color: "bg-forest/10 text-forest border-forest/20", title: "Tableau de bord Enseignant", sub: "Diagnostic & Intervention", desc: "Vue complète de la classe, profils individuels, bibliothèque d'erreurs, recommandations automatiques basées sur les preuves.", cta: "Voir le tableau de bord" },
              { href: "/app/parent", icon: <Users size={22} />, color: "bg-blue-500/10 text-blue-700 border-blue-200", title: "Espace Parents", sub: "Résumés & Conseils", desc: "Résumés hebdomadaires, jalons de maîtrise, conseils pratiques pour soutenir l'apprentissage à la maison.", cta: "Voir l'espace parents" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className={`group block bg-white rounded-2xl p-6 border card-hover reveal delay-${i * 100 + 100} shadow-sm`} ref={addReveal}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}>{item.icon}</div>
                <div className="font-display font-bold text-charcoal text-lg mb-0.5">{item.title}</div>
                <div className="font-body text-forest-light text-xs font-semibold mb-3">{item.sub}</div>
                <p className="font-body text-charcoal/60 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-1 text-forest text-xs font-display font-semibold group-hover:gap-2 transition-all">{item.cta} <ArrowRight size={12} /></div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/app/diagnostic", icon: <Stethoscope size={16} />, title: "Outil de diagnostic", desc: "Évaluation rapide en 10 questions — identifie les lacunes et génère un profil d'apprenant automatiquement." },
              { href: "/app/skills", icon: <BookOpen size={16} />, title: "Explorateur de compétences", desc: "Naviguez les 500+ micro-compétences avec graphe de prérequis interactif." },
              { href: "/app/curriculum", icon: <Map size={16} />, title: "Carte curriculaire", desc: "Alignement avec les curricula de l'Ontario, Colombie-Britannique, Alberta et Québec." },
            ].map((tool, i) => (
              <Link key={i} href={tool.href} className="group flex items-start gap-3 bg-mist rounded-xl p-4 border border-mist hover:border-forest/30 hover:bg-white transition-all reveal" ref={addReveal}>
                <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 group-hover:bg-forest group-hover:text-parchment transition-colors">{tool.icon}</div>
                <div>
                  <div className="font-display font-semibold text-charcoal text-sm">{tool.title}</div>
                  <div className="font-body text-charcoal/60 text-xs mt-0.5 leading-relaxed">{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-amber-light">
        <div className="container text-center">
          <h2 className="font-display font-bold text-charcoal text-3xl md:text-4xl mb-4">
            Ready to transform numeracy in your school?
          </h2>
          <p className="font-body text-charcoal/70 text-lg mb-8 max-w-xl mx-auto">
            We are currently seeking pilot school partners across Canada for Phase 4 of our development roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-forest text-parchment font-display font-semibold px-8 py-3 rounded-md hover:bg-forest-mid transition-colors text-sm"
            >
              Request a Demo <ArrowRight size={16} />
            </a>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 border border-charcoal/20 text-charcoal font-display font-medium px-8 py-3 rounded-md hover:bg-white/50 transition-colors text-sm"
            >
              View Development Roadmap
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
