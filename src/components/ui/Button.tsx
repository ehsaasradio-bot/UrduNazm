import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-border text-foreground hover:border-muted-foreground/30",
  ghost: "text-muted hover:text-foreground",
  accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
};

const sizes = {
  sm: "h-7 px-3 text-[12px]",
  md: "h-9 px-4 text-[13px]",
  lg: "h-10 px-5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
