interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const sizes = {
  default: "max-w-[1200px]",
  narrow: "max-w-[800px]",
  wide: "max-w-[1400px]",
};

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-6 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
}
