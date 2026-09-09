/**
 * Parent Dashboard — Numbernaut
 * A warm, accessible weekly summary for parents, plus a printable
 * curriculum-alignment portfolio report a parent can show a school board.
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Star, Flame, BookOpen, MessageCircle, CheckCircle, Clock, ArrowLeft, Printer, GraduationCap, FileCheck, Circle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import learnerProfilesRaw from "@/data/learner_profiles.json";
import microSkillsRaw from "@/data/micro_skills.json";
import ontarioCurriculumRaw from "@/data/ontario_curriculum_2020.json";
import evidenceBaseRaw from "@/data/evidence_base.json";

interface LearnerProfile {
  id: string; name: string; description: string;
  cognitive_profile: { strengths: string[]; weaknesses: string[] };
  mathematical_profile?: { strong_domains: string[]; weak_domains: string[]; error_patterns: string[]; mastery_gaps: string[] };
  instructional_recommendations: string[];
  parent_guidance: string;
  affective_profile: { math_anxiety: string; confidence: string; motivation: string };
}
interface MicroSkill {
  id: string; domain: string; domain_code: string; name: string; description: string;
  grade_introduced: string; cpa_level: string; prerequisites: string[]; mastery_criteria: string;
  assessment_type: string; difficulty: number; strand: string;
  ontario_strand_code: string; ontario_strand_title: string; ontario_overall_expectation: string;
}
interface OntarioExpectation { code: string; strand: string; strand_name: string; title: string; description: string; note?: string }
interface OntarioCurriculum {
  jurisdiction: string; curriculum_document: string; source_note: string; sources: string[];
  grades_covered_by_these_codes: string[];
  overall_expectations: OntarioExpectation[];
  kindergarten: { code: string; curriculum: string; effective: string; reference_document: string; note: string };
}
interface EvidenceResearchItem { claim: string; evidence: string; source: string; year: number }
interface EvidenceBase {
  cpa_framework: { definition: string; research_support: EvidenceResearchItem[] };
  mastery_learning: { definition: string; research_support: EvidenceResearchItem[] };
}

const learnerProfiles = learnerProfilesRaw as LearnerProfile[];
const microSkills = microSkillsRaw as MicroSkill[];
const ontarioCurriculum = ontarioCurriculumRaw as OntarioCurriculum;
const evidenceBase = (evidenceBaseRaw as { evidence_base: EvidenceBase }).evidence_base;

const CHILD = { name: "Emma Tremblay", grade: "3", school: "École Sainte-Marie", teacher: "Mme Leclerc", profile: "P003" };
const WEEKLY = { xpEarned: 120, skillsMastered: 3, streak: 8, sessionsCompleted: 5, totalMinutes: 47 };
const GRADE_ORDER = ["K", "1", "2", "3", "4", "5", "6", "7", "8"];

interface StrandCoverage { code: string; title: string; skills: MicroSkill[]; masteredCount: number }

function computeStrandCoverage(profile: LearnerProfile | undefined, grade: string): StrandCoverage[] {
  const gradeIdx = GRADE_ORDER.indexOf(grade);
  const gaps = new Set(profile && profile.mathematical_profile ? profile.mathematical_profile.mastery_gaps : []);
  const byStrand: Record<string, StrandCoverage> = {};
  microSkills.forEach((s) => {
    const sIdx = GRADE_ORDER.indexOf(s.grade_introduced);
    if (sIdx < 0 || sIdx > gradeIdx) return;
    const key = s.ontario_strand_code;
    if (!byStrand[key]) byStrand[key] = { code: key, title: s.ontario_strand_title, skills: [], masteredCount: 0 };
    byStrand[key].skills.push(s);
    if (!gaps.has(s.id)) byStrand[key].masteredCount += 1;
  });
  return Object.values(byStrand).sort((a, b) => a.code.localeCompare(b.code));
}

function findExpectation(code: string): { code: string; title: string; description: string; strand_name: string } {
  if (code === ontarioCurriculum.kindergarten.code) {
    return {
      code: ontarioCurriculum.kindergarten.code,
      title: ontarioCurriculum.kindergarten.curriculum,
      description: ontarioCurriculum.kindergarten.note,
      strand_name: "Continuum de mathématiques, maternelle à la 3e année",
    };
  }
  const found = ontarioCurriculum.overall_expectations.find((e) => e.code === code);
  if (found) return { code: found.code, title: found.title, description: found.description, strand_name: found.strand_name };
  return { code, title: code, description: "", strand_name: "" };
}

function pctColor(pct: number): string {
  if (pct >= 70) return "text-[oklch(0.35_0.09_155)]";
  if (pct >= 50) return "text-amber-600";
  return "text-red-600";
}
function barColor(pct: number): string {
  if (pct >= 70) return "bg-[oklch(0.35_0.09_155)]";
  if (pct >= 50) return "bg-amber-400";
  return "bg-red-400";
}

export default function ParentDashboard() {
  const [tab, setTab] = useState<"summary" | "skills" | "portfolio" | "tips">("summary");
  const [reportGrade, setReportGrade] = useState<string>(CHILD.grade);
  const profile = learnerProfiles.find((p) => p.id === CHILD.profile);

  const childGradeCoverage = useMemo(() => computeStrandCoverage(profile, CHILD.grade), [profile]);
  const reportCoverage = useMemo(() => computeStrandCoverage(profile, reportGrade), [profile, reportGrade]);
  const totalSkills = reportCoverage.reduce((sum, s) => sum + s.skills.length, 0);
  const totalMastered = reportCoverage.reduce((sum, s) => sum + s.masteredCount, 0);
  const overallPct = totalSkills > 0 ? Math.round((totalMastered / totalSkills) * 100) : 0;
  const chartData = reportCoverage.map((s) => ({
    code: s.code,
    pct: s.skills.length > 0 ? Math.round((s.masteredCount / s.skills.length) * 100) : 0,
  }));
  const reportDate = new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg no-print">
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
          {[
            { id: "summary", label: "Cette semaine" },
            { id: "skills", label: "Compétences" },
            { id: "portfolio", label: "Portfolio" },
            { id: "tips", label: "Conseils" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={"px-4 py-2.5 text-sm font-display font-medium border-b-2 transition-colors " + (tab === t.id ? "border-[oklch(0.72_0.14_75)] text-[oklch(0.72_0.14_75)]" : "border-transparent text-white/60 hover:text-white/90")}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-5 max-w-2xl mx-auto w-full space-y-5">
        {tab !== "portfolio" && (
          <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[oklch(0.28_0.08_155)] flex items-center justify-center text-[oklch(0.97_0.015_80)] font-display font-bold text-xl">
              {CHILD.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-lg">{CHILD.name}</h2>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{CHILD.grade}e année · {CHILD.school}</p>
              <p className="font-body text-[oklch(0.50_0.01_260)] text-xs">Enseignant(e): {CHILD.teacher}</p>
            </div>
          </div>
        )}

        {tab === "summary" && (
          <>
            <div className="bg-[oklch(0.28_0.08_155)] rounded-xl p-5 text-[oklch(0.97_0.015_80)]">
              <p className="text-[oklch(0.72_0.14_75)] text-xs font-display font-semibold uppercase tracking-wider mb-1">Résumé de la semaine</p>
              <h3 className="font-display font-bold text-xl mb-4">
                {WEEKLY.skillsMastered > 0 ? "🎉 Emma a maîtrisé " + WEEKLY.skillsMastered + " nouvelles compétences !" : "Bonne semaine de pratique !"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "XP gagnés", value: "+" + WEEKLY.xpEarned, icon: Star },
                  { label: "Série", value: WEEKLY.streak + " jours", icon: Flame },
                  { label: "Sessions", value: String(WEEKLY.sessionsCompleted), icon: BookOpen },
                  { label: "Temps total", value: WEEKLY.totalMinutes + " min", icon: Clock },
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
            <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-1">Progression par volet du curriculum ontarien</h3>
            <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mb-4">Basé sur les compétences couvertes de la maternelle à la {CHILD.grade}e année, alignées au code de curriculum officiel de l'Ontario.</p>
            {childGradeCoverage.map((s) => {
              const exp = findExpectation(s.code);
              const pct = s.skills.length > 0 ? Math.round((s.masteredCount / s.skills.length) * 100) : 0;
              return (
                <div key={s.code} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-display font-semibold text-[oklch(0.22_0.01_260)]">
                      <span className="inline-block bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] text-[10px] rounded px-1.5 py-0.5 mr-1.5 align-middle">{s.code}</span>
                      {exp.strand_name || s.title}
                    </span>
                    <span className={"font-display font-bold " + pctColor(pct)}>{pct}%</span>
                  </div>
                  <div className="bg-[oklch(0.92_0.004_80)] rounded-full h-2.5">
                    <div className={"h-2.5 rounded-full transition-all " + barColor(pct)} style={{ width: pct + "%" }} />
                  </div>
                  <p className="text-xs text-[oklch(0.50_0.01_260)] mt-0.5 font-body">{s.masteredCount} compétences maîtrisées sur {s.skills.length}</p>
                </div>
              );
            })}
          </div>
        )}

        {tab === "portfolio" && (
          <>
            <style>{"@media print { body * { visibility: hidden; } #portfolio-report, #portfolio-report * { visibility: visible; } #portfolio-report { position: absolute; left: 0; top: 0; width: 100%; padding: 24px; } .no-print { display: none !important; } }"}</style>

            <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4 flex flex-wrap items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2">
                <label className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider">Année scolaire jusqu'à</label>
                <select
                  value={reportGrade}
                  onChange={(e) => setReportGrade(e.target.value)}
                  className="border border-[oklch(0.88_0.01_80)] rounded-lg px-2 py-1.5 text-sm font-body"
                >
                  {GRADE_ORDER.map((g) => (
                    <option key={g} value={g}>{g === "K" ? "Maternelle" : g + "e année"}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] rounded-lg px-4 py-2 text-sm font-display font-semibold hover:bg-[oklch(0.35_0.09_155)] transition-colors flex items-center gap-2"
              >
                <Printer size={14} /> Imprimer / Exporter en PDF
              </button>
            </div>

            <div id="portfolio-report" className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-[oklch(0.92_0.004_80)] pb-4">
                <div>
                  <p className="text-[oklch(0.72_0.14_75)] text-xs font-display font-semibold uppercase tracking-wider mb-1">Rapport de progression pédagogique</p>
                  <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-xl">{CHILD.name}</h2>
                  <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">
                    {reportGrade === "K" ? "Maternelle" : reportGrade + "e année"} · {CHILD.school} · Enseignant(e): {CHILD.teacher}
                  </p>
                </div>
                <div className="text-right">
                  <GraduationCap size={28} className="text-[oklch(0.28_0.08_155)] ml-auto mb-1" />
                  <p className="font-body text-[oklch(0.50_0.01_260)] text-xs">Généré le {reportDate}</p>
                </div>
              </div>

              <div className="bg-[oklch(0.72_0.14_75)]/10 rounded-xl p-4 border border-[oklch(0.72_0.14_75)]/20">
                <p className="font-body text-[oklch(0.22_0.01_260)] text-sm leading-relaxed">
                  Ce rapport présente la progression de {CHILD.name.split(" ")[0]} en mathématiques, organisée selon les attentes globales du{" "}
                  <strong>{ontarioCurriculum.curriculum_document}</strong>. Chaque compétence pratiquée dans Numbernaut est associée à un code de
                  curriculum officiel afin de faciliter le suivi par l'école ou le conseil scolaire.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Couverture curriculaire globale</h3>
                  <span className={"font-display font-bold text-lg " + pctColor(overallPct)}>{overallPct}%</span>
                </div>
                <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mb-3">{totalMastered} compétences maîtrisées sur {totalSkills} couvertes jusqu'à ce niveau.</p>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 80)" />
                      <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => v + "%"} />
                      <Bar dataKey="pct" fill="oklch(0.28 0.08 155)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Détail par volet du curriculum</h3>
                {reportCoverage.map((s) => {
                  const exp = findExpectation(s.code);
                  const pct = s.skills.length > 0 ? Math.round((s.masteredCount / s.skills.length) * 100) : 0;
                  return (
                    <div key={s.code} className="border border-[oklch(0.92_0.004_80)] rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-block bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] text-[10px] rounded px-1.5 py-0.5">{s.code}</span>
                          <span className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm">{exp.strand_name || s.title}</span>
                        </div>
                        <span className={"font-display font-bold text-sm " + pctColor(pct)}>{pct}% ({s.masteredCount}/{s.skills.length})</span>
                      </div>
                      {exp.title && (
                        <p className="font-body text-[oklch(0.50_0.01_260)] text-xs italic mb-2">« {exp.title} »</p>
                      )}
                      <div className="bg-[oklch(0.92_0.004_80)] rounded-full h-2 mb-2">
                        <div className={"h-2 rounded-full " + barColor(pct)} style={{ width: pct + "%" }} />
                      </div>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {s.skills.slice(0, 8).map((sk) => {
                          const mastered = !(profile && profile.mathematical_profile && profile.mathematical_profile.mastery_gaps.includes(sk.id));
                          return (
                            <li key={sk.id} className="flex items-center gap-1.5 text-xs font-body text-[oklch(0.35_0.01_260)]">
                              {mastered ? <CheckCircle size={11} className="text-[oklch(0.35_0.09_155)] flex-shrink-0" /> : <Circle size={11} className="text-[oklch(0.75_0.01_260)] flex-shrink-0" />}
                              <span className="truncate">{sk.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                      {s.skills.length > 8 && (
                        <p className="text-[10px] text-[oklch(0.60_0.01_260)] font-body mt-1">+ {s.skills.length - 8} autres compétences dans ce volet</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[oklch(0.92_0.004_80)] pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileCheck size={16} className="text-[oklch(0.28_0.08_155)]" />
                  <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">Assises pédagogiques</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-[oklch(0.97_0.015_80)] rounded-lg p-3">
                    <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs mb-1">Approche Concret-Pictural-Abstrait (CPA)</p>
                    <p className="font-body text-[oklch(0.50_0.01_260)] text-xs leading-relaxed mb-1">{evidenceBase.cpa_framework.definition}</p>
                    {evidenceBase.cpa_framework.research_support[0] && (
                      <p className="font-body text-[oklch(0.60_0.01_260)] text-[10px] italic">Source : {evidenceBase.cpa_framework.research_support[0].source}</p>
                    )}
                  </div>
                  <div className="bg-[oklch(0.97_0.015_80)] rounded-lg p-3">
                    <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs mb-1">Apprentissage par la maîtrise</p>
                    <p className="font-body text-[oklch(0.50_0.01_260)] text-xs leading-relaxed mb-1">{evidenceBase.mastery_learning.definition}</p>
                    {evidenceBase.mastery_learning.research_support[0] && (
                      <p className="font-body text-[oklch(0.60_0.01_260)] text-[10px] italic">Source : {evidenceBase.mastery_learning.research_support[0].source}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-[oklch(0.92_0.004_80)] pt-3">
                <p className="font-body text-[oklch(0.60_0.01_260)] text-[10px] leading-relaxed">
                  Généré par Numbernaut le {reportDate}. Alignement curriculaire basé sur : {ontarioCurriculum.sources.join(" · ")}.
                  {ontarioCurriculum.source_note ? " " + ontarioCurriculum.source_note : ""}
                </p>
              </div>
            </div>
          </>
        )}

        {tab === "tips" && profile && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-5">
              <h3 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm mb-3">Conseils pour soutenir Emma à la maison</h3>
              {profile.instructional_recommendations.slice(0, 5).map((rec, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[oklch(0.92_0.004_80)] last:border-0">
                  <span className="w-6 h-6 rounded-full bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
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
