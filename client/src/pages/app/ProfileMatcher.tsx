/**
 * Profile Matcher — Numbernaut
 * Browse all 100 learner profiles with filtering and detail view.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Users, Brain, ChevronRight } from "lucide-react";
import learnerProfilesRaw from "@/data/learner_profiles.json";

const learnerProfiles = learnerProfilesRaw as LearnerProfile[];
interface LearnerProfile { id: string; name: string; category: string; prevalence: string; grade_range: string; description: string; cognitive_profile: { strengths: string[]; weaknesses: string[]; working_memory: string; processing_speed: string; visual_spatial: string }; mathematical_profile: { strong_domains: string[]; weak_domains: string[]; error_patterns: string[]; mastery_gaps: string[] }; affective_profile: { math_anxiety: string; confidence: string; motivation: string; persistence: string }; instructional_recommendations: string[]; curriculum_adjustments: string[]; teacher_strategies: string[]; parent_guidance: string; intervention_intensity: string; }

const TIER_CONFIG: Record<string, string> = { Tier1: "bg-green-50 text-green-700 border-green-200", Tier2: "bg-amber-50 text-amber-700 border-amber-200", Tier3: "bg-red-50 text-red-700 border-red-200" };
const PREV_CONFIG: Record<string, string> = { "Very Common": "bg-blue-50 text-blue-700", "Common": "bg-[oklch(0.28_0.08_155)]/8 text-[oklch(0.28_0.08_155)]", "Moderate": "bg-purple-50 text-purple-700", "Rare": "bg-gray-50 text-gray-700" };

export default function ProfileMatcher() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tier, setTier] = useState("all");
  const [selected, setSelected] = useState<LearnerProfile | null>(null);

  const categories = Array.from(new Set(learnerProfiles.map(p => p.category)));
  const filtered = learnerProfiles.filter(p => {
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const mc = category === "all" || p.category === category;
    const mt = tier === "all" || p.intervention_intensity === tier;
    return ms && mc && mt;
  });

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg px-5 py-3 flex items-center gap-3">
        <Link href="/app/teacher"><button className="p-1.5 rounded-lg hover:bg-white/10"><ArrowLeft size={16} /></button></Link>
        <div>
          <div className="font-display font-bold text-sm">Profils d'apprenants</div>
          <div className="text-[oklch(0.72_0.14_75)] text-xs">{learnerProfiles.length} profils documentés</div>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-96 border-r border-[oklch(0.88_0.01_80)] bg-white`}>
          <div className="p-3 border-b border-[oklch(0.88_0.01_80)] space-y-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.50_0.01_260)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un profil..." className="w-full pl-8 pr-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none" />
            </div>
            <div className="flex gap-2">
              <select value={tier} onChange={e => setTier(e.target.value)} className="flex-1 px-2 py-1.5 text-xs border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                <option value="all">Tous niveaux</option>
                <option value="Tier1">Tier 1</option>
                <option value="Tier2">Tier 2</option>
                <option value="Tier3">Tier 3</option>
              </select>
              <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 px-2 py-1.5 text-xs border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                <option value="all">Toutes catégories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <p className="text-xs text-[oklch(0.50_0.01_260)] font-body">{filtered.length} profil(s)</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[oklch(0.92_0.004_80)]">
            {filtered.map(profile => (
              <button key={profile.id} onClick={() => setSelected(profile)}
                className={`w-full text-left p-3 hover:bg-[oklch(0.97_0.015_80)] transition-colors ${selected?.id === profile.id ? "bg-[oklch(0.28_0.08_155)]/8 border-l-2 border-[oklch(0.28_0.08_155)]" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[oklch(0.50_0.01_260)]">{profile.id}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded border font-display font-medium ${TIER_CONFIG[profile.intervention_intensity] || ""}`}>{profile.intervention_intensity}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-display font-medium ${PREV_CONFIG[profile.prevalence] || ""}`}>{profile.prevalence}</span>
                </div>
                <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs leading-tight">{profile.name}</p>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5">Gr. {profile.grade_range} · {profile.category}</p>
              </button>
            ))}
          </div>
        </div>
        <div className={`${selected ? "flex" : "hidden md:flex"} flex-1 flex-col overflow-y-auto`}>
          {!selected ? (
            <div className="h-full flex items-center justify-center text-center p-5">
              <div>
                <Users size={40} className="mx-auto mb-3 text-[oklch(0.50_0.01_260)]" />
                <p className="font-display font-semibold text-[oklch(0.22_0.01_260)]">Sélectionnez un profil</p>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mt-1">Cliquez sur un profil pour voir ses détails complets.</p>
              </div>
            </div>
          ) : (
            <div className="p-5 space-y-4 max-w-2xl">
              <button onClick={() => setSelected(null)} className="md:hidden flex items-center gap-1 text-sm text-[oklch(0.35_0.09_155)] font-display font-medium hover:underline mb-2">
                <ArrowLeft size={14} /> Retour
              </button>
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm text-[oklch(0.50_0.01_260)]">{selected.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border font-display font-medium ${TIER_CONFIG[selected.intervention_intensity] || ""}`}>{selected.intervention_intensity}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-display font-medium ${PREV_CONFIG[selected.prevalence] || ""}`}>{selected.prevalence}</span>
                </div>
                <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl mb-1">{selected.name}</h2>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mb-3">Gr. {selected.grade_range} · {selected.category}</p>
                <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{selected.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-2 flex items-center gap-1"><Brain size={13} /> Profil cognitif</h3>
                  {[["Mémoire de travail", selected.cognitive_profile.working_memory], ["Vitesse de traitement", selected.cognitive_profile.processing_speed], ["Spatial-visuel", selected.cognitive_profile.visual_spatial]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                      <span className="font-body text-[oklch(0.50_0.01_260)]">{k}</span>
                      <span className={`font-display font-semibold ${v === "High" || v === "Strong" || v === "Fast" ? "text-[oklch(0.35_0.09_155)]" : v === "Low" || v === "Weak" || v === "Slow" ? "text-red-600" : "text-amber-600"}`}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-2">Profil affectif</h3>
                  {[["Anxiété math.", selected.affective_profile.math_anxiety], ["Confiance", selected.affective_profile.confidence], ["Motivation", selected.affective_profile.motivation], ["Persévérance", selected.affective_profile.persistence]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                      <span className="font-body text-[oklch(0.50_0.01_260)]">{k}</span>
                      <span className="font-display font-semibold text-[oklch(0.22_0.01_260)]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Stratégies pour l'enseignant(e)</h3>
                {selected.teacher_strategies.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 py-1.5 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.28_0.08_155)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                    <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[oklch(0.72_0.14_75)]/10 rounded-xl border border-[oklch(0.72_0.14_75)]/20 p-4">
                <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-2">Message pour les parents</h3>
                <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed italic">{selected.parent_guidance}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
