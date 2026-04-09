interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const variants = {
  default: "border border-border text-foreground",
  accent: "bg-accent-soft text-accent border border-accent/20",
  muted: "text-muted-foreground bg-surface",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-[11px] font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
