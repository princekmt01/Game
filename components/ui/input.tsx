import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-2xl border-2 border-transparent bg-white/5 px-6 py-3 text-xl font-medium text-foreground shadow-inner backdrop-blur transition-all duration-300 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-white/10 focus-visible:outline-none focus-visible:shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
