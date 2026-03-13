interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const getColor = (v: number) => {
    if (v >= 90) return "bg-success";
    if (v >= 70) return "bg-primary";
    if (v >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className={`w-full bg-muted rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${getColor(value)}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
