import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium gold button with glow
        gold: "bg-primary text-primary-foreground hover:bg-gold-400 shadow-[0_0_20px_hsla(43,67%,52%,0.3)] hover:shadow-[0_0_30px_hsla(43,67%,52%,0.5)] transform hover:-translate-y-0.5",
        // Hero variant - larger, more prominent
        hero: "bg-primary text-primary-foreground hover:bg-gold-400 shadow-[0_0_30px_hsla(43,67%,52%,0.4)] hover:shadow-[0_0_40px_hsla(43,67%,52%,0.6)] transform hover:-translate-y-1 font-display",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-sm px-4",
        lg: "h-12 rounded-sm px-8 text-base",
        xl: "h-auto py-4 px-6 md:px-10 text-base md:text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
