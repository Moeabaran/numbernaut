/**
 * Teacher Dashboard — Numbernaut
 * Northern Expedition Design System
 * The primary educator interface: class overview, student diagnostics, micro-skill tracking,
 * error pattern analysis, and evidence-based recommendations.
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Users, BookOpen, AlertTriangle, TrendingUp, ChevronRight,
  Search, Filter, Download, Bell, Settings, LogOut,
  CheckCircle, XCircle, Clock, Star, BarChart2, Brain,
  ArrowLeft, Eye, Lightbulb, Target, Activity, Compass
} from "lucide-react";
import microSkillsRaw from "@/data/micro_skills.json";
import errorLibraryRaw from "@/data/error_library.json";
import learnerProfilesRaw from "@/data/learner_profiles.json";

const microSkills = microSkillsRaw as MicroSkill[];
const errorLibrary = errorLibraryRaw as ErrorEntry[];
const learnerProfiles = learnerProfilesRaw as LearnerProfile[];

interface MicroSkill {
  id: string; domain: string; domain_code: string; name: string;
  description: string; grade_introduced: string; cpa_level: string;
  prerequisites: string[]; mastery_criteria: string; assessment_type: string;
  difficulty: number; strand?: string;
}
interface ErrorEntry {
  id?: string; category: string; name: string; description: string;
  example?: string; probable_cause: string; severity: string;
  grade_range?: string; related_skills: string[]; remediation_strategy: string;
  remediation_activities?: string[]; diagnostic_questions?: string[];
  common_misconception?: string; teacher_note?: string;
}
interface LearnerProfile {
  id: string; name: string; category: string; prevalence: string;
  grade_range: string; description: string;
  cognitive_profile: { strengths: string[]; weaknesses: string[]; working_memory: string; processing_speed: string; visual_spatial: string };
  mathematical_profile: { strong_domains: string[]; weak_domains: string[]; error_patterns: string[]; mastery_gaps: string[] };
  affective_profile: { math_anxiety: string; confidence: string; motivation: string; persistence: string };
  instructional_recommendations: string[];
  curriculum_adjustments: string[];
  teacher_strategies: string[];
  parent_guidance: string;
  intervention_intensity: string;
}

// Simulated class data
const DEMO_STUDENTS = [
  { id: "S001", name: "Emma Tremblay", grade: "3", profile: "P003", masteredSkills: 47, totalSkills: 80, recentErrors: ["E-003", "E-007"], riskLevel: "low", lastActive: "Aujourd'hui", streak: 8 },
  { id: "S002", name: "Liam Bouchard", grade: "3", profile: "P001", masteredSkills: 29, totalSkills: 80, recentErrors: ["E-001", "E-002", "E-005"], riskLevel: "high", lastActive: "Hier", streak: 2 },
  { id: "S003", name: "Sofia Patel", grade: "3", profile: "P005", masteredSkills: 61, totalSkills: 80, recentErrors: [], riskLevel: "low", lastActive: "Aujourd'hui", streak: 15 },
  { id: "S004", name: "Noah Gagnon", grade: "3", profile: "P008", masteredSkills: 38, totalSkills: 80, recentErrors: ["E-041", "E-043"], riskLevel: "medium", lastActive: "Il y a 2 jours", streak: 0 },
  { id: "S005", name: "Olivia Chen", grade: "3", profile: "P012", masteredSkills: 72, totalSkills: 80, recentErrors: [], riskLevel: "low", lastActive: "Aujourd'hui", streak: 22 },
  { id: "S006", name: "Ethan Roy", grade: "3", profile: "P011", masteredSkills: 18, totalSkills: 80, recentErrors: ["E-001", "E-002", "E-003", "E-007"], riskLevel: "critical", lastActive: "Il y a 5 jours", streak: 0 },
  { id: "S007", name: "Ava Lavoie", grade: "3", profile: "P006", masteredSkills: 44, totalSkills: 80, recentErrors: ["E-081"], riskLevel: "medium", lastActive: "Hier", streak: 3 },
  { id: "S008", name: "Lucas Fortin", grade: "3", profile: "P010", masteredSkills: 33, totalSkills: 80, recentErrors: ["E-081", "E-082"], riskLevel: "high", lastActive: "Aujourd'hui", streak: 1 },
];

const RISK_CONFIG = {
  critical: { label: "Critique", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
  high: { label: "Élevé", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500" },
  medium: { label: "Modéré", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  low: { label: "Faible", color: "text-green-700", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500" },
};

const DOMAIN_COLORS: Record<string, string> = {
  A: "bg-blue-100 text-blue-800", B: "bg-purple-100 text-purple-800",
  C: "bg-green-100 text-green-800", D: "bg-amber-100 text-amber-800",
  E: "bg-rose-100 text-rose-800", F: "bg-indigo-100 text-indigo-800",
};

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "skills" | "errors" | "reports">("overview");
  const [selectedStudent, setSelectedStudent] = useState<typeof DEMO_STUDENTS[0] | null>(null);
  const [skillSearch, setSkillSearch] = useState("");
  const [skillDomain, setSkillDomain] = useState("all");
  const [errorCategory, setErrorCategory] = useState("all");
  const [errorSearch, setErrorSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const filteredSkills = microSkills.filter(s => {
    const matchSearch = !skillSearch || s.name.toLowerCase().includes(skillSearch.toLowerCase()) || s.id.toLowerCase().includes(skillSearch.toLowerCase());
    const matchDomain = skillDomain === "all" || s.domain_code === skillDomain;
    return matchSearch && matchDomain;
  }).slice(0, 50);

  const filteredErrors = errorLibrary.filter(e => {
    const matchSearch = !errorSearch || e.name.toLowerCase().includes(errorSearch.toLowerCase());
    const matchCat = errorCategory === "all" || e.category === errorCategory;
    return matchSearch && matchCat;
  }).slice(0, 40);

  const errorCategories = Array.from(new Set(errorLibrary.map(e => e.category)));

  const criticalStudents = DEMO_STUDENTS.filter(s => s.riskLevel === "critical" || s.riskLevel === "high");
  const avgMastery = Math.round(DEMO_STUDENTS.reduce((a, s) => a + s.masteredSkills, 0) / DEMO_STUDENTS.length);

  const getProfile = (profileId: string) => learnerProfiles.find(p => p.id === profileId);
  const getError = (errorId: string) => errorLibrary.find(e => e.id === errorId || e.id === errorId.replace("E-0", "E-"));

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.008_80)] flex flex-col">
      {/* Top Nav */}
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Compass className="w-6 h-6 text-[oklch(0.72_0.14_75)] opacity-90" aria-label="Numbernaut" />
            </Link>
            <div>
              <div className="font-display font-bold text-sm text-[oklch(0.97_0.015_80)]">Numbernaut</div>
              <div className="text-[oklch(0.72_0.14_75)] text-xs font-body">Tableau de bord — Enseignant</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[oklch(0.72_0.14_75)] rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-xl border border-[oklch(0.88_0.01_80)] z-50 overflow-hidden">
                  <div className="p-3 border-b border-[oklch(0.88_0.01_80)] bg-[oklch(0.97_0.015_80)]">
                    <span className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm">Alertes prioritaires</span>
                  </div>
                  {criticalStudents.map(s => (
                    <div key={s.id} className="p-3 border-b border-[oklch(0.92_0.004_80)] hover:bg-[oklch(0.97_0.015_80)] cursor-pointer" onClick={() => { setSelectedStudent(s); setNotifOpen(false); setActiveTab("students"); }}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${RISK_CONFIG[s.riskLevel as keyof typeof RISK_CONFIG].dot}`} />
                        <span className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm">{s.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${RISK_CONFIG[s.riskLevel as keyof typeof RISK_CONFIG].bg} ${RISK_CONFIG[s.riskLevel as keyof typeof RISK_CONFIG].color}`}>
                          {RISK_CONFIG[s.riskLevel as keyof typeof RISK_CONFIG].label}
                        </span>
                      </div>
                      <p className="text-xs text-[oklch(0.50_0.01_260)] mt-1 ml-4">{s.recentErrors.length} erreur(s) détectée(s) · Dernière activité: {s.lastActive}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="w-7 h-7 rounded-full bg-[oklch(0.72_0.14_75)] flex items-center justify-center text-[oklch(0.22_0.01_260)] font-display font-bold text-xs">ML</div>
              <span className="text-sm font-body">Mme Leclerc</span>
            </div>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex px-6 gap-1 border-t border-white/10">
          {[
            { id: "overview", label: "Vue d'ensemble", icon: BarChart2 },
            { id: "students", label: "Élèves", icon: Users },
            { id: "skills", label: "Micro-compétences", icon: BookOpen },
            { id: "errors", label: "Bibliothèque d'erreurs", icon: AlertTriangle },
            { id: "reports", label: "Rapports", icon: Download },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as typeof activeTab); setSelectedStudent(null); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-display font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-[oklch(0.72_0.14_75)] text-[oklch(0.72_0.14_75)]"
                  : "border-transparent text-white/60 hover:text-white/90"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-2xl">Bonjour, Mme Leclerc</h1>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mt-1">3e année · École Sainte-Marie, Montréal · {new Date().toLocaleDateString('fr-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Élèves actifs", value: `${DEMO_STUDENTS.filter(s => s.lastActive === "Aujourd'hui").length}/${DEMO_STUDENTS.length}`, sub: "aujourd'hui", icon: Users, color: "text-[oklch(0.28_0.08_155)]", bg: "bg-[oklch(0.28_0.08_155)]/8" },
                { label: "Maîtrise moyenne", value: `${avgMastery}/80`, sub: "micro-compétences", icon: Target, color: "text-[oklch(0.50_0.10_155)]", bg: "bg-[oklch(0.50_0.10_155)]/8" },
                { label: "Alertes actives", value: criticalStudents.length.toString(), sub: "élèves à risque", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
                { label: "Séries actives", value: DEMO_STUDENTS.filter(s => s.streak > 0).length.toString(), sub: "élèves en série", icon: Star, color: "text-[oklch(0.72_0.14_75)]", bg: "bg-[oklch(0.72_0.14_75)]/10" },
              ].map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs uppercase tracking-wider">{kpi.label}</p>
                      <p className={`font-display font-bold text-3xl mt-1 ${kpi.color}`}>{kpi.value}</p>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5">{kpi.sub}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                      <kpi.icon size={18} className={kpi.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Priority interventions + Mastery progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Priority interventions */}
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[oklch(0.92_0.004_80)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Interventions prioritaires</h2>
                  </div>
                  <button onClick={() => setActiveTab("students")} className="text-xs text-[oklch(0.35_0.09_155)] font-display font-medium hover:underline">Voir tous →</button>
                </div>
                <div className="divide-y divide-[oklch(0.92_0.004_80)]">
                  {criticalStudents.map(student => {
                    const profile = getProfile(student.profile);
                    const risk = RISK_CONFIG[student.riskLevel as keyof typeof RISK_CONFIG];
                    return (
                      <div key={student.id} className="p-4 hover:bg-[oklch(0.97_0.015_80)] cursor-pointer transition-colors" onClick={() => { setSelectedStudent(student); setActiveTab("students"); }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${risk.dot}`} />
                            <span className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm">{student.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-display font-medium ${risk.bg} ${risk.color}`}>{risk.label}</span>
                          </div>
                          <span className="text-xs text-[oklch(0.50_0.01_260)]">{student.lastActive}</span>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 bg-[oklch(0.92_0.004_80)] rounded-full h-1.5">
                              <div className="bg-[oklch(0.28_0.08_155)] h-1.5 rounded-full" style={{ width: `${(student.masteredSkills / student.totalSkills) * 100}%` }} />
                            </div>
                            <span className="text-xs text-[oklch(0.50_0.01_260)] font-mono">{student.masteredSkills}/{student.totalSkills}</span>
                          </div>
                          {profile && (
                            <p className="text-xs text-[oklch(0.50_0.01_260)]">Profil: <span className="text-[oklch(0.35_0.09_155)] font-medium">{profile.name}</span></p>
                          )}
                          {student.recentErrors.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {student.recentErrors.slice(0, 3).map(eid => (
                                <span key={eid} className="font-mono text-xs bg-red-50 text-red-700 px-1.5 py-0.5 rounded border border-red-100">{eid}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Class mastery by domain */}
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[oklch(0.92_0.004_80)] flex items-center gap-2">
                  <Brain size={16} className="text-[oklch(0.28_0.08_155)]" />
                  <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Maîtrise par domaine — Classe</h2>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { code: "A", name: "Comptage et cardinalité", pct: 78, skills: 60 },
                    { code: "B", name: "Opérations numériques", pct: 52, skills: 140 },
                    { code: "C", name: "Valeur de position", pct: 61, skills: 100 },
                    { code: "D", name: "Fractions et décimaux", pct: 34, skills: 100 },
                    { code: "E", name: "Mesure et géométrie", pct: 67, skills: 60 },
                    { code: "F", name: "Régularités et algèbre", pct: 45, skills: 40 },
                  ].map(domain => (
                    <div key={domain.code}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${DOMAIN_COLORS[domain.code]}`}>{domain.code}</span>
                          <span className="font-body text-[oklch(0.22_0.01_260)] text-sm">{domain.name}</span>
                        </div>
                        <span className={`font-display font-bold text-sm ${domain.pct >= 70 ? "text-[oklch(0.35_0.09_155)]" : domain.pct >= 50 ? "text-amber-600" : "text-red-600"}`}>{domain.pct}%</span>
                      </div>
                      <div className="bg-[oklch(0.92_0.004_80)] rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${domain.pct >= 70 ? "bg-[oklch(0.35_0.09_155)]" : domain.pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${domain.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's recommended actions */}
            <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[oklch(0.92_0.004_80)] flex items-center gap-2">
                <Lightbulb size={16} className="text-[oklch(0.72_0.14_75)]" />
                <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Recommandations pour aujourd'hui</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[oklch(0.92_0.004_80)]">
                {[
                  { priority: "Urgent", title: "Intervention individuelle — Ethan Roy", desc: "5 jours sans activité. Profil Tier 3. Recommander une séance de rattrapage sur les compétences M001–M012.", action: "Planifier", color: "text-red-600", bg: "bg-red-50" },
                  { priority: "Cette semaine", title: "Groupe de remédiation — Fractions", desc: "4 élèves montrent des erreurs E-121 à E-130. Activité recommandée: manipulation de fractions avec matériel concret.", action: "Créer le groupe", color: "text-amber-600", bg: "bg-amber-50" },
                  { priority: "Enrichissement", title: "Défi avancé — Sofia & Olivia", desc: "2 élèves ont maîtrisé 75%+ des compétences. Prêtes pour des défis de niveau 4.", action: "Assigner", color: "text-[oklch(0.35_0.09_155)]", bg: "bg-[oklch(0.35_0.09_155)]/8" },
                ].map((rec, i) => (
                  <div key={i} className="p-4">
                    <span className={`text-xs font-display font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${rec.bg} ${rec.color}`}>{rec.priority}</span>
                    <h3 className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm mt-2">{rec.title}</h3>
                    <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-1 leading-relaxed">{rec.desc}</p>
                    <button className={`mt-3 text-xs font-display font-semibold ${rec.color} hover:underline`}>{rec.action} →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENTS TAB ── */}
        {activeTab === "students" && !selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">Mes élèves — 3e année</h1>
              <span className="font-body text-[oklch(0.50_0.01_260)] text-sm">{DEMO_STUDENTS.length} élèves</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {DEMO_STUDENTS.map(student => {
                const risk = RISK_CONFIG[student.riskLevel as keyof typeof RISK_CONFIG];
                const profile = getProfile(student.profile);
                const pct = Math.round((student.masteredSkills / student.totalSkills) * 100);
                return (
                  <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] p-4 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[oklch(0.28_0.08_155)] flex items-center justify-center text-[oklch(0.97_0.015_80)] font-display font-bold text-sm">
                          {student.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm">{student.name}</p>
                          <p className="font-body text-[oklch(0.50_0.01_260)] text-xs">{student.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-display font-medium ${risk.bg} ${risk.color}`}>{risk.label}</span>
                        {student.streak > 0 && <span className="text-xs text-amber-600 font-display font-medium">🔥 {student.streak}j</span>}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-body text-[oklch(0.50_0.01_260)]">Maîtrise</span>
                        <span className="font-mono text-[oklch(0.22_0.01_260)] font-semibold">{pct}%</span>
                      </div>
                      <div className="bg-[oklch(0.92_0.004_80)] rounded-full h-2">
                        <div className={`h-2 rounded-full ${pct >= 70 ? "bg-[oklch(0.35_0.09_155)]" : pct >= 50 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="font-mono text-[oklch(0.50_0.01_260)]">{student.masteredSkills} maîtrisées</span>
                        <span className="font-mono text-[oklch(0.50_0.01_260)]">{student.totalSkills} total</span>
                      </div>
                    </div>
                    {profile && <p className="text-xs text-[oklch(0.50_0.01_260)] truncate">Profil: <span className="text-[oklch(0.35_0.09_155)]">{profile.name}</span></p>}
                    {student.recentErrors.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {student.recentErrors.slice(0, 3).map(eid => (
                          <span key={eid} className="font-mono text-xs bg-red-50 text-red-700 px-1 py-0.5 rounded border border-red-100">{eid}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STUDENT DETAIL ── */}
        {activeTab === "students" && selectedStudent && (() => {
          const profile = getProfile(selectedStudent.profile);
          const risk = RISK_CONFIG[selectedStudent.riskLevel as keyof typeof RISK_CONFIG];
          const pct = Math.round((selectedStudent.masteredSkills / selectedStudent.totalSkills) * 100);
          return (
            <div className="space-y-5">
              <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-1 text-sm text-[oklch(0.35_0.09_155)] font-display font-medium hover:underline">
                <ArrowLeft size={14} /> Retour à la liste
              </button>
              <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
                <div className="bg-[oklch(0.28_0.08_155)] p-5 text-[oklch(0.97_0.015_80)]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-xl">
                      {selectedStudent.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-bold text-xl">{selectedStudent.name}</h2>
                      <p className="text-[oklch(0.72_0.14_75)] text-sm">3e année · Dernière activité: {selectedStudent.lastActive}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-3xl text-[oklch(0.72_0.14_75)]">{pct}%</div>
                      <div className="text-xs text-white/70">maîtrise globale</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[oklch(0.92_0.004_80)]">
                  {[
                    { label: "Compétences maîtrisées", value: selectedStudent.masteredSkills.toString() },
                    { label: "Niveau de risque", value: risk.label },
                    { label: "Série actuelle", value: selectedStudent.streak > 0 ? `${selectedStudent.streak} jours` : "Inactive" },
                    { label: "Erreurs récentes", value: selectedStudent.recentErrors.length.toString() },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 text-center">
                      <div className="font-display font-bold text-xl text-[oklch(0.22_0.01_260)]">{stat.value}</div>
                      <div className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {profile && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                    <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3 flex items-center gap-2"><Brain size={14} className="text-[oklch(0.28_0.08_155)]" /> Profil d'apprenant</h3>
                    <div className="mb-2">
                      <span className="font-display font-semibold text-[oklch(0.28_0.08_155)] text-sm">{profile.name}</span>
                      <span className="ml-2 text-xs bg-[oklch(0.28_0.08_155)]/10 text-[oklch(0.28_0.08_155)] px-2 py-0.5 rounded-full">{profile.category}</span>
                    </div>
                    <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed mb-3">{profile.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Forces</p>
                        {profile.cognitive_profile.strengths.slice(0, 3).map((s, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-[oklch(0.35_0.09_155)] mb-0.5"><CheckCircle size={10} /> {s}</div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Défis</p>
                        {profile.cognitive_profile.weaknesses.slice(0, 3).map((w, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-red-600 mb-0.5"><XCircle size={10} /> {w}</div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[oklch(0.92_0.004_80)]">
                      <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-2">Stratégies recommandées</p>
                      {profile.teacher_strategies.slice(0, 3).map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[oklch(0.22_0.01_260)] mb-1.5">
                          <span className="w-4 h-4 rounded-full bg-[oklch(0.28_0.08_155)] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">{i+1}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                    <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3 flex items-center gap-2"><AlertTriangle size={14} className="text-orange-500" /> Erreurs détectées</h3>
                    {selectedStudent.recentErrors.length === 0 ? (
                      <div className="text-center py-6 text-[oklch(0.50_0.01_260)]">
                        <CheckCircle size={24} className="mx-auto mb-2 text-[oklch(0.35_0.09_155)]" />
                        <p className="text-sm font-body">Aucune erreur récente détectée.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedStudent.recentErrors.map(eid => {
                          const err = errorLibrary.find((e, idx) => e.id === eid || `E-${String(idx+1).padStart(3,'0')}` === eid);
                          if (!err) return null;
                          return (
                            <div key={eid} className="border border-[oklch(0.88_0.01_80)] rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold">{eid}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded font-display font-medium ${err.severity === "High" || err.severity === "Critical" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{err.severity}</span>
                              </div>
                              <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs">{err.name}</p>
                              <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-1 leading-relaxed">{err.remediation_strategy}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-[oklch(0.92_0.004_80)]">
                      <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-2">Message aux parents</p>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs leading-relaxed italic">{profile.parent_guidance}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── SKILLS TAB ── */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">Taxonomie des micro-compétences</h1>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{microSkills.length} compétences · 6 domaines · Maternelle à 6e année</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.50_0.01_260)]" />
                  <input value={skillSearch} onChange={e => setSkillSearch(e.target.value)} placeholder="Rechercher..." className="pl-8 pr-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none focus:ring-2 focus:ring-[oklch(0.28_0.08_155)]/30 w-48" />
                </div>
                <select value={skillDomain} onChange={e => setSkillDomain(e.target.value)} className="px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none">
                  <option value="all">Tous les domaines</option>
                  {["A","B","C","D","E","F"].map(d => <option key={d} value={d}>Domaine {d}</option>)}
                </select>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] text-xs font-display font-semibold uppercase tracking-wider">
                <div className="col-span-1 p-3">ID</div>
                <div className="col-span-1 p-3">Dom.</div>
                <div className="col-span-4 p-3">Compétence</div>
                <div className="col-span-2 p-3">Grade</div>
                <div className="col-span-2 p-3">CPA</div>
                <div className="col-span-2 p-3">Prérequis</div>
              </div>
              <div className="divide-y divide-[oklch(0.92_0.004_80)] max-h-[600px] overflow-y-auto">
                {filteredSkills.map((skill, i) => (
                  <div key={skill.id} className={`grid grid-cols-12 items-center text-sm hover:bg-[oklch(0.97_0.015_80)] transition-colors ${i % 2 === 1 ? "bg-[oklch(0.97_0.015_80)]/40" : ""}`}>
                    <div className="col-span-1 p-3 font-mono text-[oklch(0.35_0.09_155)] text-xs font-semibold">{skill.id}</div>
                    <div className="col-span-1 p-3">
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${DOMAIN_COLORS[skill.domain_code] || "bg-gray-100 text-gray-700"}`}>{skill.domain_code}</span>
                    </div>
                    <div className="col-span-4 p-3">
                      <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs leading-tight">{skill.name}</p>
                      <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-0.5 leading-tight line-clamp-2">{skill.description}</p>
                    </div>
                    <div className="col-span-2 p-3 font-mono text-[oklch(0.22_0.01_260)] text-xs">{skill.grade_introduced === "K" ? "Maternelle" : `${skill.grade_introduced}e année`}</div>
                    <div className="col-span-2 p-3">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-display font-medium ${skill.cpa_level === "Concrete" ? "bg-blue-50 text-blue-700" : skill.cpa_level === "Pictorial" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"}`}>{skill.cpa_level === "Concrete" ? "Concret" : skill.cpa_level === "Pictorial" ? "Pictorial" : "Abstrait"}</span>
                    </div>
                    <div className="col-span-2 p-3">
                      {skill.prerequisites.length === 0 ? (
                        <span className="text-xs text-[oklch(0.50_0.01_260)]">—</span>
                      ) : (
                        <div className="flex gap-1 flex-wrap">
                          {skill.prerequisites.slice(0, 2).map(p => <span key={p} className="font-mono text-xs bg-[oklch(0.28_0.08_155)]/8 text-[oklch(0.28_0.08_155)] px-1 rounded">{p}</span>)}
                          {skill.prerequisites.length > 2 && <span className="text-xs text-[oklch(0.50_0.01_260)]">+{skill.prerequisites.length - 2}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {filteredSkills.length === 50 && (
                <div className="p-3 text-center text-xs text-[oklch(0.50_0.01_260)] bg-[oklch(0.97_0.015_80)] border-t border-[oklch(0.92_0.004_80)]">
                  Affichage des 50 premiers résultats. Affinez votre recherche pour voir plus.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ERRORS TAB ── */}
        {activeTab === "errors" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">Bibliothèque nationale d'erreurs</h1>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{errorLibrary.length} erreurs documentées · Causes, sévérité, remédiation</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.50_0.01_260)]" />
                  <input value={errorSearch} onChange={e => setErrorSearch(e.target.value)} placeholder="Rechercher..." className="pl-8 pr-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none focus:ring-2 focus:ring-[oklch(0.28_0.08_155)]/30 w-48" />
                </div>
                <select value={errorCategory} onChange={e => setErrorCategory(e.target.value)} className="px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none">
                  <option value="all">Toutes les catégories</option>
                  {errorCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filteredErrors.map((err, i) => (
                <div key={i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {err.id && <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold bg-[oklch(0.35_0.09_155)]/8 px-1.5 py-0.5 rounded">{err.id}</span>}
                      <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">{err.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {err.grade_range && <span className="text-xs font-mono text-[oklch(0.50_0.01_260)]">Gr. {err.grade_range}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-display font-medium ${
                        err.severity === "Critical" ? "bg-red-100 text-red-800" :
                        err.severity === "High" ? "bg-orange-100 text-orange-800" :
                        err.severity === "Medium" ? "bg-amber-100 text-amber-800" :
                        "bg-green-100 text-green-800"
                      }`}>{err.severity}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider text-[10px] mb-1">Description</p>
                      <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{err.description}</p>
                      {err.example && <p className="mt-1 font-mono text-[oklch(0.35_0.09_155)] bg-[oklch(0.35_0.09_155)]/6 px-2 py-1 rounded text-[11px]">Ex: {err.example}</p>}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider text-[10px] mb-1">Cause probable</p>
                      <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{err.probable_cause}</p>
                      {err.common_misconception && <p className="mt-1 text-amber-700 italic">{err.common_misconception}</p>}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider text-[10px] mb-1">Remédiation</p>
                      <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{err.remediation_strategy}</p>
                      {err.teacher_note && <p className="mt-1 text-[oklch(0.28_0.08_155)] font-medium">💡 {err.teacher_note}</p>}
                    </div>
                  </div>
                  {err.related_skills && err.related_skills.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[oklch(0.92_0.004_80)] flex items-center gap-2">
                      <span className="text-xs text-[oklch(0.50_0.01_260)] font-display font-medium">Compétences liées:</span>
                      <div className="flex gap-1 flex-wrap">
                        {err.related_skills.slice(0, 4).map(s => <span key={s} className="font-mono text-xs bg-[oklch(0.28_0.08_155)]/8 text-[oklch(0.28_0.08_155)] px-1.5 py-0.5 rounded">{s}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REPORTS TAB ── */}
        {activeTab === "reports" && (
          <div className="space-y-5">
            <h1 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">Rapports et exportations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Rapport de classe", desc: "Vue d'ensemble de la maîtrise, des erreurs, et des progrès de tous les élèves.", icon: BarChart2, format: "PDF / CSV" },
                { title: "Rapport individuel", desc: "Profil complet d'un élève: compétences, erreurs, profil d'apprenant, recommandations.", icon: Users, format: "PDF" },
                { title: "Analyse d'erreurs", desc: "Erreurs les plus fréquentes dans la classe avec stratégies de remédiation groupée.", icon: AlertTriangle, format: "PDF / CSV" },
                { title: "Progression curriculaire", desc: "Alignement avec le curriculum provincial et les attentes par niveau.", icon: BookOpen, format: "PDF" },
                { title: "Rapport pour la direction", desc: "Résumé exécutif des résultats de la classe pour la direction d'école.", icon: TrendingUp, format: "PDF" },
                { title: "Communication parentale", desc: "Rapport simplifié pour les parents avec recommandations à la maison.", icon: Bell, format: "PDF" },
              ].map((report, i) => (
                <div key={i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.28_0.08_155)]/8 flex items-center justify-center">
                      <report.icon size={18} className="text-[oklch(0.28_0.08_155)]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">{report.title}</h3>
                      <span className="text-xs font-mono text-[oklch(0.50_0.01_260)]">{report.format}</span>
                    </div>
                  </div>
                  <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed mb-4">{report.desc}</p>
                  <button className="w-full flex items-center justify-center gap-2 bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-lg py-2 text-sm font-display font-semibold hover:bg-[oklch(0.35_0.09_155)] transition-colors">
                    <Download size={14} /> Générer le rapport
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
