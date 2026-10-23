import React from "react";
import { Rocket, Server, Target, Building2, ChevronRight, Check } from "lucide-react";

interface CompanyTracksProps {
  selectedTrack: "all" | "product" | "service" | "exam";
  onSelectTrack: (track: "all" | "product" | "service" | "exam") => void;
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
  onNavigateToQuestions?: () => void;
  totalQuestions?: number;
}

export const CompanyTracks: React.FC<CompanyTracksProps> = ({
  selectedTrack,
  onSelectTrack,
  selectedCompany,
  onSelectCompany,
  onNavigateToQuestions,
  totalQuestions = 15,
}) => {
  const tracks = [
    { 
      id: "all", 
      label: "All Hiring Tracks", 
      icon: Building2, 
      count: "500+ Companies",
      desc: "Full collection of campus placement questions & national entrance exams.",
      rounds: "Online Assessments, Technical Interviews, Aptitude",
      avgPackage: "₹3.5–45 LPA"
    },
    { 
      id: "product", 
      label: "Product-Based", 
      icon: Rocket, 
      count: "45+ Top Product Firms",
      desc: "Deep DSA, System Design, and algorithmic problem solving rounds.",
      rounds: "SDE OA (2 Coding Questions), DSA Problem Solving",
      avgPackage: "₹18–45 LPA"
    },
    { 
      id: "service", 
      label: "Service-Based", 
      icon: Server, 
      count: "35+ IT Services Firms",
      desc: "High-volume campus recruitment rounds focusing on core coding and aptitude.",
      rounds: "Hands-on Coding + Analytical Aptitude & Verbal",
      avgPackage: "₹3.5–9 LPA"
    },
    { 
      id: "exam", 
      label: "Entrance Exams", 
      icon: Target, 
      count: "30+ National Exams",
      desc: "Dedicated question patterns for TCS NQT, Infosys InfyTQ & DSE, Wipro NLTH.",
      rounds: "Foundation + Advanced Coding Evaluation",
      avgPackage: "₹3.5–10 LPA"
    },
  ];

  const featuredCompanies = [
    { name: "Google", tag: "product", package: "₹25–45 LPA", role: "SDE 1 OA" },
    { name: "Amazon", tag: "product", package: "₹20–42 LPA", role: "SDE Online Assessment" },
    { name: "Microsoft", tag: "product", package: "₹22–45 LPA", role: "Software Engineer" },
    { name: "TCS", tag: "exam", package: "₹3.5–9 LPA", role: "NQT Foundation/Digital" },
    { name: "Infosys", tag: "exam", package: "₹6.5–9.5 LPA", role: "InfyTQ / DSE" },
    { name: "Zoho", tag: "product", package: "₹6–12 LPA", role: "Core Developer Round" },
    { name: "Wipro", tag: "service", package: "₹3.5–6.5 LPA", role: "NLTH Elite" },
    { name: "Accenture", tag: "service", package: "₹4.5–8.5 LPA", role: "ASE / FSE" },
    { name: "Flipkart", tag: "product", package: "₹18–32 LPA", role: "SDE OA Round" },
  ];

  const handleTrackClick = (trackId: "all" | "product" | "service" | "exam") => {
    onSelectTrack(trackId);
    onSelectCompany("all");
    if (onNavigateToQuestions) {
      onNavigateToQuestions();
    }
  };

  const handleCompanyClick = (companyName: string) => {
    onSelectCompany(companyName);
    if (onNavigateToQuestions) {
      onNavigateToQuestions();
    }
  };

  return (
    <section id="tracks" className="space-y-6 pt-2 sm:pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Company Placement Tracks &amp; Curricula
            </h2>
            <span className="badge badge-brand text-[10px] sm:text-xs">Structured Categorization</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Choose a hiring track to instantly filter questions matching that company recruitment profile.
          </p>
        </div>

        <span className="text-[11px] sm:text-xs text-[var(--text-muted)] font-mono">
          Clicking any track or company updates the Question Bank below
        </span>
      </div>

      {/* Track Selection Cards with Detailed Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {tracks.map((track) => {
          const Icon = track.icon;
          const isActive = selectedTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => handleTrackClick(track.id as any)}
              className={`p-4 rounded-[var(--radius-lg)] border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                isActive
                  ? "border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-[var(--shadow-brutal)] ring-1 ring-[var(--accent-primary)]"
                  : "border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--border-secondary)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold"
                        : "bg-[var(--bg-tertiary)] text-[var(--accent-primary)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                    {track.avgPackage}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {track.label}
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
                    {track.count}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {track.desc}
                </p>

                <div className="p-2 rounded bg-[var(--bg-input)] border border-[var(--border-primary)] text-[11px] text-[var(--text-muted)]">
                  <strong className="text-[var(--text-secondary)] block">Evaluation:</strong>
                  {track.rounds}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-primary)] flex items-center justify-between text-xs font-semibold">
                <span className={isActive ? "text-[var(--accent-primary)] font-bold flex items-center gap-1" : "text-[var(--text-muted)]"}>
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      Filter Active
                    </>
                  ) : (
                    "Filter Questions"
                  )}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-1 text-[var(--accent-primary)]" : "text-[var(--text-muted)]"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured Company Quick Chips */}
      <div className="p-3.5 sm:p-4 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Quick Company Filter:
          </span>
          {selectedCompany !== "all" && (
            <button
              onClick={() => onSelectCompany("all")}
              className="text-xs text-[var(--accent-primary)] font-semibold hover:underline self-start sm:self-auto cursor-pointer"
            >
              Reset Company Filter ({selectedCompany}) &times;
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectCompany("all")}
            className={`min-h-[38px] px-3 py-2 rounded-[var(--radius-md)] text-xs font-semibold border transition-all cursor-pointer ${
              selectedCompany === "all"
                ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] border-[var(--accent-primary)] shadow-sm font-bold"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
            }`}
          >
            All Companies ({totalQuestions} Questions)
          </button>

          {featuredCompanies.map((c) => {
            const isCompanyActive = selectedCompany === c.name;
            return (
              <button
                key={c.name}
                onClick={() => handleCompanyClick(c.name)}
                className={`min-h-[38px] px-3 py-2 rounded-[var(--radius-md)] text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCompanyActive
                    ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] border-[var(--accent-primary)] shadow-sm font-bold"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{c.name}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isCompanyActive ? "bg-black/20 text-[var(--text-on-accent)]" : "text-[var(--text-muted)]"
                }`}>
                  {c.package}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
