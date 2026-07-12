/**
 * Curriculum Map — Numbernaut
 * Canadian provincial curriculum alignment explorer.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Map, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import curriculumRaw from "@/data/curriculum_matrix.json";

const curriculumData = curriculumRaw as CurriculumData;
interface Expectation { id: string; description: string; micro_skill_domain: string; cpa_level: string; provincial_notes: Record<string, string>; }
interface GradeExpectations { grade: string; expectations: Expectation[]; }
interface Strand { strand: string; strand_code: string; description: string; grades: GradeExpectations[]; }
interface CurriculumData { curriculum_matrix: Strand[]; }

const PROVINCES = ["ON", "BC", "AB", "QC"];
const PROVINCE_NAMES: Record<string, string> = { ON: "Ontario", BC: "Colombie-Britannique", AB: "Alberta", QC: "Québec" };
const STRAND_COLORS: Record<string, string> = { A: "bg-blue-50 border-blue-200 text-blue-800", B: "bg-purple-50 border-purple-200 text-purple-800", C: "bg-green-50 border-green-200 text-green-800", D: "bg-amber-50 border-amber-200 text-amber-800", E: "bg-rose-50 border-rose-200 text-rose-800" };

export default function CurriculumMap() {
  const [selectedStrand, setSelectedStrand] = useState<string>("A");
  const [selectedGrade, setSelectedGrade] = useState<string>("3");
  const [selectedProvince, setSelectedProvince] = useState<string>("ON");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  const strands = curriculumData.curriculum_matrix || [];
  const strand = strands.find(s => s.strand_code === selectedStrand);
  const gradeData = strand?.grades.find(g => g.grade === selectedGrade);
  const expectations = gradeData?.expectations || [];

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg px-5 py-3 flex items-center gap-3">
        <Link href="/app/teacher"><button className="p-1.5 rounded-lg hover:bg-white/10"><ArrowLeft size={16} /></button></Link>
        <div>
          <div className="font-display font-bold text-sm">Carte curriculaire</div>
          <div className="text-[oklch(0.72_0.14_75)] text-xs">Alignement avec les curricula provinciaux canadiens</div>
        </div>
      </header>
      <main className="flex-1 p-5 max-w-5xl mx-auto w-full space-y-5">
        {/* Controls */}
        <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs block mb-1">Domaine</label>
              <select value={selectedStrand} onChange={e => setSelectedStrand(e.target.value)} className="w-full px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                {strands.map(s => <option key={s.strand_code} value={s.strand_code}>{s.strand_code} — {s.strand?.slice(0, 25)}</option>)}
              </select>
            </div>
            <div>
              <label className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs block mb-1">Niveau</label>
              <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)} className="w-full px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                <option value="K">Maternelle</option>
                {[1,2,3,4,5,6].map(g => <option key={g} value={g.toString()}>{g}e année</option>)}
              </select>
            </div>
            <div>
              <label className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-xs block mb-1">Province</label>
              <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)} className="w-full px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg font-body focus:outline-none">
                {PROVINCES.map(p => <option key={p} value={p}>{PROVINCE_NAMES[p]}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <div className={`w-full px-3 py-2 rounded-lg border font-display font-semibold text-sm text-center ${STRAND_COLORS[selectedStrand] || "bg-gray-50 border-gray-200 text-gray-700"}`}>
                {expectations.length} attente(s)
              </div>
            </div>
          </div>
        </div>

        {strand && (
          <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded border font-display font-bold ${STRAND_COLORS[selectedStrand] || ""}`}>{strand.strand_code}</span>
              <h2 className="font-display font-bold text-[oklch(0.22_0.01_260)] text-lg">{strand.strand}</h2>
            </div>
            <p className="font-body text-[oklch(0.50_0.01_260)] text-sm leading-relaxed">{strand.description}</p>
          </div>
        )}

        {expectations.length === 0 ? (
          <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm p-8 text-center">
            <BookOpen size={32} className="mx-auto mb-2 text-[oklch(0.50_0.01_260)]" />
            <p className="font-display font-semibold text-[oklch(0.22_0.01_260)]">Aucune attente trouvée</p>
            <p className="font-body text-[oklch(0.50_0.01_260)] text-sm mt-1">Sélectionnez un autre domaine ou niveau.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {expectations.map((exp, i) => (
              <div key={exp.id || i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
                <button onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)} className="w-full text-left p-4 flex items-start gap-3 hover:bg-[oklch(0.97_0.015_80)] transition-colors">
                  <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold mt-0.5 flex-shrink-0 w-20">{exp.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-[oklch(0.22_0.01_260)] text-sm leading-snug">{exp.description}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-[oklch(0.50_0.01_260)] font-body">Domaine: <span className="font-semibold">{exp.micro_skill_domain}</span></span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-display font-medium ${exp.cpa_level === "Concrete" ? "bg-blue-50 text-blue-700" : exp.cpa_level === "Pictorial" ? "bg-purple-50 text-purple-700" : exp.cpa_level === "Abstract" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}`}>{exp.cpa_level}</span>
                    </div>
                  </div>
                  {expandedExp === exp.id ? <ChevronUp size={14} className="text-[oklch(0.50_0.01_260)] flex-shrink-0 mt-1" /> : <ChevronDown size={14} className="text-[oklch(0.50_0.01_260)] flex-shrink-0 mt-1" />}
                </button>
                {expandedExp === exp.id && exp.provincial_notes && (
                  <div className="px-4 pb-4 border-t border-[oklch(0.92_0.004_80)] pt-3">
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-2">Notes provinciales</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {PROVINCES.map(prov => (
                        <div key={prov} className={`rounded-lg p-2 border ${selectedProvince === prov ? "border-[oklch(0.28_0.08_155)] bg-[oklch(0.28_0.08_155)]/5" : "border-[oklch(0.88_0.01_80)]"}`}>
                          <p className="font-display font-bold text-xs text-[oklch(0.22_0.01_260)] mb-1">{PROVINCE_NAMES[prov]}</p>
                          <p className="font-body text-[oklch(0.50_0.01_260)] text-xs leading-relaxed">{exp.provincial_notes?.[prov] || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
