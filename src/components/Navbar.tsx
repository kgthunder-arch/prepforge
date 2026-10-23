import React, { useState } from "react";
import { Sun, Moon, Menu, X, CheckCircle2, Terminal } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  solvedCount: number;
  totalQuestions: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  solvedCount,
  totalQuestions,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const percentage = Math.round((solvedCount / totalQuestions) * 100);

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: PrepForge Brand Wordmark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0"
          title="PrepForge — Practice with purpose. Prepare to succeed."
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-[var(--text-on-accent)] font-black text-lg sm:text-xl shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105 shrink-0">
            P
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] truncate">
                Prep<span className="text-[var(--accent-primary)]">Forge</span>
              </span>
            </div>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[var(--text-secondary)]">
          <a
            href="#tracks"
            onClick={(e) => handleNavClick(e, "tracks")}
            className="nav-link-animated hover:text-[var(--accent-primary)] whitespace-nowrap cursor-pointer py-1"
          >
            Company Tracks
          </a>
          <a
            href="#questions"
            onClick={(e) => handleNavClick(e, "questions")}
            className="nav-link-animated hover:text-[var(--accent-primary)] whitespace-nowrap cursor-pointer py-1"
          >
            Practice Bank
          </a>
          <a
            href="#dashboard"
            onClick={(e) => handleNavClick(e, "dashboard")}
            className="nav-link-animated hover:text-[var(--accent-primary)] whitespace-nowrap cursor-pointer py-1"
          >
            Analytics
          </a>
          <a
            href="#lab"
            onClick={(e) => handleNavClick(e, "lab")}
            className="nav-link-animated hover:text-[var(--accent-primary)] whitespace-nowrap flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Terminal className="w-4 h-4 text-[var(--accent-primary)]" />
            Live Coding Lab
          </a>
          <a
            href="#leaderboard"
            onClick={(e) => handleNavClick(e, "leaderboard")}
            className="nav-link-animated hover:text-[var(--accent-primary)] whitespace-nowrap cursor-pointer py-1"
          >
            College Rankings
          </a>
        </nav>

        {/* Zone 3: Actions & Progress Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Progress Tracker Pill with animated fill track */}
          <div 
            onClick={(e) => handleNavClick(e, "questions")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs cursor-pointer hover:border-[var(--accent-primary)] transition-colors relative overflow-hidden group select-none"
            title="View solved questions"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-secondary)] transition-transform group-hover:scale-110" />
            <span className="text-[var(--text-secondary)]">Solved:</span>
            <span className="font-mono font-bold text-[var(--accent-primary)]">
              {solvedCount}/{totalQuestions}
            </span>
            <span className="text-[var(--text-muted)] font-mono">({percentage}%)</span>
            {/* Animated subtle progress bar fill line */}
            <div 
              className="absolute bottom-0 left-0 h-[2.5px] bg-[var(--accent-primary)] transition-[width] duration-300 ease-out" 
              style={{ width: `${percentage}%` }}
              aria-hidden="true"
            />
          </div>

          {/* Theme Switcher Button (44px touch target) */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-[var(--radius-md)] border border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)]"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[var(--accent-primary)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--accent-primary)]" />
            )}
          </button>

          {/* Desktop CTA Button */}
          <button
            onClick={(e) => handleNavClick(e, "questions")}
            className="hidden md:inline-flex btn-primary text-xs py-2 px-4 shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] cursor-pointer min-h-[38px]"
          >
            Start Practice
          </button>

          {/* Mobile Hamburger Button (44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-[var(--radius-md)] border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] cursor-pointer flex items-center justify-center hover:border-[var(--accent-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] transition-colors"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer with Viewport Containment */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          role="dialog"
          aria-label="Navigation Menu"
          className="lg:hidden border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-xl"
        >
          {/* Mobile Nav Links with comfortable min 44px tap targets */}
          <nav className="flex flex-col gap-1.5 text-sm font-semibold text-[var(--text-secondary)]">
            <a
              href="#tracks"
              onClick={(e) => handleNavClick(e, "tracks")}
              className="px-3.5 py-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] active:bg-[var(--accent-primary-dim)] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>Company Tracks</span>
              <span className="text-xs text-[var(--accent-primary)] font-mono">500+ Firms</span>
            </a>
            <a
              href="#questions"
              onClick={(e) => handleNavClick(e, "questions")}
              className="px-3.5 py-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] active:bg-[var(--accent-primary-dim)] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>Practice Bank</span>
              <span className="text-xs text-[var(--accent-primary)] font-mono">{totalQuestions} Problems</span>
            </a>
            <a
              href="#dashboard"
              onClick={(e) => handleNavClick(e, "dashboard")}
              className="px-3.5 py-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] active:bg-[var(--accent-primary-dim)] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>Analytics Dashboard</span>
              <span className="text-xs text-[var(--accent-primary)] font-mono">Progress &amp; Tiers</span>
            </a>
            <a
              href="#lab"
              onClick={(e) => handleNavClick(e, "lab")}
              className="px-3.5 py-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] active:bg-[var(--accent-primary-dim)] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent-primary)]" />
                Live Coding Lab
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-mono font-bold">
                Interactive
              </span>
            </a>
            <a
              href="#leaderboard"
              onClick={(e) => handleNavClick(e, "leaderboard")}
              className="px-3.5 py-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-card)] hover:text-[var(--accent-primary)] active:bg-[var(--accent-primary-dim)] cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>College Rankings</span>
              <span className="text-xs text-[var(--accent-primary)] font-mono">Top Campuses</span>
            </a>
          </nav>

          {/* Mobile Practice Progress Summary */}
          <div className="pt-3 border-t border-[var(--border-primary)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                Practice Progress:
              </span>
              <span className="font-mono font-bold text-[var(--accent-primary)]">
                {solvedCount} of {totalQuestions} Solved ({percentage}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div 
                className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={(e) => handleNavClick(e, "questions")}
              className="w-full btn-primary text-sm py-3 justify-center shadow-[var(--shadow-brutal)]"
            >
              Start Placement Practice
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
