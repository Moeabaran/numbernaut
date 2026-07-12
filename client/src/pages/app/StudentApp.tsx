/**
 * Student App — Numbernaut
 * The gamified learning interface for K-6 students.
 * Northern Expedition design — warm, encouraging, adventure-themed.
 */
import { useState } from "react";
import { Link } from "wouter";
import { Star, Flame, Shield, Map, BookOpen, Trophy, ChevronRight, ArrowLeft, CheckCircle, XCircle, Lightbulb, Home } from "lucide-react";
import microSkillsRaw from "@/data/micro_skills.json";
import adaptiveEngineRaw from "@/data/adaptive_engine.json";

const microSkills = microSkillsRaw as MicroSkill[];
const adaptiveEngine = adaptiveEngineRaw as AdaptiveEngine;

interface MicroSkill {
  id: string; domain: string; domain_code: string; name: string;
  description: string; grade_introduced: string; cpa_level: string;
  prerequisites: string[]; mastery_criteria: string; assessment_type: string;
  difficulty: number;
}
interface AdaptiveEngine {
  gamification: {
    narrative: { world_name: string; premise: string; protagonist: string; regions: Region[] };
    progression_system: { levels: Level[]; badges: Badge[] };
    daily_system: { daily_challenge: string; streak_rewards: { days: number; reward: string }[] };
  };
}
interface Region { id: string; name: string; mathematical_domain: string; description: string; unlock_condition: string; boss_challenge: string; }
interface Level { level: number; title: string; xp_required: number; unlock: string; }
interface Badge { id: string; name: string; description: string; trigger: string; rarity: string; }

const STUDENT = { name: "Emma", grade: "3", xp: 340, level: 4, streak: 8, masteredSkills: 47, totalSkills: 80, badges: 3 };

const DEMO_QUESTIONS = [
  { id: 1, skill: "M061", question: "Combien font 7 + 8 ?", options: ["13", "14", "15", "16"], correct: 2, hint: "Essaie de décomposer 8 en 3 + 5, puis additionne 7 + 3 d'abord." },
  { id: 2, skill: "M062", question: "Quel est le résultat de 15 − 6 ?", options: ["7", "8", "9", "10"], correct: 2, hint: "Compte à rebours depuis 15 : 14, 13, 12, 11, 10, 9." },
  { id: 3, skill: "M201", question: "Quel chiffre est dans la position des dizaines dans 47 ?", options: ["4", "7", "40", "47"], correct: 0, hint: "Dans 47, le chiffre 4 représente 4 dizaines, soit 40." },
  { id: 4, skill: "M063", question: "Combien font 6 × 3 ?", options: ["15", "16", "18", "21"], correct: 2, hint: "6 × 3 = 6 + 6 + 6 = 18." },
  { id: 5, skill: "M202", question: "Quel nombre vient après 199 ?", options: ["200", "190", "210", "201"], correct: 0, hint: "Après 199, on change les dizaines et les centaines : 200." },
];

const DOMAIN_REGIONS: Record<string, { color: string; emoji: string; bg: string }> = {
  A: { color: "text-blue-700", emoji: "🏔️", bg: "bg-blue-50 border-blue-200" },
  B: { color: "text-purple-700", emoji: "⚔️", bg: "bg-purple-50 border-purple-200" },
  C: { color: "text-green-700", emoji: "🌲", bg: "bg-green-50 border-green-200" },
  D: { color: "text-amber-700", emoji: "🍂", bg: "bg-amber-50 border-amber-200" },
  E: { color: "text-rose-700", emoji: "🌊", bg: "bg-rose-50 border-rose-200" },
  F: { color: "text-indigo-700", emoji: "⭐", bg: "bg-indigo-50 border-indigo-200" },
};

