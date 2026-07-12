/**
 * Parent Dashboard — Numbernaut
 * A warm, accessible weekly summary for parents.
 */
import { useState } from "react";
import { Link } from "wouter";
import { TrendingUp, Star, Flame, BookOpen, MessageCircle, ChevronRight, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import learnerProfilesRaw from "@/data/learner_profiles.json";

const learnerProfiles = learnerProfilesRaw as LearnerProfile[];
interface LearnerProfile {
  id: string; name: string; description: string;
  cognitive_profile: { strengths: string[]; weaknesses: string[] };
  instructional_recommendations: string[];
  parent_guidance: string;
  affective_profile: { math_anxiety: string; confidence: string; motivation: string };
}

const CHILD = { name: "Emma Tremblay", grade: "3", school: "École Sainte-Marie", teacher: "Mme Leclerc", profile: "P003" };
const WEEKLY = { xpEarned: 120, skillsMastered: 3, streak: 8, sessionsCompleted: 5, totalMinutes: 47 };

export default function ParentDashboard() {
  const [tab, setTab] = useState<"summary" | "skills" | "tips">("summary");
  const profile = learnerProfiles.find(p => p.id === CHILD.profile);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <Link href="/"><button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ArrowLeft size={16} /></button></Link>
            <div>
              <div className="font-display font-bold text-sm">Numbernaut</div>
              <div className="text-[oklch(0.72_0.14_75)] text-xs">Espace parents</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
            <div className="w-7 h-7 rounded-full bg-[oklch(0.72_0.14_75)] flex items-center justify-center text-[oklch(0.22_0.01_260)] font-bold text-xs">ET</div>
            <span className="text-sm font-body">Parent de {CHILD.name.split(" ")[0]}</span>
          </div>
        </div>
        <div className="flex px-5 gap-1 border-t border-white/10">
          {[{ id: "summary", label: "Cette semaine" }, { id: "skills", label: "Compétences" }, { id: "tips", label: "Conseils" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`px-4 py-2.5 text-sm font-display font-medium border-b-2 transition-colors ${tab === t.id ? "border-[oklch(0.72_0.14_75)] text-[oklch(0.72_0.14_75)]" : "border-transparent text-white/60 hover:text-white/90"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-5 max-w-2xl mx-auto w-full space-y-5">
        {/* Child info */}
        <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[oklch(0.28_0.08_155)] flex items-center justify-center text-[oklch(0.97_0.015_80)] font-display font-bold text-xl">
            {CHILD.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-lg">{CHILD.name}</h2>
            <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{CHILD.grade}e année · {CHILD.school}</p>
            <p className="font-body text-[oklch(0.50_0.01_260)] text-xs">Enseignant(e): {CHILD.teacher}</p>
          </div>
        </div>

        {tab === "summary" && (
          <>
            <div className="bg-[oklch(0.28_0.08_155)] rounded-xl p-5 text-[oklch(0.97_0.015_80)]">
              <p className="text-[oklch(0.72_0.14_75)] text-xs font-display font-semibold uppercase tracking-wider mb-1">Résumé de la semaine</p>
              <h3 className="font-display font-bold text-xl mb-4">
                {WEEKLY.skillsMastered > 0 ? `🎉 Emma a maîtrisé ${WEEKLY.skillsMastered} nouvelles compétences !` : "Bonne semaine de pratique !"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "XP gagnés", value: `+${WEEKLY.xpEarned}`, icon: Star },
                  { label: "Série", value: `${WEEKLY.streak} jours`, icon: Flame },
                  { label: "Sessions", value: `${WEEKLY.sessionsCompleted}`, icon: BookOpen },
                  { label: "Temps total", value: `${WEEKLY.totalMinutes} min`, icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3 flex items-center gap-2">
                    <stat.icon size={16} className="text-[oklch(0.72_0.14_75)]" />
                    <div>
                      <div className="font-display font-bold text-sm">{stat.value}</div>
                      <div className="text-white/60 text-xs font-body">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {profile && (
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-2">Profil de votre enfant</h3>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed mb-3">{profile.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Points forts</p>
                    {profile.cognitive_profile.strengths.slice(0, 3).map((s, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-[oklch(0.35_0.09_155)] mb-0.5"><CheckCircle size={10} /> {s}</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">À renforcer</p>
                    {profile.cognitive_profile.weaknesses.slice(0, 3).map((w, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-amber-600 mb-0.5">• {w}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-[oklch(0.72_0.14_75)]/10 rounded-xl p-3 border border-[oklch(0.72_0.14_75)]/20">
                  <p className="text-xs font-display font-semibold text-[oklch(0.22_0.01_260)] mb-1">Message de l'enseignant(e)</p>
                  <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed italic">{profile.parent_guidance}</p>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "skills" && (
          <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
            <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-4">Progression par domaine</h3>
            {[
              { name: "Comptage et cardinalité", pct: 78, mastered: 47, total: 60 },
              { name: "Opérations numériques", pct: 52, mastered: 73, total: 140 },
              { name: "Valeur de position", pct: 61, mastered: 61, total: 100 },
              { name: "Fractions et décimaux", pct: 34, mastered: 34, total: 100 },
              { name: "Mesure et géométrie", pct: 67, mastered: 40, total: 60 },
              { name: "Régularités et algèbre", pct: 45, mastered: 18, total: 40 },
            ].map((domain, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-display font-semibold text-[oklch(0.22_0.01_260)]">{domain.name}</span>
                  <span className={`font-display font-bold ${domain.pct >= 70 ? "text-[oklch(0.35_0.09_155)]" : domain.pct >= 50 ? "text-amber-600" : "text-red-600"}`}>{domain.pct}%</span>
                </div>
                <div className="bg-[oklch(0.92_0.004_80)] rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full transition-all ${domain.pct >= 70 ? "bg-[oklch(0.35_0.09_155)]" : domain.pct >= 50 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${domain.pct}%` }} />
                </div>
                <p className="text-xs text-[oklch(0.50_0.01_260)] mt-0.5 font-body">{domain.mastered} compétences maîtrisées sur {domain.total}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "tips" && profile && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
              <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Conseils pour soutenir Emma à la maison</h3>
              {profile.instructional_recommendations.slice(0, 5).map((rec, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                  <span className="w-6 h-6 rounded-full bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                  <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
            <div className="bg-[oklch(0.28_0.08_155)]/5 rounded-xl border border-[oklch(0.28_0.08_155)]/20 p-4">
              <p className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-2">💬 Contacter l'enseignant(e)</p>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mb-3">Pour discuter du progrès d'Emma ou planifier une rencontre avec {CHILD.teacher}.</p>
              <button className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-lg px-4 py-2 text-sm font-display font-semibold hover:bg-[oklch(0.35_0.09_155)] transition-colors flex items-center gap-2">
                <MessageCircle size={14} /> Envoyer un message
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
