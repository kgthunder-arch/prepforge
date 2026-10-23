import React, { useState } from "react";
import { Award, Search, Trophy, Flame } from "lucide-react";
import { LEADERBOARD_DATA, LeaderboardEntry } from "../data/leaderboardData";

export const Leaderboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = LEADERBOARD_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankBadge = (entry: LeaderboardEntry) => {
    if (entry.rank === 1) {
      return (
        <span className="w-7 h-7 rounded-full bg-[var(--accent-primary)] text-[var(--text-on-accent)] flex items-center justify-center font-extrabold text-xs shadow-sm">
          #1
        </span>
      );
    }
    if (entry.rank === 2) {
      return (
        <span className="w-7 h-7 rounded-full bg-[#c0c0c0] text-[#1a1a1a] flex items-center justify-center font-extrabold text-xs shadow-sm">
          #2
        </span>
      );
    }
    if (entry.rank === 3) {
      return (
        <span className="w-7 h-7 rounded-full bg-[#cd7f32] text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
          #3
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] flex items-center justify-center font-bold text-xs font-mono">
        #{entry.rank}
      </span>
    );
  };

  return (
    <section id="leaderboard" className="space-y-6 pt-2 sm:pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              College Placement Leaderboard
            </h2>
            <span className="badge badge-brand text-[10px] sm:text-xs">Campus Standings</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Student rankings and placement readiness indexes across engineering universities.
          </p>
        </div>

        {/* Search Filter for Leaderboard (min 42px touch target) */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search student or college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-primary)] pl-9 pr-3 py-2.5 min-h-[42px] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
            aria-label="Search leaderboard"
          />
        </div>
      </div>

      {/* Leaderboard Table Card with Responsive Horizontal Scroll Containment */}
      <div className="card overflow-hidden border-[var(--border-primary)] shadow-sm">
        {/* Mobile Swipe Hint */}
        <div className="md:hidden px-3.5 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <span className="font-semibold text-[var(--accent-primary)]">Rankings Table</span>
          <span>Scroll horizontally for metrics &rarr;</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 w-16">Rank</th>
                <th className="py-3.5 px-4">Student &amp; College</th>
                <th className="py-3.5 px-4 font-mono text-center">Solved</th>
                <th className="py-3.5 px-4 font-mono text-center">Streak</th>
                <th className="py-3.5 px-4 font-mono text-center">Readiness</th>
                <th className="py-3.5 px-4">Target Goal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)] font-medium">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[var(--text-muted)]">
                    No students or colleges match &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr
                    key={entry.rank}
                    className="hover:bg-[var(--bg-hover)] transition-colors group"
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 shrink-0">
                      <div className="flex items-center gap-2">
                        {getRankBadge(entry)}
                      </div>
                    </td>

                    {/* Student & College */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block group-hover:text-[var(--accent-primary)] transition-colors">
                          {entry.name}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] block">
                          {entry.college}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {entry.branch}
                        </span>
                      </div>
                    </td>

                    {/* Solved Count */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-[var(--text-primary)] tabular-nums">
                      {entry.questionsSolved}
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                      <span className="inline-flex items-center gap-1 text-[var(--accent-gold)] font-bold">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {entry.streakDays}d
                      </span>
                    </td>

                    {/* Readiness Score */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-mono font-extrabold text-[var(--accent-secondary)] tabular-nums">
                          {entry.readinessScore}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden mt-1">
                          <div
                            className="h-full bg-[var(--accent-secondary)] rounded-full"
                            style={{ width: `${entry.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Target Company */}
                    <td className="py-3.5 px-4">
                      <span className="badge badge-brand text-xs">
                        {entry.targetCompany}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="p-3.5 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] text-xs text-[var(--text-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Updated weekly based on proctored college placement mock tests.</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
            Showing {filteredEntries.length} top candidates
          </span>
        </div>
      </div>
    </section>
  );
};