export default function StudentApp() {
  const [screen, setScreen] = useState<"home" | "map" | "practice" | "result">("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const regions = adaptiveEngine.gamification?.narrative?.regions || [];
  const levels = adaptiveEngine.gamification?.progression_system?.levels || [];
  const badges = adaptiveEngine.gamification?.progression_system?.badges || [];
  const worldName = adaptiveEngine.gamification?.narrative?.world_name || "Le Royaume des Nombres";

  const currentLevel = levels.find(l => l.level === STUDENT.level) || levels[0];
  const nextLevel = levels.find(l => l.level === STUDENT.level + 1);
  const xpToNext = nextLevel ? nextLevel.xp_required - STUDENT.xp : 0;
  const xpPct = nextLevel ? Math.round((STUDENT.xp / nextLevel.xp_required) * 100) : 100;

  const q = DEMO_QUESTIONS[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    setAnswers(prev => [...prev, correct]);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < DEMO_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowHint(false);
    } else {
      setScreen("result");
    }
  };

  const resetPractice = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setShowHint(false); setScore(0); setAnswers([]);
    setScreen("home");
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      {/* Header */}
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {screen !== "home" && (
              <button onClick={() => { setScreen("home"); resetPractice(); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <div className="font-display font-bold text-sm">Numbernaut</div>
              <div className="text-[oklch(0.72_0.14_75)] text-xs">Bonjour, {STUDENT.name} 👋</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
              <Flame size={14} className="text-[oklch(0.72_0.14_75)]" />
              <span className="text-sm font-display font-bold">{STUDENT.streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
              <Star size={14} className="text-[oklch(0.72_0.14_75)]" />
              <span className="text-sm font-display font-bold">{STUDENT.xp} XP</span>
            </div>
            <Link href="/app/teacher">
              <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg font-display font-medium transition-colors">Enseignant</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">

        {/* ── HOME SCREEN ── */}
        {screen === "home" && (
          <div className="space-y-5">
            {/* Level progress */}
            <div className="bg-[oklch(0.28_0.08_155)] rounded-2xl p-5 text-[oklch(0.97_0.015_80)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[oklch(0.72_0.14_75)] text-xs font-display font-semibold uppercase tracking-wider">Niveau {STUDENT.level}</p>
                  <h2 className="font-display font-bold text-xl">{currentLevel?.title || "Explorateur"}</h2>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-[oklch(0.72_0.14_75)] flex items-center justify-center">
                  <span className="font-display font-bold text-2xl">{STUDENT.level}</span>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-3 mb-1">
                <div className="bg-[oklch(0.72_0.14_75)] h-3 rounded-full transition-all" style={{ width: `${xpPct}%` }} />
              </div>
              <div className="flex justify-between text-xs text-white/70">
                <span>{STUDENT.xp} XP</span>
                {nextLevel && <span>{xpToNext} XP pour le niveau {STUDENT.level + 1}</span>}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Compétences", value: `${STUDENT.masteredSkills}/${STUDENT.totalSkills}`, icon: BookOpen, color: "text-[oklch(0.28_0.08_155)]" },
                { label: "Série", value: `${STUDENT.streak} jours`, icon: Flame, color: "text-orange-500" },
                { label: "Badges", value: `${STUDENT.badges}`, icon: Trophy, color: "text-[oklch(0.72_0.14_75)]" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] p-3 text-center shadow-sm">
                  <stat.icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
                  <div className="font-display font-bold text-[oklch(0.22_0.01_260)] text-lg">{stat.value}</div>
                  <div className="font-body text-[oklch(0.50_0.01_260)] text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Daily challenge */}
            <div className="bg-gradient-to-r from-[oklch(0.72_0.14_75)] to-[oklch(0.65_0.12_60)] rounded-2xl p-4 text-[oklch(0.22_0.01_260)]">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-[oklch(0.22_0.01_260)]" />
                <span className="font-display font-bold text-sm">Défi du jour</span>
              </div>
              <p className="font-body text-sm leading-relaxed mb-3">Complète 5 exercices d'addition et de soustraction pour gagner 50 XP bonus !</p>
              <button onClick={() => setScreen("practice")} className="bg-[oklch(0.22_0.01_260)] text-[oklch(0.97_0.015_80)] rounded-lg px-4 py-2 text-sm font-display font-bold hover:opacity-90 transition-opacity">
                Commencer le défi →
              </button>
            </div>

            {/* World map preview */}
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[oklch(0.92_0.004_80)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Map size={16} className="text-[oklch(0.28_0.08_155)]" />
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">{worldName}</h3>
                </div>
                <button onClick={() => setScreen("map")} className="text-xs text-[oklch(0.35_0.09_155)] font-display font-medium hover:underline">Explorer →</button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {regions.slice(0, 4).map((region, i) => {
                  const domainCode = ["A", "B", "C", "D", "E", "F"][i] || "A";
                  const style = DOMAIN_REGIONS[domainCode];
                  return (
                    <div key={region.id} className={`rounded-xl border p-3 ${style.bg}`}>
                      <div className="text-2xl mb-1">{style.emoji}</div>
                      <p className={`font-display font-bold text-xs ${style.color}`}>{region.name}</p>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5 line-clamp-2">{region.mathematical_domain}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
                <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3 flex items-center gap-2"><Trophy size={14} className="text-[oklch(0.72_0.14_75)]" /> Mes badges</h3>
                <div className="flex gap-3 flex-wrap">
                  {badges.slice(0, 5).map((badge, i) => (
                    <div key={badge.id} className={`text-center p-2 rounded-xl border ${i < STUDENT.badges ? "bg-[oklch(0.72_0.14_75)]/10 border-[oklch(0.72_0.14_75)]/30" : "bg-[oklch(0.92_0.004_80)] border-[oklch(0.88_0.01_80)] opacity-40"}`}>
                      <div className="text-2xl mb-1">{["🏅","⭐","🔥","💎","🌟"][i]}</div>
                      <p className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xs">{badge.name}</p>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-[10px] mt-0.5 w-16 truncate">{badge.rarity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MAP SCREEN ── */}
        {screen === "map" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">{worldName}</h2>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{adaptiveEngine.gamification?.narrative?.premise?.slice(0, 120)}...</p>
            </div>
            <div className="space-y-3">
              {regions.map((region, i) => {
                const domainCode = ["A", "B", "C", "D", "E", "F"][i] || "A";
                const style = DOMAIN_REGIONS[domainCode];
                const unlocked = i < 3;
                return (
                  <div key={region.id} className={`rounded-2xl border p-4 ${unlocked ? style.bg : "bg-[oklch(0.92_0.004_80)] border-[oklch(0.88_0.01_80)] opacity-60"}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{style.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-display font-bold text-sm ${unlocked ? style.color : "text-[oklch(0.50_0.01_260)]"}`}>{region.name}</h3>
                          {!unlocked && <span className="text-xs bg-[oklch(0.50_0.01_260)]/10 text-[oklch(0.50_0.01_260)] px-2 py-0.5 rounded-full font-display">🔒 Verrouillé</span>}
                        </div>
                        <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-1">{region.mathematical_domain}</p>
                        <p className="font-body text-[oklch(0.22_0.01_260)] text-xs mt-1 leading-relaxed">{region.description?.slice(0, 100)}...</p>
                        {unlocked && (
                          <button onClick={() => setScreen("practice")} className={`mt-2 text-xs font-display font-bold ${style.color} hover:underline`}>
                            Entrer dans cette région →
                          </button>
                        )}
                        {!unlocked && (
                          <p className="mt-1 text-xs text-[oklch(0.50_0.01_260)] italic">{region.unlock_condition}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PRACTICE SCREEN ── */}
        {screen === "practice" && (
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[oklch(0.88_0.01_80)] rounded-full h-2">
                <div className="bg-[oklch(0.28_0.08_155)] h-2 rounded-full transition-all" style={{ width: `${((currentQ) / DEMO_QUESTIONS.length) * 100}%` }} />
              </div>
              <span className="font-mono text-sm text-[oklch(0.50_0.01_260)]">{currentQ + 1}/{DEMO_QUESTIONS.length}</span>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <div className="bg-[oklch(0.28_0.08_155)] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[oklch(0.72_0.14_75)]">{q.skill}</span>
                  <span className="text-xs text-white/70 font-body">Question {currentQ + 1}</span>
                </div>
                <p className="font-display font-bold text-[oklch(0.97_0.015_80)] text-xl mt-2">{q.question}</p>
              </div>
              <div className="p-4 space-y-3">
                {q.options.map((opt, i) => {
                  let style = "border-[oklch(0.88_0.01_80)] bg-white hover:border-[oklch(0.28_0.08_155)] hover:bg-[oklch(0.28_0.08_155)]/5";
                  if (answered) {
                    if (i === q.correct) style = "border-green-400 bg-green-50";
                    else if (i === selected && i !== q.correct) style = "border-red-400 bg-red-50";
                    else style = "border-[oklch(0.88_0.01_80)] bg-white opacity-50";
                  } else if (selected === i) {
                    style = "border-[oklch(0.28_0.08_155)] bg-[oklch(0.28_0.08_155)]/10";
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                      className={`w-full text-left p-3 rounded-xl border-2 font-display font-semibold text-[oklch(0.22_0.01_260)] transition-all flex items-center gap-3 ${style}`}>
                      <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-mono flex-shrink-0">
                        {answered && i === q.correct ? <CheckCircle size={16} className="text-green-600" /> :
                         answered && i === selected && i !== q.correct ? <XCircle size={16} className="text-red-600" /> :
                         ["A","B","C","D"][i]}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Hint & feedback */}
              {!answered && (
                <div className="px-4 pb-4">
                  <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-1 text-sm text-[oklch(0.50_0.01_260)] hover:text-[oklch(0.28_0.08_155)] font-display font-medium transition-colors">
                    <Lightbulb size={14} /> {showHint ? "Masquer l'indice" : "Voir un indice"}
                  </button>
                  {showHint && (
                    <div className="mt-2 p-3 bg-[oklch(0.72_0.14_75)]/10 rounded-xl border border-[oklch(0.72_0.14_75)]/30">
                      <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed">💡 {q.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {answered && (
                <div className="px-4 pb-4">
                  <div className={`p-3 rounded-xl ${selected === q.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                    <p className={`font-display font-bold text-sm ${selected === q.correct ? "text-green-700" : "text-red-700"}`}>
                      {selected === q.correct ? "✓ Excellent ! Bonne réponse !" : "✗ Pas tout à fait..."}
                    </p>
                    <p className="font-body text-[oklch(0.22_0.01_260)] text-xs mt-1 leading-relaxed">💡 {q.hint}</p>
                  </div>
                  <button onClick={handleNext} className="mt-3 w-full bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.35_0.09_155)] transition-colors">
                    {currentQ < DEMO_QUESTIONS.length - 1 ? "Question suivante →" : "Voir les résultats →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {screen === "result" && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-6 text-center ${score >= 4 ? "bg-[oklch(0.28_0.08_155)]" : score >= 3 ? "bg-amber-500" : "bg-red-500"} text-white`}>
              <div className="text-5xl mb-3">{score >= 4 ? "🏆" : score >= 3 ? "⭐" : "💪"}</div>
              <h2 className="font-display font-bold text-2xl">{score >= 4 ? "Fantastique !" : score >= 3 ? "Bien joué !" : "Continue d'essayer !"}</h2>
              <p className="font-body text-white/80 mt-1">{score} bonne(s) réponse(s) sur {DEMO_QUESTIONS.length}</p>
              <div className="mt-4 bg-white/20 rounded-xl p-3">
                <p className="font-display font-bold text-lg">+{score * 10} XP gagnés !</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
              <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Récapitulatif</h3>
              {DEMO_QUESTIONS.map((q, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                  {answers[i] ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : <XCircle size={16} className="text-red-500 flex-shrink-0" />}
                  <span className="font-body text-[oklch(0.22_0.01_260)] text-sm flex-1">{q.question}</span>
                  <span className={`font-display font-semibold text-xs ${answers[i] ? "text-green-600" : "text-red-600"}`}>{answers[i] ? "✓" : `→ ${q.options[q.correct]}`}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={resetPractice} className="flex-1 bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.35_0.09_155)] transition-colors">
                Retour à l'accueil
              </button>
              <button onClick={() => { setCurrentQ(0); setSelected(null); setAnswered(false); setShowHint(false); setScore(0); setAnswers([]); setScreen("practice"); }}
                className="flex-1 border-2 border-[oklch(0.28_0.08_155)] text-[oklch(0.28_0.08_155)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.28_0.08_155)]/5 transition-colors">
                Réessayer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
