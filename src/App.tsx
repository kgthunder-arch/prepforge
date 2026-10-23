import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CompanyTracks } from "./components/CompanyTracks";
import { CompanyGroupedQuestions } from "./components/CompanyGroupedQuestions";
import { Dashboard } from "./components/Dashboard";
import { CodingLabPreview } from "./components/CodingLabPreview";
import { Leaderboard } from "./components/Leaderboard";
import { Footer } from "./components/Footer";
import { SAMPLE_QUESTIONS, Question } from "./data/sampleQuestions";
import { loadSolvedIds, saveSolvedIds } from "./utils/storage";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("prepforge_theme");
      return saved === "dark" || saved === "light" ? saved : "light";
    } catch {
      return "light";
    }
  });
  const [selectedTrack, setSelectedTrack] = useState<"all" | "product" | "service" | "exam">("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Easy" | "Medium" | "Hard">("all");
  const [activeLabQuestion, setActiveLabQuestion] = useState<Question>(SAMPLE_QUESTIONS[0]);

  // Persist solved questions safely with local storage & fallback
  const [solvedIds, setSolvedIds] = useState<string[]>(() => loadSolvedIds());

  // Sync theme to DOM and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("prepforge_theme", theme);
    } catch {
      // safe fallback if storage is unavailable
    }
  }, [theme]);

  // Save solved IDs safely
  useEffect(() => {
    saveSolvedIds(solvedIds);
  }, [solvedIds]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleToggleSolved = (id: string) => {
    setSolvedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSolveInLab = (question: Question) => {
    setActiveLabQuestion(question);
    const labEl = document.getElementById("lab");
    if (labEl) {
      labEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToQuestions = (topic?: string, difficulty?: "Easy" | "Medium" | "Hard") => {
    if (topic !== undefined || difficulty !== undefined) {
      setSelectedTrack("all");
      setSelectedCompany("all");
      setSelectedTopic(topic ?? "all");
      setSelectedDifficulty(difficulty ?? "all");
    }
    scrollTo("questions");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[var(--font-body)] antialiased transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        solvedCount={SAMPLE_QUESTIONS.filter((question) => solvedIds.includes(question.id)).length}
        totalQuestions={SAMPLE_QUESTIONS.length}
      />

      {/* Hero Section with Problem Spotlight */}
      <Hero
        onExploreTracks={() => scrollTo("tracks")}
        onStartPractice={() => scrollTo("questions")}
        featuredQuestion={SAMPLE_QUESTIONS[0]}
        onSolveQuestion={handleSolveInLab}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
        {/* Section 1: Company Hiring Tracks (from Tech Hike) */}
        <CompanyTracks
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
          onNavigateToQuestions={() => scrollTo("questions")}
          totalQuestions={SAMPLE_QUESTIONS.length}
        />

        {/* Section 2: Coding Question Practice Section Grouped by Company */}
        <CompanyGroupedQuestions
          questions={SAMPLE_QUESTIONS}
          solvedIds={solvedIds}
          onToggleSolved={handleToggleSolved}
          onSolveInLab={handleSolveInLab}
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
        />

        {/* Section 3: Readiness & Progress Analytics Dashboard with Difficulty Bar Chart */}
        <Dashboard
          questions={SAMPLE_QUESTIONS}
          solvedIds={solvedIds}
          onToggleSolved={handleToggleSolved}
          onNavigateToQuestions={navigateToQuestions}
          onSolveInLab={handleSolveInLab}
        />

        {/* Section 4: Live Coding Lab Preview */}
        <CodingLabPreview
          question={activeLabQuestion}
          allQuestions={SAMPLE_QUESTIONS}
          onSelectQuestion={setActiveLabQuestion}
          isSolved={solvedIds.includes(activeLabQuestion.id)}
          onToggleSolved={handleToggleSolved}
        />

        {/* Section 4: College Placement Leaderboard */}
        <Leaderboard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
