import React from "react";
import { ArrowRight, Building2, Target, CheckCircle2, Award, Terminal, Code2 } from "lucide-react";
import { Question } from "../data/sampleQuestions";
import { HeroParticles } from "./HeroParticles";

interface HeroProps {
  onExploreTracks: () => void;
  onStartPractice: () => void;
  featuredQuestion: Question;
  onSolveQuestion: (q: Question) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreTracks, 
  onStartPractice,
  featuredQuestion,
  onSolveQuestion
}) => {
  return (
    <section className="relative pt-4 pb-10 sm:pt-10 sm:pb-16 border-b border-[var(--border-primary)] bg-[radial-gradient(ellipse_at_top,_var(--accent-primary-dim)_0%,_transparent_70%)] overflow-hidden">
      {/* Sparse Floating Background Particles Layer */}
      <HeroParticles />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        {/* Kicker badge */}
        <div className="flex items-center gap-2 animate-hero-kicker">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[var(--accent-primary-dim)] border border-[var(--border-accent)] text-[11px] sm:text-xs font-bold text-[var(--accent-primary)] max-w-full truncate">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shrink-0" />
            <span className="truncate">PrepForge · Practice with purpose. Prepare to succeed.</span>
          </div>
        </div>

        {/* 2-Column Split: Headline & Immediate Problem Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Focused Placement Value Proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] font-[var(--font-display)] leading-[1.18] sm:leading-[1.15] break-words animate-hero-heading">
                Company-Specific Placement Preparation &amp; Coding Practice
              </h1>
              <p className="text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl animate-hero-desc">
                Practice verified coding problems and technical online assessment (OA) rounds on PrepForge from 500+ top hiring firms. From mass recruiter entrance tests (TCS NQT, Infosys InfyTQ) to product dream rounds (Google, Amazon, Microsoft, Zoho) — solve right in your browser.
              </p>
            </div>

            {/* Action Buttons: Responsive Stack on Narrow Screens, Inline on Tablet+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2 animate-hero-actions">
              <button
                onClick={onStartPractice}
                className="w-full sm:w-auto btn-primary text-xs sm:text-sm py-3 px-5 sm:px-6 min-h-[44px] justify-center shadow-[var(--shadow-brutal)]"
              >
                <span>Browse Question Bank</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
              <button
                onClick={onExploreTracks}
                className="w-full sm:w-auto btn-secondary text-xs sm:text-sm py-3 px-5 sm:px-6 min-h-[44px] justify-center"
              >
                <span>Explore Hiring Tracks</span>
              </button>
            </div>

            {/* Key Statistics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 animate-hero-stats">
              <div className="p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors">
                <span className="block text-base sm:text-xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                  12,500+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium leading-tight block mt-0.5">
                  Verified Questions
                </span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors">
                <span className="block text-base sm:text-xl font-extrabold font-mono tabular-nums text-[var(--text-primary)]">
                  500+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium leading-tight block mt-0.5">
                  Hiring Companies
                </span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors">
                <span className="block text-base sm:text-xl font-extrabold font-mono tabular-nums text-[var(--accent-primary)]">
                  ₹3.5–45 LPA
                </span>
                <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium leading-tight block mt-0.5">
                  Salary Tracks
                </span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-colors">
                <span className="block text-base sm:text-xl font-extrabold font-mono tabular-nums text-[var(--accent-secondary)]">
                  100% Free
                </span>
                <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium leading-tight block mt-0.5">
                  No Login Required
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Featured Placement Question Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between card p-4 sm:p-5 border-[var(--border-primary)] bg-[var(--bg-card)] shadow-lg space-y-3.5 sm:space-y-4 animate-hero-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-brand text-[11px] sm:text-xs font-bold">
                  Featured Daily Challenge
                </span>
                <span className="text-xs font-mono font-bold text-[var(--accent-secondary)]">
                  {featuredQuestion.salaryPackage}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {featuredQuestion.title}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--accent-primary)]">
                    {featuredQuestion.company} Round
                  </span>
                  <span>·</span>
                  <span>{featuredQuestion.category}</span>
                  <span>·</span>
                  <span className="badge badge-easy py-0.5 text-[10px] sm:text-xs">{featuredQuestion.difficulty}</span>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                {featuredQuestion.description}
              </p>

              {/* Sample Test Assertion */}
              <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] font-mono text-[11px] space-y-1 overflow-x-auto max-w-full">
                <span className="text-[var(--text-muted)] block">// Sample Test Case:</span>
                <div className="whitespace-pre">
                  <span className="text-[var(--text-muted)]">Input: </span>
                  <span className="text-[var(--text-primary)]">{featuredQuestion.testCases[0]?.input}</span>
                </div>
                <div className="whitespace-pre">
                  <span className="text-[var(--accent-secondary)]">Output: </span>
                  <span className="text-[var(--text-primary)] font-bold">{featuredQuestion.testCases[0]?.expectedOutput}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-primary)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <span className="text-[11px] text-[var(--text-muted)] text-center sm:text-left">
                Solve directly in live browser lab
              </span>
              <button
                onClick={() => onSolveQuestion(featuredQuestion)}
                className="btn-primary text-xs py-2.5 px-4 min-h-[40px] flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Solve Challenge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
