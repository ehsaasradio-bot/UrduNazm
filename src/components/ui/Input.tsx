import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 text-sm bg-card text-foreground border border-border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 ${
          error ? "border-red-400 focus:ring-red-400/40" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
