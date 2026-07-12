/**
 * Numbernaut — App Portal
 * The entry point for the product application.
 * Users select their role (Student / Teacher / Parent) and enter the app.
 */
import { Link } from "wouter";
import { GraduationCap, Star, Users, BookOpen, Shield, Wifi } from "lucide-react";

export default function AppPortal() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d3320 0%, #1a5c38 50%, #0d3320 100%)" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c8a84b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c8a84b 0%, transparent 40%)" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-green-900 font-bold text-xl shadow-lg">N</div>
          <div className="text-left">
            <div className="text-white font-bold text-xl leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>Numbernaut</div>
            <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Canada</div>
          </div>
        </div>

        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Qui êtes-vous aujourd'hui ?
        </h1>
        <p className="text-white/60 text-base mb-12">Sélectionnez votre profil pour accéder à votre espace personnalisé.</p>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Student */}
          <Link href="/app/student">
            <div className="group cursor-pointer bg-white/10 hover:bg-amber-400/20 border border-white/20 hover:border-amber-400/60 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/20">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 group-hover:bg-amber-400/40 flex items-center justify-center mx-auto mb-5 transition-colors">
                <Star className="text-amber-400" size={32} />
              </div>
              <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Élève</h2>
              <p className="text-white/60 text-sm leading-relaxed">Maternelle à 6e année. Explore le Royaume des Nombres et deviens Gardien des Nombres !</p>
              <div className="mt-6 inline-flex items-center gap-2 text-amber-400 text-sm font-semibold">
                Entrer dans le monde →
              </div>
            </div>
          </Link>

          {/* Teacher */}
          <Link href="/app/teacher">
            <div className="group cursor-pointer bg-white/10 hover:bg-green-400/20 border border-white/20 hover:border-green-400/60 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
              <div className="w-16 h-16 rounded-2xl bg-green-400/20 group-hover:bg-green-400/40 flex items-center justify-center mx-auto mb-5 transition-colors">
                <GraduationCap className="text-green-400" size={32} />
              </div>
              <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Enseignant(e)</h2>
              <p className="text-white/60 text-sm leading-relaxed">Tableau de bord complet. Diagnostics, profils d'apprenants, bibliothèque d'erreurs et plans d'intervention.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-green-400 text-sm font-semibold">
                Accéder au tableau de bord →
              </div>
            </div>
          </Link>

          {/* Parent */}
          <Link href="/app/parent">
            <div className="group cursor-pointer bg-white/10 hover:bg-blue-400/20 border border-white/20 hover:border-blue-400/60 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20">
              <div className="w-16 h-16 rounded-2xl bg-blue-400/20 group-hover:bg-blue-400/40 flex items-center justify-center mx-auto mb-5 transition-colors">
                <Users className="text-blue-400" size={32} />
              </div>
              <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Parent</h2>
              <p className="text-white/60 text-sm leading-relaxed">Suivez la progression de votre enfant. Résumés hebdomadaires, jalons de maîtrise et conseils pratiques.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-blue-400 text-sm font-semibold">
                Voir la progression →
              </div>
            </div>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs">
          <div className="flex items-center gap-2"><Shield size={14} /><span>100% hors ligne — aucune donnée envoyée</span></div>
          <div className="flex items-center gap-2"><Wifi size={14} className="line-through" /><span>Fonctionne sans internet</span></div>
          <div className="flex items-center gap-2"><BookOpen size={14} /><span>Aligné sur les curricula canadiens</span></div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Retour au site de présentation
          </Link>
        </div>
      </div>
    </div>
  );
}
