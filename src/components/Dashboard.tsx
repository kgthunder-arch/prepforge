import React, { useState, useMemo } from "react";
import { 
  ResponsiveContainer, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid
} from "recharts";
import { 
  BarChart3, 
  CheckCircle2, 
  Target, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  BookOpen, 
  Zap,
  RotateCcw,
  Building2,
  BrainCircuit
} from "lucide-react";
import { Question, SAMPLE_QUESTIONS } from "../data/sampleQuestions";

interface DashboardProps {
  questions: Question[];
  solvedIds: string[];
  onToggleSolved: (id: string) => void;
  onNavigateToQuestions: (topic?: string, difficulty?: "Easy" | "Medium" | "Hard") => void;
  onSolveInLab: (question: Question) => void;
}

// Custom Recharts Tooltip for Difficulty Bar Chart
const DifficultyBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-[var(--radius-md)] shadow-xl text-xs space-y-1.5 font-sans min-w-[150px] z-50">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-primary)] pb-1">
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
        <div className="text-[10px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-primary)]">
          {data.solved === data.total ? "All mastered!" : `${data.total - data.solved} remaining`}
        </div>
      </div>
    );
  }
  return null;
};

// Custom Recharts Tooltip for Topic Bar Chart
const TopicTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-[var(--radius-md)] shadow-xl text-xs space-y-1.5 font-sans min-w-[160px] z-50">
        <div className="font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-1 truncate max-w-[200px]">
          {data.topic}
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] inline-block" />
              Solved:
            </span>
            <span className="font-mono font-bold text-[var(--accent-primary)]">{data.solved}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--border-secondary)] inline-block" />
              Total in Bank:
            </span>
            <span className="font-mono font-bold text-[var(--text-primary)]">{data.total}</span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-[var(--border-primary)]">
            <span className="text-[var(--text-muted)]">Progress:</span>
            <span className="font-mono font-bold text-[var(--text-primary)]">{data.rate}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC<DashboardProps> = ({
  questions,
  solvedIds,
  onNavigateToQuestions,
  onSolveInLab,
}) => {
  const [topicFilterMode, setTopicFilterMode] = useState<"all" | "active">("all");

  // Solved set for fast lookup
  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);

  // Overall metrics
  const totalQuestions = questions.length;
  const solvedCount = solvedIds.filter((id) => questions.some((q) => q.id === id)).length;
  const overallPercentage = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

  // Recharts Bar Chart: number of questions solved by difficulty level (Easy, Medium, Hard)
  // Filtering and counting from SAMPLE_QUESTIONS using solvedIds state
  const difficultyBarData = useMemo(() => {
    const easySolved = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Easy" && solvedIds.includes(q.id)
    ).length;
    const easyTotal = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Easy").length;

    const mediumSolved = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Medium" && solvedIds.includes(q.id)
    ).length;
    const mediumTotal = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Medium").length;

    const hardSolved = SAMPLE_QUESTIONS.filter(
      (q) => q.difficulty === "Hard" && solvedIds.includes(q.id)
    ).length;
    const hardTotal = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "Hard").length;

    return [
      {
        difficulty: "Easy",
        solved: easySolved,
        total: easyTotal,
        rate: easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0,
        color: "var(--difficulty-easy)",
      },
      {
        difficulty: "Medium",
        solved: mediumSolved,
        total: mediumTotal,
        rate: mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0,
        color: "var(--difficulty-medium)",
      },
      {
        difficulty: "Hard",
        solved: hardSolved,
        total: hardTotal,
        rate: hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0,
        color: "var(--difficulty-hard)",
      },
    ];
  }, [solvedIds]);

  // Breakdown by Difficulty
  const difficultyStats = useMemo(() => {
    const counts = {
      Easy: { total: 0, solved: 0, color: "var(--difficulty-easy)" },
      Medium: { total: 0, solved: 0, color: "var(--difficulty-medium)" },
      Hard: { total: 0, solved: 0, color: "var(--difficulty-hard)" },
    };

    questions.forEach((q) => {
      const diff = q.difficulty;
      if (counts[diff]) {
        counts[diff].total += 1;
        if (solvedSet.has(q.id)) {
          counts[diff].solved += 1;
        }
      }
    });

    return [
      {
        name: "Easy",
        solved: counts.Easy.solved,
        total: counts.Easy.total,
        rate: counts.Easy.total > 0 ? Math.round((counts.Easy.solved / counts.Easy.total) * 100) : 0,
        color: counts.Easy.color,
      },
      {
        name: "Medium",
        solved: counts.Medium.solved,
        total: counts.Medium.total,
        rate: counts.Medium.total > 0 ? Math.round((counts.Medium.solved / counts.Medium.total) * 100) : 0,
        color: counts.Medium.color,
      },
      {
        name: "Hard",
        solved: counts.Hard.solved,
        total: counts.Hard.total,
        rate: counts.Hard.total > 0 ? Math.round((counts.Hard.solved / counts.Hard.total) * 100) : 0,
        color: counts.Hard.color,
      },
    ];
  }, [questions, solvedSet]);

  // Breakdown by Topic / Category
  const topicStats = useMemo(() => {
    const map: Record<string, { total: number; solved: number }> = {};

    questions.forEach((q) => {
      if (!map[q.category]) {
        map[q.category] = { total: 0, solved: 0 };
      }
      map[q.category].total += 1;
      if (solvedSet.has(q.id)) {
        map[q.category].solved += 1;
      }
    });

    const list = Object.entries(map).map(([topic, stat]) => ({
      topic,
      shortTopic: topic.length > 18 ? topic.slice(0, 16) + "…" : topic,
      solved: stat.solved,
      unsolved: stat.total - stat.solved,
      total: stat.total,
      rate: stat.total > 0 ? Math.round((stat.solved / stat.total) * 100) : 0,
    }));

    // Sort by solved count desc, then total desc
    list.sort((a, b) => b.solved - a.solved || b.total - a.total);

    if (topicFilterMode === "active") {
      return list.filter((t) => t.solved > 0);
    }
    return list;
  }, [questions, solvedSet, topicFilterMode]);

  // Company track readiness
  const trackReadiness = useMemo(() => {
    const tracks = {
      product: { name: "Product Engineering", total: 0, solved: 0, firms: "Google, Amazon, Microsoft, Zoho" },
      service: { name: "Service & IT Assessment", total: 0, solved: 0, firms: "TCS, Infosys, Cognizant, Wipro" },
      exam: { name: "Aptitude & Core Exam", total: 0, solved: 0, firms: "GATE, eLitmus" },
    };

    questions.forEach((q) => {
      const t = q.companyType;
      if (tracks[t]) {
        tracks[t].total += 1;
        if (solvedSet.has(q.id)) {
          tracks[t].solved += 1;
        }
      }
    });

    return Object.entries(tracks).map(([key, data]) => ({
      key,
      ...data,
      rate: data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0,
    }));
  }, [questions, solvedSet]);

  // First unsolved problem recommendation
  const nextRecommended = useMemo(() => {
    return questions.find((q) => !solvedSet.has(q.id)) || questions[0];
  }, [questions, solvedSet]);

  return (
    <section id="dashboard" className="space-y-6 sm:space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--border-primary)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-primary)] font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              PrepForge Analytics
            </span>
            <span className="text-[var(--text-muted)] text-xs">·</span>
            <span className="text-[var(--text-muted)] text-xs font-mono">
              Live Local Storage
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] font-[var(--font-display)] tracking-tight">
            Placement Readiness &amp; Progress Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Visual breakdown of your solved questions by difficulty tier and engineering topic. All metrics derive directly from your browser session.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateToQuestions()}
            className="btn-secondary text-xs py-2 px-3.5 min-h-[38px] flex items-center gap-1.5"
            title="Jump to question bank"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Question Bank</span>
          </button>
          {nextRecommended && (
            <button
              onClick={() => onSolveInLab(nextRecommended)}
              className="btn-primary text-xs py-2 px-3.5 min-h-[38px] flex items-center gap-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]"
              title={`Solve next problem: ${nextRecommended.title}`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Practice Next</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Stat Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Solved Card */}
        <div className="card p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Total Solved</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-dim)] flex items-center justify-center text-[var(--accent-primary)]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--text-primary)]">
                {solvedCount}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[var(--text-muted)]">
                / {totalQuestions}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div 
                className="h-full bg-[var(--accent-primary)] transition-all duration-500 rounded-full" 
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Overall completion</span>
            <span className="font-mono font-bold text-[var(--accent-primary)]">{overallPercentage}%</span>
          </div>
        </div>

        {/* Easy Tier Card */}
        <div className="card p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Easy Problems</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#10b981]">
                {difficultyStats[0].solved}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[var(--text-muted)]">
                / {difficultyStats[0].total}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div 
                className="h-full bg-[var(--difficulty-easy)] transition-all duration-500 rounded-full" 
                style={{ width: `${difficultyStats[0].rate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Foundations</span>
            <span className="font-mono font-bold text-[var(--difficulty-easy)]">{difficultyStats[0].rate}%</span>
          </div>
        </div>

        {/* Medium Tier Card */}
        <div className="card p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Medium Problems</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--difficulty-medium)]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--difficulty-medium)]">
                {difficultyStats[1].solved}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[var(--text-muted)]">
                / {difficultyStats[1].total}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div 
                className="h-full bg-[var(--difficulty-medium)] transition-all duration-500 rounded-full" 
                style={{ width: `${difficultyStats[1].rate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>OA Standard</span>
            <span className="font-mono font-bold text-[var(--difficulty-medium)]">{difficultyStats[1].rate}%</span>
          </div>
        </div>

        {/* Hard Tier Card */}
        <div className="card p-4 sm:p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Hard Problems</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--difficulty-hard)]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--difficulty-hard)]">
                {difficultyStats[2].solved}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[var(--text-muted)]">
                / {difficultyStats[2].total}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div 
                className="h-full bg-[var(--difficulty-hard)] transition-all duration-500 rounded-full" 
                style={{ width: `${difficultyStats[2].rate}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Dream Rounds</span>
            <span className="font-mono font-bold text-[var(--difficulty-hard)]">{difficultyStats[2].rate}%</span>
          </div>
        </div>
      </div>

      {/* Main Visualizations Grid: Difficulty Bar Chart & Topic Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left Column: Questions Solved by Difficulty Level Recharts Bar Chart (5 cols) */}
        <div className="lg:col-span-5 card p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--accent-primary)]" />
                Solved by Difficulty Level
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Questions solved across Easy, Medium, and Hard tiers
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] border border-[var(--border-accent)]">
              {solvedCount} / {totalQuestions} Solved
            </span>
          </div>

          {/* Recharts Bar Chart Container */}
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={difficultyBarData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="difficulty" 
                  tick={{ fill: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}
                  axisLine={{ stroke: "var(--border-primary)" }}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  axisLine={{ stroke: "var(--border-primary)" }}
                  tickLine={false}
                />
                <Tooltip content={<DifficultyBarTooltip />} cursor={{ fill: "var(--bg-hover)", opacity: 0.3 }} />
                <Bar dataKey="solved" name="Solved Questions" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {difficultyBarData.map((entry, index) => (
                    <Cell key={`diff-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Difficulty Progress Breakdown */}
          <div className="space-y-2.5 pt-2 border-t border-[var(--border-primary)]">
            {difficultyBarData.map((tier) => (
              <div 
                key={tier.difficulty}
                className="flex items-center justify-between text-xs p-2 rounded-[var(--radius-sm)] bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)]/50"
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: tier.color }} 
                  />
                  <span className="font-semibold text-[var(--text-primary)]">{tier.difficulty}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">{tier.solved}</strong> / {tier.total}
                  </span>
                  <span 
                    className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-primary)]"
                    style={{ color: tier.color }}
                  >
                    {tier.rate}%
                  </span>
                  <button
                    onClick={() => onNavigateToQuestions(undefined, tier.difficulty)}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors p-1"
                    title={`Filter ${tier.difficulty} questions`}
                    aria-label={`Filter ${tier.difficulty} questions`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Solved Questions by Topic Visualization (7 cols) */}
        <div className="lg:col-span-7 card p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-primary)] pb-3">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[var(--accent-primary)]" />
                Topic Mastery Distribution
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Questions solved versus total available across algorithmic domains
              </p>
            </div>

            {/* Filter active topics toggle */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] text-[var(--text-muted)]">Show:</span>
              <div className="flex items-center p-0.5 bg-[var(--bg-secondary)] rounded-[var(--radius-sm)] border border-[var(--border-primary)] text-xs">
                <button
                  onClick={() => setTopicFilterMode("all")}
                  className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
                    topicFilterMode === "all"
                      ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  All ({topicStats.length})
                </button>
                <button
                  onClick={() => setTopicFilterMode("active")}
                  className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors cursor-pointer ${
                    topicFilterMode === "active"
                      ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-bold shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  Solved ({topicStats.filter((t) => t.solved > 0).length})
                </button>
              </div>
            </div>
          </div>

          {/* Recharts Horizontal Bar Chart */}
          {topicStats.length === 0 ? (
            <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 space-y-2 bg-[var(--bg-secondary)]/30 rounded-[var(--radius-md)] border border-dashed border-[var(--border-primary)]">
              <BookOpen className="w-8 h-8 text-[var(--text-muted)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">No topics solved yet</p>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm">
                Mark problems as solved in the practice bank or live coding lab to populate your topic mastery map.
              </p>
              <button
                onClick={() => setTopicFilterMode("all")}
                className="btn-secondary text-xs py-1.5 px-3 mt-2"
              >
                Show All Curriculum Topics
              </button>
            </div>
          ) : (
            <div className="w-full h-[280px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topicStats.slice(0, 7)}
                  margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid 
                    horizontal={false} 
                    stroke="var(--border-primary)" 
                    strokeDasharray="3 3" 
                    opacity={0.6}
                  />
                  <XAxis 
                    type="number" 
                    allowDecimals={false}
                    tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border-primary)" }}
                    tickLine={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="shortTopic" 
                    width={110}
                    tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border-primary)" }}
                    tickLine={false}
                  />
                  <Tooltip content={<TopicTooltip />} cursor={{ fill: "var(--bg-hover)", opacity: 0.5 }} />
                  {/* Stacked Bars: Solved in PrepForge yellow, Unsolved in track background */}
                  <Bar 
                    dataKey="solved" 
                    name="Solved" 
                    stackId="a" 
                    fill="#fcc419" 
                    radius={[0, 0, 0, 0]} 
                  />
                  <Bar 
                    dataKey="unsolved" 
                    name="Unsolved" 
                    stackId="a" 
                    fill="var(--border-primary)" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Chart Legend & Interactive Topic Jump Tags */}
          <div className="pt-2 border-t border-[var(--border-primary)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-[11px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2.5 rounded-xs bg-[#fcc419] inline-block" />
                Solved Problems
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2.5 rounded-xs bg-[var(--border-primary)] inline-block" />
                Remaining in Bank
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <span>Click to filter:</span>
              {topicStats.slice(0, 3).map((t) => (
                <button
                  key={t.topic}
                  onClick={() => onNavigateToQuestions(t.topic)}
                  className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary-dim)] hover:text-[var(--accent-primary)] transition-colors border border-[var(--border-primary)] cursor-pointer text-[10px] font-medium"
                >
                  {t.topic.split("&")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Placement Track Readiness Row */}
      <div className="card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-primary)] pb-3">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[var(--accent-primary)]" />
              Target Hiring Track Readiness
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Placement preparation velocity categorized by hiring company tier
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            500+ Indian &amp; Global Campus Recruiters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trackReadiness.map((track) => (
            <div 
              key={track.key}
              className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)]">{track.name}</span>
                <span className="text-[11px] font-mono font-bold text-[var(--accent-primary)]">
                  {track.solved}/{track.total}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                {track.firms}
              </p>
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-primary)] transition-all duration-500 rounded-full"
                    style={{ width: `${track.rate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-0.5">
                  <span>Track Progress</span>
                  <span className="font-mono font-semibold text-[var(--text-primary)]">{track.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
