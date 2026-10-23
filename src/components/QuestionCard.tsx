import React, { useState } from "react";
import { 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  Terminal, 
  BookOpen, 
  Clock, 
  Building2, 
  TrendingUp,
  Code,
  Copy,
  Check
} from "lucide-react";
import { Question } from "../data/sampleQuestions";

interface QuestionCardProps {
  question: Question;
  isSolved: boolean;
  onToggleSolved: (id: string) => void;
  onSolveInLab: (question: Question) => void;
  index?: number;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSolved,
  onToggleSolved,
  onSolveInLab,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  const isDetailOpen = isExpanded !== undefined ? isExpanded : internalExpanded;

  const handleToggleDetails = () => {
    if (onToggleExpand) {
      onToggleExpand(question.id);
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const handleCopySolution = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(question.sampleSolution.code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = question.sampleSolution.code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    } catch {
      // safe fallback
    }
  };

  const getDifficultyBadge = (diff: "Easy" | "Medium" | "Hard") => {
    switch (diff) {
      case "Easy":
        return <span className="badge badge-easy">Easy</span>;
      case "Medium":
        return <span className="badge badge-medium">Medium</span>;
      case "Hard":
        return <span className="badge badge-hard">Hard</span>;
    }
  };

  return (
    <article
      id={`question-card-${question.id}`}
      style={index !== undefined ? { animationDelay: `${Math.min(index * 40, 200)}ms` } : undefined}
      className={`card overflow-hidden transition-all animate-card-reveal ${
        isSolved
          ? "border-[var(--accent-secondary)]/50 bg-[var(--bg-card)]/90"
          : "border-[var(--border-primary)] hover:border-[var(--accent-primary)]"
      }`}
    >
      {/* Top Main Bar */}
      <div className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left Info: Checkbox, Title, Company & Difficulty */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Mark as Solved Button (min 40px touch target, accessible checkbox) */}
          <button
            onClick={() => onToggleSolved(question.id)}
            role="checkbox"
            aria-checked={isSolved}
            className="p-2 -m-1 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
            title={isSolved ? `Mark "${question.title}" as unsolved` : `Mark "${question.title}" as solved`}
            aria-label={isSolved ? `Mark ${question.title} as unsolved` : `Mark ${question.title} as solved`}
          >
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-secondary)] animate-check-pop" />
            ) : (
              <Circle className="w-5 h-5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform active:scale-90" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
              <h3 className={`text-sm sm:text-base font-bold tracking-tight break-words transition-colors ${
                isSolved ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"
              }`}>
                {question.title}
              </h3>
              {getDifficultyBadge(question.difficulty)}
              <span className="badge badge-brand flex items-center gap-1 text-[10px] sm:text-xs">
                <Building2 className="w-3 h-3" />
                {question.company}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs text-[var(--text-muted)]">
              <span>{question.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[var(--accent-primary)] font-semibold">
                {question.salaryPackage}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Acc: {question.acceptanceRate}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Responsive on narrow screens */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-primary)]/60 shrink-0">
          <button
            onClick={() => onSolveInLab(question)}
            className="flex-1 md:flex-initial btn-primary text-xs py-2 px-3.5 min-h-[38px] flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Solve in Lab</span>
          </button>

          <button
            onClick={handleToggleDetails}
            aria-expanded={isDetailOpen}
            aria-controls={`question-details-${question.id}`}
            className="flex-1 md:flex-initial btn-secondary text-xs py-2 px-3.5 min-h-[38px] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{isDetailOpen ? "Hide Details" : "Details"}</span>
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
                isDetailOpen ? "rotate-180" : "rotate-0"
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Expandable Details Container with CSS Grid Accordion */}
      <div 
        id={`question-details-${question.id}`}
        role="region"
        aria-label={`Details for ${question.title}`}
        className={`accordion-grid ${isDetailOpen ? "is-open" : ""}`}
      >
        <div className="accordion-inner">
          <div className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]/50 p-3.5 sm:p-6 space-y-4 sm:space-y-5">
            {/* Problem Statement */}
            <div className="space-y-1.5 sm:space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Problem Description
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {question.description}
              </p>
            </div>

            {/* Test Cases */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Sample Evaluation Cases:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.testCases.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] font-mono text-xs space-y-1.5 overflow-x-auto max-w-full"
                  >
                    <div className="whitespace-pre">
                      <span className="text-[var(--text-muted)]">Input: </span>
                      <span className="text-[var(--text-primary)]">{tc.input}</span>
                    </div>
                    <div className="whitespace-pre">
                      <span className="text-[var(--accent-secondary)]">Output: </span>
                      <span className="text-[var(--text-primary)] font-bold">{tc.expectedOutput}</span>
                    </div>
                    {tc.explanation && (
                      <div className="text-[11px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-primary)]/60 font-sans">
                        {tc.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Constraints:
              </h4>
              <ul className="list-disc list-inside text-xs font-mono text-[var(--text-secondary)] space-y-0.5 break-words">
                {question.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Sample Solution Toggle */}
            <div className="pt-2 border-t border-[var(--border-primary)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-xs font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <Code className="w-3.5 h-3.5" />
                  {showSolution ? "Hide Sample Solution & Complexity" : "Reveal Sample Solution & Complexity"}
                </button>

                <button
                  onClick={() => onToggleSolved(question.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded transition-all cursor-pointer self-start sm:self-auto ${
                    isSolved
                      ? "bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  {isSolved ? "✓ Completed in Session" : "Mark as Completed"}
                </button>
              </div>

              {showSolution && (
                <div className="mt-3 p-3.5 sm:p-4 rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] space-y-3 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[var(--text-muted)] font-mono text-[11px] sm:text-xs">
                      <span>Lang: <strong className="text-[var(--accent-primary)]">{question.sampleSolution.language}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Time: <strong className="text-[var(--text-primary)]">{question.sampleSolution.timeComplexity}</strong>
                      </span>
                      <span>·</span>
                      <span>Space: <strong className="text-[var(--text-primary)]">{question.sampleSolution.spaceComplexity}</strong></span>
                    </div>

                    <button
                      onClick={handleCopySolution}
                      className="px-2.5 py-1 rounded text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer border bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] text-[var(--text-secondary)]"
                      title="Copy sample solution to clipboard"
                      aria-label="Copy sample solution to clipboard"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="w-3 h-3 text-[var(--accent-secondary)]" />
                          <span className="text-[var(--accent-secondary)] font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[var(--accent-primary)]" />
                          <span>Copy Solution</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="font-mono text-xs text-[var(--text-primary)] overflow-x-auto max-w-full p-3 rounded bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                    <code>{question.sampleSolution.code}</code>
                  </pre>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <strong>Approach:</strong> {question.sampleSolution.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
