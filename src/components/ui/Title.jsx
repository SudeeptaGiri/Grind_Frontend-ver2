import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const titleVariants = cva(
  "text-slate-800 font-bold",
  {
    variants: {
      size: {
        default: "text-3xl md:text-4xl",
        lg: "text-4xl sm:text-3xl lg:text-5xl",
        sm: "text-xl md:text-2xl lg:text-3xl",
        xs: 'md:text-lg lg:text-xl',
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const Title = React.forwardRef(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(titleVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

Title.displayName = "Title";

export default Title;
