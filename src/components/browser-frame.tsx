"use client";

interface BrowserFrameProps {
  children?: React.ReactNode;
  label?: string;
}

export default function BrowserFrame({ children, label }: BrowserFrameProps) {
  return (
    <div className="bg-bg-surface rounded-lg overflow-hidden border border-border-subtle">
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-elevated border-b border-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-bg-surface rounded px-3 py-1 text-[10px] font-body text-text-subtle max-w-[200px] truncate">
            {label || "localhost"}
          </div>
        </div>
      </div>
      <div className="bg-bg-surface">
        {children || (
          <div className="h-56 flex items-center justify-center text-text-subtle font-body text-sm">
            [Project Screenshot]
          </div>
        )}
      </div>
    </div>
  );
}
