/**
 * Skill Explorer — Numbernaut
 * Interactive prerequisite graph and skill detail explorer.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, ChevronRight, BookOpen, CheckCircle } from "lucide-react";
import microSkillsRaw from "@/data/micro_skills.json";

const microSkills = microSkillsRaw as MicroSkill[];
interface MicroSkill { id: string; domain: string; domain_code: string; name: string; description: string; grade_introduced: string; cpa_level: string; prerequisites: string[]; mastery_criteria: string; assessment_type: string; difficulty: number; }

const DOMAIN_NAMES: Record<string, string> = { A: "Comptage et cardinalité", B: "Opérations numériques", C: "Valeur de position", D: "Fractions et décimaux", E: "Mesure et géométrie", F: "Régularités et algèbre" };
const DOMAIN_COLORS: Record<string, string> = { A: "bg-blue-100 text-blue-800 border-blue-200", B: "bg-purple-100 text-purple-800 border-purple-200", C: "bg-green-100 text-green-800 border-green-200", D: "bg-amber-100 text-amber-800 border-amber-200", E: "bg-rose-100 text-rose-800 border-rose-200", F: "bg-indigo-100 text-indigo-800 border-indigo-200" };

export default function SkillExplorer() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("all");
  const [grade, setGrade] = useState("all");
  const [selected, setSelected] = useState<MicroSkill | null>(null);

  const filtered = microSkills.filter(s => {
    const ms = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const md = domain === "all" || s.domain_code === domain;
    const mg = grade === "all" || s.grade_introduced === grade;
    return ms && md && mg;
  }).slice(0, 60);

  const prereqs = selected ? microSkills.filter(s => selected.prerequisites.includes(s.id)) : [];
  const dependents = selected ? microSkills.filter(s => s.prerequisites.includes(selected.id)).slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg px-5 py-3 flex items-center gap-3">
        <Link href="/app/teacher"><button className="p-1.5 rounded-lg hover:bg-white/10"><ArrowLeft size={16} /></button></Link>
        <div>
          <div className="font-display font-bold text-sm">Explorateur de compétences</div>
          <div className="text-[oklch(0.72_0.14_75)] text-xs">{microSkills.length} micro-compétences · 6 domaines</div>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        {/* List panel */}
        <div className="w-full md:w-96 border-r border-[oklch(0.88_0.01_80)] bg-white flex flex-col">
          <div className="p-3 border-b border-[oklch(0.88_0.01_80)] space-y-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.50_0.01_260)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-8 pr-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none" />
            </div>
            <div className="flex gap-2">
              <select value={domain} onChange={e => setDomain(e.target.value)} className="flex-1 px-2 py-1.5 text-xs border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                <option value="all">Tous domaines</option>
                {["A","B","C","D","E","F"].map(d => <option key={d} value={d}>{d} — {DOMAIN_NAMES[d]?.slice(0,15)}</option>)}
              </select>
              <select value={grade} onChange={e => setGrade(e.target.value)} className="flex-1 px-2 py-1.5 text-xs border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                <option value="all">Tous niveaux</option>
                <option value="K">Maternelle</option>
                {[1,2,3,4,5,6].map(g => <option key={g} value={g.toString()}>{g}e année</option>)}
              </select>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[oklch(0.92_0.004_80)]">
            {filtered.map(skill => (
              <button key={skill.id} onClick={() => setSelected(skill)}
                className={`w-full text-left p-3 hover:bg-[oklch(0.97_0.015_80)] transition-colors ${selected?.id === skill.id ? "bg-[oklch(0.28_0.08_155)]/8 border-l-2 border-[oklch(0.28_0.08_155)]" : ""}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold">{skill.id}</span>
                  <span className={`text-xs px-1 py-0.5 rounded border ${DOMAIN_COLORS[skill.domain_code]}`}>{skill.domain_code}</span>
                  <span className="text-xs text-[oklch(0.50_0.01_260)] font-mono">{skill.grade_introduced === "K" ? "Mat." : `Gr.${skill.grade_introduced}`}</span>
                </div>
                <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs leading-tight">{skill.name}</p>
              </button>
            ))}
          </div>
        </div>
        {/* Detail panel */}
        <div className="flex-1 p-5 overflow-y-auto hidden md:block">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <BookOpen size={40} className="mx-auto mb-3 text-[oklch(0.50_0.01_260)]" />
                <p className="font-display font-semibold text-[oklch(0.22_0.01_260)]">Sélectionnez une compétence</p>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mt-1">Cliquez sur une compétence pour voir ses détails et son graphe de prérequis.</p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl space-y-5">
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm text-[oklch(0.35_0.09_155)] font-bold">{selected.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border font-display font-medium ${DOMAIN_COLORS[selected.domain_code]}`}>{selected.domain}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-display font-medium ${selected.cpa_level === "Concrete" ? "bg-blue-50 text-blue-700" : selected.cpa_level === "Pictorial" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"}`}>{selected.cpa_level}</span>
                </div>
                <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl mb-2">{selected.name}</h2>
                <p className="font-body text-[oklch(0.50_0.01_260)] leading-relaxed mb-3">{selected.description}</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Niveau", value: selected.grade_introduced === "K" ? "Maternelle" : `${selected.grade_introduced}e année` },
                    { label: "Évaluation", value: selected.assessment_type },
                    { label: "Difficulté", value: "★".repeat(selected.difficulty) + "☆".repeat(5 - selected.difficulty) },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[oklch(0.97_0.015_80)] rounded-lg p-2 border border-[oklch(0.88_0.01_80)]">
                      <div className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">{stat.value}</div>
                      <div className="font-body text-[oklch(0.50_0.01_260)] text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-[oklch(0.28_0.08_155)]/5 rounded-lg border border-[oklch(0.28_0.08_155)]/15">
                  <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Critère de maîtrise</p>
                  <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed">{selected.mastery_criteria}</p>
                </div>
              </div>
              {prereqs.length > 0 && (
                <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Prérequis ({prereqs.length})</h3>
                  <div className="space-y-2">
                    {prereqs.map(p => (
                      <button key={p.id} onClick={() => setSelected(p)} className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.01_80)] transition-colors">
                        <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold w-12">{p.id}</span>
                        <span className="font-body text-[oklch(0.22_0.01_260)] text-xs flex-1">{p.name}</span>
                        <ChevronRight size={12} className="text-[oklch(0.50_0.01_260)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {dependents.length > 0 && (
                <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Compétences suivantes ({dependents.length})</h3>
                  <div className="space-y-2">
                    {dependents.map(d => (
                      <button key={d.id} onClick={() => setSelected(d)} className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.01_80)] transition-colors">
                        <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold w-12">{d.id}</span>
                        <span className="font-body text-[oklch(0.22_0.01_260)] text-xs flex-1">{d.name}</span>
                        <ChevronRight size={12} className="text-[oklch(0.50_0.01_260)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
