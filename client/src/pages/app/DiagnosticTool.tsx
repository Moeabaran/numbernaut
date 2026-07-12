/**
 * Diagnostic Tool — Numbernaut
 * Interactive diagnostic assessment that identifies a student's micro-skill gaps
 * and matches them to a learner profile.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronRight, Brain, Target, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react";
import microSkillsRaw from "@/data/micro_skills.json";
import learnerProfilesRaw from "@/data/learner_profiles.json";
import errorLibraryRaw from "@/data/error_library.json";

const microSkills = microSkillsRaw as MicroSkill[];
const learnerProfiles = learnerProfilesRaw as LearnerProfile[];
const errorLibrary = errorLibraryRaw as ErrorEntry[];

interface MicroSkill { id: string; domain: string; domain_code: string; name: string; description: string; grade_introduced: string; cpa_level: string; prerequisites: string[]; mastery_criteria: string; difficulty: number; }
interface LearnerProfile { id: string; name: string; category: string; description: string; cognitive_profile: { strengths: string[]; weaknesses: string[] }; mathematical_profile: { strong_domains: string[]; weak_domains: string[]; error_patterns: string[]; mastery_gaps: string[] }; affective_profile: { math_anxiety: string; confidence: string }; instructional_recommendations: string[]; teacher_strategies: string[]; intervention_intensity: string; }
interface ErrorEntry { id?: string; name: string; description: string; severity: string; remediation_strategy: string; related_skills: string[]; }

const DIAG_QUESTIONS = [
  { id: "D01", skill: "M001", grade: "K", question: "L'élève peut-il/elle compter de 1 à 10 sans erreur ?", domain: "A" },
  { id: "D02", skill: "M021", grade: "1", question: "L'élève peut-il/elle comparer deux nombres à deux chiffres (ex: 34 vs 52) ?", domain: "A" },
  { id: "D03", skill: "M061", grade: "1", question: "L'élève peut-il/elle additionner deux nombres à un chiffre (ex: 7 + 8) ?", domain: "B" },
  { id: "D04", skill: "M071", grade: "2", question: "L'élève peut-il/elle soustraire avec emprunt (ex: 43 − 17) ?", domain: "B" },
  { id: "D05", skill: "M201", grade: "2", question: "L'élève comprend-il/elle la valeur de position (dizaines, unités) ?", domain: "C" },
  { id: "D06", skill: "M081", grade: "3", question: "L'élève connaît-il/elle les tables de multiplication jusqu'à 5 × 5 ?", domain: "B" },
  { id: "D07", skill: "M301", grade: "3", question: "L'élève peut-il/elle identifier ½ et ¼ sur une figure géométrique ?", domain: "D" },
  { id: "D08", skill: "M401", grade: "4", question: "L'élève peut-il/elle mesurer en centimètres avec une règle ?", domain: "E" },
  { id: "D09", skill: "M461", grade: "4", question: "L'élève peut-il/elle identifier et continuer une régularité numérique ?", domain: "F" },
  { id: "D10", skill: "M321", grade: "5", question: "L'élève peut-il/elle comparer des fractions avec des dénominateurs différents ?", domain: "D" },
];

export default function DiagnosticTool() {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "yes" | "partial" | "no">>({});
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("3");

  const handleAnswer = (val: "yes" | "partial" | "no") => {
    const q = DIAG_QUESTIONS[currentQ];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    if (currentQ < DIAG_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setStep("result");
    }
  };

  const yesCount = Object.values(answers).filter(v => v === "yes").length;
  const partialCount = Object.values(answers).filter(v => v === "partial").length;
  const noCount = Object.values(answers).filter(v => v === "no").length;
  const score = yesCount + partialCount * 0.5;
  const pct = Math.round((score / DIAG_QUESTIONS.length) * 100);

  const weakDomains = DIAG_QUESTIONS.filter(q => answers[q.id] === "no" || answers[q.id] === "partial").map(q => q.domain);
  const uniqueWeakDomains = Array.from(new Set(weakDomains));

  const matchedProfile = learnerProfiles.find(p => {
    if (pct < 40) return p.intervention_intensity === "Tier3";
    if (pct < 65) return p.intervention_intensity === "Tier2";
    return p.intervention_intensity === "Tier1";
  }) || learnerProfiles[0];

  const relatedErrors = errorLibrary.filter(e =>
    e.related_skills.some(s => DIAG_QUESTIONS.filter(q => answers[q.id] === "no").map(q => q.skill).includes(s))
  ).slice(0, 4);

  const q = DIAG_QUESTIONS[currentQ];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg px-5 py-3 flex items-center gap-3">
        <Link href="/app/teacher"><button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ArrowLeft size={16} /></button></Link>
        <div>
          <div className="font-display font-bold text-sm">Outil de diagnostic</div>
          <div className="text-[oklch(0.72_0.14_75)] text-xs">Évaluation rapide des micro-compétences</div>
        </div>
      </header>

      <main className="flex-1 p-5 max-w-2xl mx-auto w-full">

        {step === "intro" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.28_0.08_155)]/10 flex items-center justify-center">
                  <Brain size={24} className="text-[oklch(0.28_0.08_155)]" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">Diagnostic rapide</h1>
                  <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">10 questions · ~5 minutes</p>
                </div>
              </div>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed mb-4">
                Cet outil identifie les lacunes dans les micro-compétences d'un élève et génère automatiquement un profil d'apprenant avec des recommandations d'intervention personnalisées.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Target, label: "Identification des lacunes", color: "text-[oklch(0.28_0.08_155)]" },
                  { icon: Brain, label: "Profil d'apprenant automatique", color: "text-purple-600" },
                  { icon: BarChart2, label: "Recommandations ciblées", color: "text-[oklch(0.35_0.09_155)]" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-[oklch(0.97_0.015_80)] rounded-xl border border-[oklch(0.88_0.01_80)]">
                    <item.icon size={20} className={`mx-auto mb-1 ${item.color}`} />
                    <p className="font-body text-[oklch(0.22_0.01_260)] text-xs leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm block mb-1">Nom de l'élève</label>
                  <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Ex: Emma Tremblay" className="w-full px-3 py-2 border border-[oklch(0.88_0.01_80)] rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.28_0.08_155)]/30" />
                </div>
                <div>
                  <label className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm block mb-1">Niveau scolaire</label>
                  <select value={studentGrade} onChange={e => setStudentGrade(e.target.value)} className="w-full px-3 py-2 border border-[oklch(0.88_0.01_80)] rounded-lg font-body text-sm focus:outline-none">
                    <option value="K">Maternelle</option>
                    {[1,2,3,4,5,6].map(g => <option key={g} value={g.toString()}>{g}e année</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setStep("questions")} className="w-full bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.35_0.09_155)] transition-colors">
                Commencer le diagnostic →
              </button>
            </div>
          </div>
        )}

        {step === "questions" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[oklch(0.88_0.01_80)] rounded-full h-2">
                <div className="bg-[oklch(0.28_0.08_155)] h-2 rounded-full transition-all" style={{ width: `${(currentQ / DIAG_QUESTIONS.length) * 100}%` }} />
              </div>
              <span className="font-mono text-sm text-[oklch(0.50_0.01_260)]">{currentQ + 1}/{DIAG_QUESTIONS.length}</span>
            </div>

            <div className="bg-white rounded-2xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <div className="bg-[oklch(0.28_0.08_155)] p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[oklch(0.72_0.14_75)]">{q.skill}</span>
                  <span className="text-xs text-white/70">{q.grade === "K" ? "Maternelle" : `${q.grade}e année`}</span>
                </div>
                <p className="font-display font-bold text-[oklch(0.97_0.015_80)] text-lg leading-snug">{q.question}</p>
              </div>
              <div className="p-5 space-y-3">
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mb-4">Évaluez la capacité de l'élève à réaliser cette tâche :</p>
                {[
                  { val: "yes" as const, label: "Oui, sans difficulté", sub: "L'élève réussit de manière autonome et constante", color: "border-green-400 bg-green-50 hover:bg-green-100", text: "text-green-700", icon: "✓" },
                  { val: "partial" as const, label: "Partiellement", sub: "L'élève réussit avec aide ou de manière inconsistante", color: "border-amber-400 bg-amber-50 hover:bg-amber-100", text: "text-amber-700", icon: "~" },
                  { val: "no" as const, label: "Non, difficulté importante", sub: "L'élève ne peut pas réaliser cette tâche", color: "border-red-400 bg-red-50 hover:bg-red-100", text: "text-red-700", icon: "✗" },
                ].map(opt => (
                  <button key={opt.val} onClick={() => handleAnswer(opt.val)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${opt.color}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm flex-shrink-0 ${opt.text}`}>{opt.icon}</span>
                      <div>
                        <p className={`font-display font-bold text-sm ${opt.text}`}>{opt.label}</p>
                        <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5">{opt.sub}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[oklch(0.28_0.08_155)]/5 rounded-xl p-3 border border-[oklch(0.28_0.08_155)]/15">
              <p className="font-body text-[oklch(0.50_0.01_260)] text-xs">
                <span className="font-display font-semibold text-[oklch(0.22_0.01_260)]">Critère de maîtrise: </span>
                {microSkills.find(s => s.id === q.skill)?.mastery_criteria || "Évaluation en contexte naturel de classe."}
              </p>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="space-y-5">
            <div className={`rounded-2xl p-5 text-white ${pct >= 70 ? "bg-[oklch(0.35_0.09_155)]" : pct >= 50 ? "bg-amber-500" : "bg-red-600"}`}>
              <p className="text-white/80 text-xs font-display font-semibold uppercase tracking-wider mb-1">Résultat du diagnostic</p>
              <h2 className="font-display font-bold text-2xl mb-1">{studentName || "L'élève"} — {studentGrade === "K" ? "Maternelle" : `${studentGrade}e année`}</h2>
              <div className="flex items-end gap-3 mt-3">
                <div className="text-5xl font-display font-bold">{pct}%</div>
                <div className="text-white/80 text-sm font-body pb-1">de maîtrise estimée<br />{yesCount} acquis · {partialCount} partiels · {noCount} lacunes</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Acquis", value: yesCount, color: "text-green-600", bg: "bg-green-50 border-green-200" },
                { label: "Partiels", value: partialCount, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
                { label: "Lacunes", value: noCount, color: "text-red-600", bg: "bg-red-50 border-red-200" },
              ].map((stat, i) => (
                <div key={i} className={`rounded-xl border p-3 text-center ${stat.bg}`}>
                  <div className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</div>
                  <div className="font-body text-[oklch(0.50_0.01_260)] text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {matchedProfile && (
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain size={16} className="text-[oklch(0.28_0.08_155)]" />
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Profil d'apprenant identifié</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-semibold text-[oklch(0.28_0.08_155)] text-sm">{matchedProfile.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-display font-medium ${matchedProfile.intervention_intensity === "Tier3" ? "bg-red-50 text-red-700" : matchedProfile.intervention_intensity === "Tier2" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{matchedProfile.intervention_intensity}</span>
                </div>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed mb-3">{matchedProfile.description}</p>
                <div className="space-y-2">
                  <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider">Recommandations immédiates</p>
                  {matchedProfile.instructional_recommendations.slice(0, 3).map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[oklch(0.28_0.08_155)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                      <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {relatedErrors.length > 0 && (
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-orange-500" />
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Erreurs probables à surveiller</h3>
                </div>
                <div className="space-y-3">
                  {relatedErrors.map((err, i) => (
                    <div key={i} className="border border-[oklch(0.88_0.01_80)] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xs">{err.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-display ${err.severity === "High" || err.severity === "Critical" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{err.severity}</span>
                      </div>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs leading-relaxed">{err.remediation_strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => { setStep("intro"); setCurrentQ(0); setAnswers({}); }} className="flex-1 border-2 border-[oklch(0.28_0.08_155)] text-[oklch(0.28_0.08_155)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.28_0.08_155)]/5 transition-colors">
                Nouveau diagnostic
              </button>
              <Link href="/app/teacher" className="flex-1">
                <button className="w-full bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-xl py-3 font-display font-bold text-sm hover:bg-[oklch(0.35_0.09_155)] transition-colors">
                  Voir le tableau de bord →
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
