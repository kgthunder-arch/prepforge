import React, { useState, useMemo } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Cell, 
  CartesianGrid 
} from "recharts";
import { 
  Search, 
  Filter, 
  Building2, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2,
  Tag,
  X,
  Shuffle,
  ChevronsUpDown,
  Trophy,
  BarChart3
} from "lucide-react";
import { Question, SAMPLE_QUESTIONS } from "../data/sampleQuestions";
import { QuestionCard } from "./QuestionCard";

interface CompanyGroupedQuestionsProps {
  questions: Question[];
  solvedIds: string[];
  onToggleSolved: (id: string) => void;
  onSolveInLab: (question: Question) => void;
  selectedTrack: "all" | "product" | "service" | "exam";
  onSelectTrack?: (track: "all" | "product" | "service" | "exam") => void;
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
  selectedDifficulty: "all" | "Easy" | "Medium" | "Hard";
  onSelectDifficulty: (difficulty: "all" | "Easy" | "Medium" | "Hard") => void;
}

// Custom Recharts Tooltip for Difficulty Bar Chart
const DifficultyBarChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2.5 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-[var(--radius-md)] shadow-xl text-xs space-y-1 font-sans min-w-[140px] z-50">
        <div className="flex items-center justify-between gap-2 border-b border-[var(--border-primary)] pb-1">
          <span className="font-bold flex items-center gap-1.5 text-[var(--text-primary)]">
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block" 
              style={{ backgroundColor: data.color }} 
            />
            {data.difficulty} Tier
          </span>
          <span className="font-mono font-bold" style={{ color: data.color }}>
            {data.solved} Solved
          </span>
        </div>
        <div className="text-[11px] text-[var(--text-secondary)] flex justify-between">
          <span>Total in Bank:</span>
          <span className="font-mono font-semibold text-[var(--text-primary)]">{data.total}</span>
        </div>
        <div className="text-[11px] text-[var(--text-secondary)] flex justify-between">
          <span>Completion:</span>
          <span className="font-mono font-semibold text-[var(--accent-primary)]">{data.rate}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const CompanyGroupedQuestions: React.FC<CompanyGroupedQuestionsProps> = ({
  questions,
  solvedIds,
  onToggleSolved,
  onSolveInLab,
  selectedTrack,
  onSelectTrack,
  selectedCompany,
  onSelectCompany,
  selectedTopic,
  onSelectTopic,
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unsolved" | "solved">("all");
  const [viewMode, setViewMode] = useState<"grouped" | "flat">("grouped");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Distinct topics / categories
  const uniqueTopics = useMemo(() => {
    const set = new Set<string>();
    for (const q of questions) {
      if (q.category) set.add(q.category);
    }
    return Array.from(set).sort();
  }, [questions]);

  // Distinct companies
  const uniqueCompanies = useMemo(() => {
    return Array.from(new Set(questions.map((q) => q.company))).sort();
  }, [questions]);

  // Difficulty groupings for stats
  const easyQuestions = useMemo(() => questions.filter((q) => q.difficulty === "Easy"), [questions]);
  const mediumQuestions = useMemo(() => questions.filter((q) => q.difficulty === "Medium"), [questions]);
  const hardQuestions = useMemo(() => questions.filter((q) => q.difficulty === "Hard"), [questions]);

  const easySolved = useMemo(() => easyQuestions.filter((q) => solvedIds.includes(q.id)).length, [easyQuestions, solvedIds]);
  const mediumSolved = useMemo(() => mediumQuestions.filter((q) => solvedIds.includes(q.id)).length, [mediumQuestions, solvedIds]);
  const hardSolved = useMemo(() => hardQuestions.filter((q) => solvedIds.includes(q.id)).length, [hardQuestions, solvedIds]);

  const totalQuestions = questions.length;
  const totalSolved = questions.filter((q) => solvedIds.includes(q.id)).length;
  const overallPercentage = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

  // Recharts Bar Chart: number of questions solved by difficulty level (Easy, Medium, Hard)
  // Filtering and counting from SAMPLE_QUESTIONS using solvedIds state
  const difficultyBarData = useMemo(() => {
    const easyCount = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Easy" && solvedIds.includes(q.id)
    ).length;
    const easyTot = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Easy").length;

    const mediumCount = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Medium" && solvedIds.includes(q.id)
    ).length;
    const mediumTot = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Medium").length;

    const hardCount = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Hard" && solvedIds.includes(q.id)
    ).length;
    const hardTot = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Hard").length;

    return [
      {
        difficulty: "Easy",
        solved: easyCount,
        total: easyTot,
        rate: easyTot > 0 ? Math.round((easyCount / easyTot) * 100) : 0,
        color: "var(--difficulty-easy)",
      },
      {
        difficulty: "Medium",
        solved: mediumCount,
        total: mediumTot,
        rate: mediumTot > 0 ? Math.round((mediumCount / mediumTot) * 100) : 0,
        color: "var(--difficulty-medium)",
      },
      {
        difficulty: "Hard",
        solved: hardCount,
        total: hardTot,
        rate: hardTot > 0 ? Math.round((hardCount / hardTot) * 100) : 0,
        color: "var(--difficulty-hard)",
      },
    ];
  }, [solvedIds]);

  // Filter questions based on search, track, company, topic, difficulty, and solved status
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return questions.filter((q) => {
      const matchesSearch =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query) ||
        q.company.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query);

      const matchesTrack = selectedTrack === "all" || q.companyType === selectedTrack;
      const matchesCompany = selectedCompany === "all" || q.company.toLowerCase() === selectedCompany.toLowerCase();
      const matchesTopic = selectedTopic === "all" || q.category.toLowerCase() === selectedTopic.toLowerCase();
      const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;

      const isSolved = solvedIds.includes(q.id);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "solved" && isSolved) ||
        (statusFilter === "unsolved" && !isSolved);

      return matchesSearch && matchesTrack && matchesCompany && matchesTopic && matchesDifficulty && matchesStatus;
    });
  }, [questions, searchQuery, selectedTrack, selectedCompany, selectedTopic, selectedDifficulty, statusFilter, solvedIds]);

  // Group filtered questions by company
  const companyGroups = useMemo(() => {
    const map = new Map<string, { company: string; companyType: string; package: string; questions: Question[] }>();

    for (const q of filteredQuestions) {
      if (!map.has(q.company)) {
        map.set(q.company, {
          company: q.company,
          companyType: q.companyType,
          package: q.salaryPackage,
          questions: [],
        });
      }
      map.get(q.company)!.questions.push(q);
    }

    return Array.from(map.values());
  }, [filteredQuestions]);

  const solvedFilteredCount = useMemo(() => {
    return filteredQuestions.filter((q) => solvedIds.includes(q.id)).length;
  }, [filteredQuestions, solvedIds]);

  const resetAllFilters = () => {
    setSearchQuery("");
    onSelectDifficulty("all");
    onSelectTopic("all");
    setStatusFilter("all");
    onSelectCompany("all");
    if (onSelectTrack) {
      onSelectTrack("all");
    }
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedDifficulty !== "all" ||
    selectedTopic !== "all" ||
    selectedCompany !== "all" ||
    selectedTrack !== "all" ||
    statusFilter !== "all";

  // Card expansion toggles
  const allFilteredExpanded =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((q) => expandedIds.has(q.id));

  const handleToggleExpandAll = () => {
    if (allFilteredExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filteredQuestions.map((q) => q.id)));
    }
  };

  const handleToggleCardExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Pick random question from currently filtered results
  const handleRandomQuestion = () => {
    if (filteredQuestions.length === 0) return;
    const unsolved = filteredQuestions.filter((q) => !solvedIds.includes(q.id));
    const targetPool = unsolved.length > 0 ? unsolved : filteredQuestions;
    const picked = targetPool[Math.floor(Math.random() * targetPool.length)];

    setExpandedIds((prev) => new Set(prev).add(picked.id));

    const cardEl = document.getElementById(`question-card-${picked.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
      cardEl.classList.add("ring-2", "ring-[var(--accent-primary)]");
      setTimeout(() => {
        cardEl.classList.remove("ring-2", "ring-[var(--accent-primary)]");
      }, 2500);
    }
  };

  return (
    <section id="questions" className="space-y-6 pt-2 sm:pt-4">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Company Coding Practice Arena
            </h2>
            <span className="badge badge-brand text-[10px] sm:text-xs">
              {filteredQuestions.length} of {questions.length} Available
            </span>
            <span className="badge badge-easy text-[10px] sm:text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {solvedFilteredCount} Solved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Questions categorized by tech company recruitment rounds. Expand for constraints, test cases, and reference solutions.
          </p>
        </div>

        {/* View Mode Toggle (Grouped vs Flat) */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center p-1 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs w-full sm:w-auto">
            <button
              onClick={() => setViewMode("grouped")}
              className={`flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-[var(--radius-sm)] font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-[32px] cursor-pointer ${
                viewMode === "grouped"
                  ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-label="View questions grouped by company"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grouped by Company</span>
            </button>
            <button
              onClick={() => setViewMode("flat")}
              className={`flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-[var(--radius-sm)] font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-[32px] cursor-pointer ${
                viewMode === "flat"
                  ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              aria-label="View questions as a compact list"
            >
              <List className="w-3.5 h-3.5" />
              <span>Compact List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Practice Progress & Breakdown Dashboard Widget */}
      <div className="card p-4 sm:p-5 border-[var(--border-primary)] bg-[var(--bg-card)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Practice Progress Tracker
              </span>
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
                {overallPercentage}% Completed
              </span>
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              <strong>{totalSolved}</strong> of <strong>{totalQuestions}</strong> questions solved across 15+ target hiring companies
            </div>
          </div>

          {/* Quick Action Buttons: Random Question & Expand All */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRandomQuestion}
              className="btn-secondary text-xs py-2 px-3 min-h-[36px] flex items-center gap-1.5 cursor-pointer hover:border-[var(--accent-primary)]"
              title="Pick a random unsolved problem from the active filters"
            >
              <Shuffle className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Random Problem</span>
            </button>
            <button
              onClick={handleToggleExpandAll}
              className="btn-secondary text-xs py-2 px-3 min-h-[36px] flex items-center gap-1.5 cursor-pointer"
              title={allFilteredExpanded ? "Collapse all question details" : "Expand all question details"}
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span>{allFilteredExpanded ? "Collapse All" : "Expand All"}</span>
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(overallPercentage, totalSolved > 0 ? 5 : 0)}%` }}
          />
        </div>

        {/* Difficulty Breakdown & Solved Status Segmented Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-[var(--border-primary)]/70 text-xs">
          {/* Difficulty counts */}
          <div className="flex flex-wrap items-center gap-3 text-[var(--text-secondary)] font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--difficulty-easy)]" />
              <span>Easy: <strong className="text-[var(--text-primary)]">{easySolved}/{easyQuestions.length}</strong></span>
            </span>
            <span className="text-[var(--border-secondary)]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--difficulty-medium)]" />
              <span>Medium: <strong className="text-[var(--text-primary)]">{mediumSolved}/{mediumQuestions.length}</strong></span>
            </span>
            <span className="text-[var(--border-secondary)]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--difficulty-hard)]" />
              <span>Hard: <strong className="text-[var(--text-primary)]">{hardSolved}/{hardQuestions.length}</strong></span>
            </span>
          </div>

          {/* Solved Status Segmented Controls */}
          <div className="flex items-center p-0.5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs self-start md:self-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] font-semibold transition-colors cursor-pointer ${
                statusFilter === "all"
                  ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setStatusFilter("unsolved")}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] font-semibold transition-colors cursor-pointer ${
                statusFilter === "unsolved"
                  ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Unsolved ({questions.length - totalSolved})
            </button>
            <button
              onClick={() => setStatusFilter("solved")}
              className={`px-3 py-1.5 rounded-[var(--radius-sm)] font-semibold transition-colors cursor-pointer ${
                statusFilter === "solved"
                  ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Solved ({totalSolved})
            </button>
          </div>
        </div>

        {/* Recharts Bar Chart: Solved by Difficulty Level */}
        <div className="pt-3 border-t border-[var(--border-primary)]/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Solved Questions by Difficulty Level
            </span>
            <span className="text-xs font-mono font-bold text-[var(--accent-primary)]">
              {totalSolved} / {totalQuestions} Solved
            </span>
          </div>

          <div className="w-full h-36">
            <ResponsiveContainer width="100%" height={144}>
              <BarChart data={difficultyBarData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="difficulty" 
                  tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: "var(--border-primary)" }}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  axisLine={{ stroke: "var(--border-primary)" }}
                  tickLine={false}
                />
                <RechartsTooltip content={<DifficultyBarChartTooltip />} cursor={{ fill: "var(--bg-hover)", opacity: 0.3 }} />
                <Bar dataKey="solved" name="Solved Questions" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {difficultyBarData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar with 4 Synchronized Dimensions */}
      <div className="card p-3.5 sm:p-4 space-y-4 border-[var(--border-primary)] bg-[var(--bg-card)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* 1. Search Input (4 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search title, topic (Arrays, DP), or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm sm:text-xs rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] pl-9 pr-8 py-2.5 min-h-[42px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
              aria-label="Search coding questions by title, topic, or company"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                title="Clear search"
                aria-label="Clear search text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. Company Filter Dropdown (3 cols on lg) */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 hidden xs:block" />
              <select
                value={selectedCompany}
                onChange={(e) => onSelectCompany(e.target.value)}
                className="w-full text-sm sm:text-xs font-semibold rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] px-2.5 py-2.5 min-h-[42px] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                aria-label="Filter by specific company"
              >
                <option value="all">All Companies ({questions.length})</option>
                {uniqueCompanies.map((c) => {
                  const count = questions.filter((q) => q.company === c).length;
                  return (
                    <option key={c} value={c}>
                      {c} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* 3. Topic / Category Filter Dropdown (3 cols on lg) */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 hidden xs:block" />
              <select
                value={selectedTopic}
                onChange={(e) => onSelectTopic(e.target.value)}
                className="w-full text-sm sm:text-xs font-semibold rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] px-2.5 py-2.5 min-h-[42px] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                aria-label="Filter by algorithmic topic"
              >
                <option value="all">All Topics ({uniqueTopics.length})</option>
                {uniqueTopics.map((topic) => {
                  const count = questions.filter((q) => q.category === topic).length;
                  return (
                    <option key={topic} value={topic}>
                      {topic} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* 4. Difficulty Filter Dropdown (2 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 hidden xs:block" />
              <select
                value={selectedDifficulty}
                onChange={(e) => onSelectDifficulty(e.target.value as "all" | "Easy" | "Medium" | "Hard")}
                className="w-full text-sm sm:text-xs font-semibold rounded-[var(--radius-md)] bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] px-2.5 py-2.5 min-h-[42px] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                aria-label="Filter by difficulty"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy (Green)</option>
                <option value="Medium">Medium (Yellow)</option>
                <option value="Hard">Hard (Red)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges & Clear All Action */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border-primary)] text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-semibold text-[var(--text-secondary)]">Active Filters:</span>
            {selectedTrack !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-semibold border border-[var(--border-accent)]">
                Track: {selectedTrack === "product" ? "Product" : selectedTrack === "service" ? "Service" : "Entrance"}
                {onSelectTrack && (
                  <button onClick={() => onSelectTrack("all")} className="hover:text-[var(--text-primary)]" title="Remove track filter">
                    &times;
                  </button>
                )}
              </span>
            )}
            {selectedCompany !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-semibold border border-[var(--border-accent)]">
                Company: {selectedCompany}
                <button onClick={() => onSelectCompany("all")} className="hover:text-[var(--text-primary)]" title="Remove company filter">
                  &times;
                </button>
              </span>
            )}
            {selectedTopic !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-semibold border border-[var(--border-accent)]">
                Topic: {selectedTopic}
                <button onClick={() => onSelectTopic("all")} className="hover:text-[var(--text-primary)]" title="Remove topic filter">
                  &times;
                </button>
              </span>
            )}
            {selectedDifficulty !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-semibold border border-[var(--border-accent)]">
                Diff: {selectedDifficulty}
                <button onClick={() => onSelectDifficulty("all")} className="hover:text-[var(--text-primary)]" title="Remove difficulty filter">
                  &times;
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] font-semibold border border-[var(--border-accent)]">
                Status: {statusFilter === "solved" ? "Solved Only" : "Unsolved Only"}
                <button onClick={() => setStatusFilter("all")} className="hover:text-[var(--text-primary)]" title="Remove status filter">
                  &times;
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold border border-[var(--border-primary)] truncate max-w-[200px]">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")} className="hover:text-[var(--accent-red)]" title="Clear search query">
                  &times;
                </button>
              </span>
            )}
            {!hasActiveFilters && (
              <span className="text-[var(--text-muted)] italic">Showing all {questions.length} questions across all companies &amp; topics</span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[var(--accent-primary)] font-semibold hover:underline flex items-center gap-1 cursor-pointer py-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Helpful Empty State when 0 questions match */}
      {filteredQuestions.length === 0 ? (
        <div className="card p-8 sm:p-12 text-center space-y-4 border-[var(--border-primary)] bg-[var(--bg-card)]">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              No questions matched your search criteria
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              We couldn&apos;t find any placement questions matching your combination of filters:
              {searchQuery && <span className="font-semibold text-[var(--accent-primary)]"> &quot;{searchQuery}&quot;</span>}
              {selectedCompany !== "all" && <span> for <strong>{selectedCompany}</strong></span>}
              {selectedTopic !== "all" && <span> in topic <strong>{selectedTopic}</strong></span>}
              {selectedDifficulty !== "all" && <span> at <strong>{selectedDifficulty}</strong> difficulty</span>}
              {statusFilter !== "all" && <span> with status <strong>{statusFilter}</strong></span>}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={resetAllFilters}
              className="btn-primary text-xs py-2.5 px-5 shadow-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          </div>

          {/* Quick topic suggestion pills */}
          <div className="pt-4 border-t border-[var(--border-primary)] max-w-md mx-auto">
            <span className="text-[11px] text-[var(--text-muted)] block mb-2 font-semibold">
              Or jump to a popular placement topic:
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {uniqueTopics.slice(0, 4).map((top) => (
                <button
                  key={top}
                  onClick={() => {
                    resetAllFilters();
                    onSelectTopic(top);
                  }}
                  className="px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-semibold bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {top}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : viewMode === "grouped" ? (
        /* Grouped by Company View */
        <div className="space-y-8">
          {companyGroups.map((group) => {
            const solvedInGroup = group.questions.filter((q) => solvedIds.includes(q.id)).length;
            return (
              <div
                key={group.company}
                className="space-y-3.5 p-4 sm:p-5 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)]"
              >
                {/* Company Group Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-primary)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-[var(--text-on-accent)] flex items-center justify-center font-black text-sm shadow-xs">
                      {group.company.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">
                          {group.company} Placement Questions
                        </h3>
                        <span className="badge badge-brand text-[11px]">
                          {group.companyType === "product" ? "Product-Based" : group.companyType === "service" ? "Service-Based" : "Entrance Exam"}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        Typical Package: <strong className="text-[var(--text-primary)]">{group.package}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress in this company group */}
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-secondary)]" />
                    <span>
                      Solved: <strong className="text-[var(--text-primary)]">{solvedInGroup}/{group.questions.length}</strong>
                    </span>
                  </div>
                </div>

                {/* Company Questions */}
                <div className="space-y-3">
                  {group.questions.map((q, idx) => (
                    <QuestionCard
                      key={q.id}
                      index={idx}
                      question={q}
                      isSolved={solvedIds.includes(q.id)}
                      onToggleSolved={onToggleSolved}
                      onSolveInLab={onSolveInLab}
                      isExpanded={expandedIds.has(q.id)}
                      onToggleExpand={handleToggleCardExpand}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Flat Compact List View */
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              index={idx}
              question={q}
              isSolved={solvedIds.includes(q.id)}
              onToggleSolved={onToggleSolved}
              onSolveInLab={onSolveInLab}
              isExpanded={expandedIds.has(q.id)}
              onToggleExpand={handleToggleCardExpand}
            />
          ))}
        </div>
      )}
    </section>
  );
};
