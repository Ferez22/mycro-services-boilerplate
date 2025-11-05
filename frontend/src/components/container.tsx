import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false }: ContainerProps) {
  if (fullWidth) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div className={cn("px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16", className)}>
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </div>
  );
}

