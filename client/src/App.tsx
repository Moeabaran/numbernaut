import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// ── Marketing / documentation site ──────────────────────────────────────────
import Home from "./pages/Home";
import Pedagogy from "./pages/Pedagogy";
import Taxonomy from "./pages/Taxonomy";
import ErrorLibrary from "./pages/ErrorLibrary";
import Profiles from "./pages/Profiles";
import Platform from "./pages/Platform";
import Roadmap from "./pages/Roadmap";
import Research from "./pages/Research";

// ── Product application ──────────────────────────────────────────────────────
import AppPortal from "./app/AppPortal";
import StudentApp from "./pages/app/StudentApp";
import TeacherApp from "./pages/app/TeacherDashboard";
import ParentApp from "./pages/app/ParentDashboard";

// ── Additional tools ──────────────────────────────────────────────────────
import DiagnosticTool from "./pages/app/DiagnosticTool";
import SkillExplorer from "./pages/app/SkillExplorer";
import ErrorAnalyzer from "./pages/app/ErrorAnalyzer";
import ProfileMatcher from "./pages/app/ProfileMatcher";
import CurriculumMap from "./pages/app/CurriculumMap";

function Router() {
  return (
    <Switch>
      {/* ── Marketing site ── */}
      <Route path="/" component={Home} />
      <Route path="/pedagogy" component={Pedagogy} />
      <Route path="/taxonomy" component={Taxonomy} />
      <Route path="/error-library" component={ErrorLibrary} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/platform" component={Platform} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/research" component={Research} />

      {/* ── Product application ── */}
      <Route path="/app" component={AppPortal} />
      <Route path="/app/student" component={StudentApp} />
      <Route path="/app/student/*" component={StudentApp} />
      <Route path="/app/teacher" component={TeacherApp} />
      <Route path="/app/teacher/*" component={TeacherApp} />
      <Route path="/app/parent" component={ParentApp} />
      <Route path="/app/parent/*" component={ParentApp} />

      {/* ── Legacy tools ── */}
      <Route path="/app/diagnostic" component={DiagnosticTool} />
      <Route path="/app/skills" component={SkillExplorer} />
      <Route path="/app/errors" component={ErrorAnalyzer} />
      <Route path="/app/profiles" component={ProfileMatcher} />
      <Route path="/app/curriculum" component={CurriculumMap} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
