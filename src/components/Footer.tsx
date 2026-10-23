import React from "react";
import { Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] mt-12 sm:mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-[var(--text-on-accent)] font-black text-lg shadow-sm">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Prep<span className="text-[var(--accent-primary)]">Forge</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[var(--accent-primary-dim)] text-[var(--accent-primary)] border border-[var(--border-accent)]">
                Placement LMS
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--accent-primary)] mb-1">
                Practice with purpose. Prepare to succeed.
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
                The premier placement-readiness learning platform for engineering colleges across India. Combining company-tagged algorithmic challenges, salary tier tracks, and interactive in-browser coding labs.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                <span>Perungudi, Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                <span>support@prepforge.io</span>
              </div>
            </div>
          </div>

          {/* Placement Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Recruitment Tracks
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Google SDE Journey (₹25–45 LPA)</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Amazon SDE OA (₹20–42 LPA)</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Microsoft Systems (₹22–45 LPA)</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Zoho Core DSA (₹6–12 LPA)</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Flipkart SDE Rounds (₹18–32 LPA)</a></li>
            </ul>
          </div>

          {/* Entrance Exams */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Entrance Exam Prep
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">TCS NQT (Foundation + Advanced)</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Infosys InfyTQ &amp; DSE</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Wipro NLTH National Hunt</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Accenture ASE / FSE Fast-Track</a></li>
              <li><a href="#tracks" className="hover:text-[var(--accent-primary)] transition-colors">Cognizant GenC Elevate</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[var(--border-primary)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] text-center sm:text-left">
          <p>© {new Date().getFullYear()} PrepForge Placement LMS. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
            <span>Engineering Placement Practice</span>
            <span>·</span>
            <span>React + Vite &amp; Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
