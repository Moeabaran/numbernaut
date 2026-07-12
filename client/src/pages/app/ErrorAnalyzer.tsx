/**
 * Error Analyzer — Numbernaut
 * Deep-dive into the National Error Library with filtering and remediation planning.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import errorLibraryRaw from "@/data/error_library.json";

const errorLibrary = errorLibraryRaw as ErrorEntry[];
interface ErrorEntry { id?: string; category: string; name: string; description: string; example?: string; probable_cause: string; severity: string; grade_range?: string; related_skills: string[]; remediation_strategy: string; remediation_activities?: string[]; diagnostic_questions?: string[]; common_misconception?: string; teacher_note?: string; }

const SEV_CONFIG: Record<string, string> = { Critical: "bg-red-100 text-red-800", High: "bg-orange-100 text-orange-800", Medium: "bg-amber-100 text-amber-800", Low: "bg-green-100 text-green-800" };

export default function ErrorAnalyzer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = Array.from(new Set(errorLibrary.map(e => e.category)));
  const filtered = errorLibrary.filter(e => {
    const ms = !search || e.name.toLowerCase().includes(search.toLowerCase()) || (e.description || "").toLowerCase().includes(search.toLowerCase());
    const mc = category === "all" || e.category === category;
    const msev = severity === "all" || e.severity === severity;
    return ms && mc && msev;
  });

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)] flex flex-col">
      <header className="bg-[oklch(0.28_0.08_155)] text-[oklch(0.97_0.015_80)] sticky top-0 z-50 shadow-lg px-5 py-3 flex items-center gap-3">
        <Link href="/app/teacher"><button className="p-1.5 rounded-lg hover:bg-white/10"><ArrowLeft size={16} /></button></Link>
        <div>
          <div className="font-display font-bold text-sm">Analyseur d'erreurs</div>
          <div className="text-[oklch(0.72_0.14_75)] text-xs">{errorLibrary.length} erreurs documentées</div>
        </div>
      </header>
      <main className="flex-1 p-5 max-w-4xl mx-auto w-full space-y-4">
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.50_0.01_260)]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une erreur..." className="w-full pl-8 pr-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none">
            <option value="all">Toutes catégories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={severity} onChange={e => setSeverity(e.target.value)} className="px-3 py-2 text-sm border border-[oklch(0.88_0.01_80)] rounded-lg bg-white font-body focus:outline-none">
            <option value="all">Toute sévérité</option>
            {["Critical","High","Medium","Low"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <p className="font-body text-[oklch(0.50_0.01_260)] text-sm">{filtered.length} résultat(s)</p>
        <div className="space-y-2">
          {filtered.map((err, i) => (
            <div key={i} className="bg-white rounded-xl border border-[oklch(0.88_0.01_80)] shadow-sm overflow-hidden">
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left p-4 flex items-start gap-3 hover:bg-[oklch(0.97_0.015_80)] transition-colors">
                <AlertTriangle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {err.id && <span className="font-mono text-xs text-[oklch(0.35_0.09_155)] font-semibold">{err.id}</span>}
                    <span className="font-display font-bold text-[oklch(0.22_0.01_260)] text-sm">{err.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-display font-medium ${SEV_CONFIG[err.severity] || "bg-gray-100 text-gray-700"}`}>{err.severity}</span>
                    {err.grade_range && <span className="text-xs text-[oklch(0.50_0.01_260)] font-mono">Gr. {err.grade_range}</span>}
                  </div>
                  <p className="font-body text-[oklch(0.50_0.01_260)] text-xs mt-1 line-clamp-1">{err.description}</p>
                </div>
                {expanded === i ? <ChevronUp size={14} className="text-[oklch(0.50_0.01_260)] flex-shrink-0 mt-1" /> : <ChevronDown size={14} className="text-[oklch(0.50_0.01_260)] flex-shrink-0 mt-1" />}
              </button>
              {expanded === i && (
                <div className="px-4 pb-4 border-t border-[oklch(0.92_0.004_80)] pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Description</p>
                    <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{err.description}</p>
                    {err.example && <div className="mt-2 font-mono text-xs bg-[oklch(0.97_0.015_80)] border border-[oklch(0.88_0.01_80)] px-2 py-1.5 rounded">Exemple: {err.example}</div>}
                    {err.common_misconception && <p className="mt-2 text-amber-700 text-xs italic">{err.common_misconception}</p>}
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Cause probable</p>
                    <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed mb-2">{err.probable_cause}</p>
                    <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Remédiation</p>
                    <p className="font-body text-[oklch(0.22_0.01_260)] leading-relaxed">{err.remediation_strategy}</p>
                    {err.teacher_note && <p className="mt-2 text-[oklch(0.28_0.08_155)] text-xs font-medium">💡 {err.teacher_note}</p>}
                  </div>
                  {err.diagnostic_questions && err.diagnostic_questions.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="text-xs font-display font-semibold text-[oklch(0.50_0.01_260)] uppercase tracking-wider mb-1">Questions diagnostiques</p>
                      {err.diagnostic_questions.map((q, qi) => <p key={qi} className="font-body text-[oklch(0.22_0.01_260)] text-xs mb-1">• {q}</p>)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
