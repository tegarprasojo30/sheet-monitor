import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: "primary" | "success" | "warning" | "destructive";
  subtitle?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatsCard({ title, value, icon: Icon, variant, subtitle }: StatsCardProps) {
  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1 text-card-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${variantStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
