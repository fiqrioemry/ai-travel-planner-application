import { cn } from "@/lib/utils";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

// ✅ Class Variants
const buttonVariants = cva(
  "inline-flex items-center capitalize justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-muted text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        edit: "text-blue-600 border border-blue-600 hover:bg-blue-100",
        delete: "text-white bg-red-500 border border-red-500 hover:bg-red-600",
      },
      size: {
        default: "h-9 rounded-md py-2 px-2 w-full",
        xs: "h-8 rounded-md px-2",
        sm: "h-8 rounded-md px-4 text-xs md:text-sm",
        lg: "h-9 rounded-md px-8 w-32",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// ✅ Button Props Type
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
