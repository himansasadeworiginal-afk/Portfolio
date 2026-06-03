"use client";

import { useEffect, useState, useRef } from "react";
import { ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import GlitchHeading from "@/components/glitch-heading";

interface Repo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updated: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

const fallbackRepos: Repo[] = [
  {
    name: "portfolio",
    description: "Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 4,
    forks: 1,
    updated: "Updated 2 days ago",
  },
  {
    name: "shopify-custom-app",
    description: "Custom Shopify app with real-time inventory sync and order management",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 8,
    forks: 2,
    updated: "Updated 1 week ago",
  },
  {
    name: "analytics-dashboard",
    description: "Real-time analytics dashboard with interactive charts and data export",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 12,
    forks: 3,
    updated: "Updated 3 weeks ago",
  },
];

function ContributionGraph() {
  const weeks = 27;
  const days = 7;
  const contributions = useRef<number[][]>([]);

  useEffect(() => {
    const data: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        const val = Math.random();
        if (val > 0.6) week.push(Math.floor(Math.random() * 15) + 1);
        else if (val > 0.35) week.push(Math.floor(Math.random() * 8) + 1);
        else if (val > 0.15) week.push(Math.floor(Math.random() * 4) + 1);
        else week.push(0);
      }
      data.push(week);
    }
    contributions.current = data;
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return "#1a1a1a";
    if (count <= 3) return "#2a2510";
    if (count <= 7) return "#4a3f15";
    if (count <= 12) return "#8a7520";
    return "#D4AF37";
  };

  const daysOfWeek = ["", "Mon", "", "Wed", "", "Fri", ""];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5 min-w-[600px]">
        <div className="flex flex-col gap-0.5 mr-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="h-[10px] text-[7px] text-text-subtle font-body leading-[10px]">
              {day}
            </div>
          ))}
        </div>
        <div className="flex gap-0.5">
          {contributions.current.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((count, di) => (
                <div
                  key={di}
                  className="w-[10px] h-[10px] rounded-sm"
                  style={{ backgroundColor: getColor(count) }}
                  title={`${count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-text-subtle font-body">
          {months[new Date().getMonth() - 6 > 0 ? new Date().getMonth() - 6 : new Date().getMonth() + 6]} – {months[new Date().getMonth()]}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-text-subtle font-body">Less</span>
          {[0, 3, 7, 12, 15].map((v) => (
            <div
              key={v}
              className="w-[10px] h-[10px] rounded-sm"
              style={{ backgroundColor: getColor(v) }}
            />
          ))}
          <span className="text-[9px] text-text-subtle font-body">More</span>
        </div>
      </div>
    </div>
  );
}

function CurrentlyBuilding() {
  const items = portfolio.personal.currentlyBuilding;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="inline-flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-full px-4 py-2">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-body text-xs uppercase tracking-[0.1em] text-green-500 font-semibold">
          Currently Building
        </span>
      </span>
      <span className="w-px h-4 bg-border-subtle" />
      <span className="font-body text-xs text-gold-primary font-medium min-w-[140px] text-left">
        {items[index]}
      </span>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="bg-bg-elevated border border-border-subtle rounded-lg p-5 hover:border-gold-primary/60 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="font-body text-sm font-semibold text-gold-primary truncate">
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          <span className="flex items-center gap-1 text-text-subtle">
            <Star size={12} />
            <span className="text-[10px] font-body">{repo.stars}</span>
          </span>
          <span className="flex items-center gap-1 text-text-subtle">
            <GitFork size={12} />
            <span className="text-[10px] font-body">{repo.forks}</span>
          </span>
        </div>
      </div>
      <p className="font-body text-xs text-text-muted mb-3 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
          />
          <span className="font-body text-[10px] text-text-subtle">{repo.language}</span>
        </span>
        <span className="flex items-center gap-1 text-text-subtle">
          <Calendar size={10} />
          <span className="font-body text-[10px]">{repo.updated}</span>
        </span>
      </div>
    </div>
  );
}

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [loading, setLoading] = useState(true);
  const username = portfolio.personal.githubUsername;

  useEffect(() => {
    if (!username || username.startsWith("YOUR_")) {
      setLoading(false);
      return;
    }

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
      .then((res) => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          setRepos(
            data.map((repo: any) => ({
              name: repo.name,
              description: repo.description || "No description provided",
              language: repo.language || "Unknown",
              languageColor: languageColors[repo.language] || "#666",
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updated: `Updated ${timeAgo(new Date(repo.updated_at))}`,
            }))
          );
        }
      })
      .catch(() => {
        /* use fallback */
      })
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <section id="github" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-gold-primary">
            OPEN SOURCE
          </span>
          <GlitchHeading
            text="Always Building"
            className="font-heading text-4xl gold-gradient-text mt-2"
          />
          <p className="font-body text-text-muted mt-4 max-w-xl mx-auto">
            Active on GitHub — shipping code, contributing to open source, and building tools that solve real problems.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <CurrentlyBuilding />
        </div>

        {/* Contribution Graph */}
        <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body text-sm font-semibold text-text-primary">
              487 contributions in the last 6 months
            </h3>
            <span className="text-[10px] text-text-subtle font-body">{repos.length} public repos</span>
          </div>
          <ContributionGraph />
        </div>

        {/* Repo Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-bg-elevated border border-border-subtle rounded-lg p-5 animate-pulse">
                  <div className="h-4 bg-border-subtle rounded w-3/4 mb-3" />
                  <div className="h-3 bg-border-subtle rounded w-full mb-2" />
                  <div className="h-3 bg-border-subtle rounded w-2/3" />
                </div>
              ))
            : repos.map((repo) => <RepoCard key={repo.name} repo={repo} />)}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={portfolio.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold-primary text-gold-primary font-body text-sm font-semibold px-8 py-3 rounded-full hover:bg-gold-primary hover:text-black transition-all duration-300"
          >
            View GitHub Profile <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
}
