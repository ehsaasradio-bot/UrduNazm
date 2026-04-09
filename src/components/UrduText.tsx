interface UrduTextProps {
  children: React.ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

export default function UrduText({
  children,
  as: Tag = "p",
  size = "base",
  className = "",
}: UrduTextProps) {
  return (
    <Tag
      lang="ur"
      className={`urdu ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
