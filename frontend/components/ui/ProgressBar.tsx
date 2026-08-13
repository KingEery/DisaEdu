export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full rounded-full bg-app-surface2" aria-label={`Progress ${value}%`}>
      <div className="h-3 rounded-full bg-success" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

