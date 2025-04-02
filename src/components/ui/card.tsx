import * as React from "react";
import { cn } from "@/lib/utils";

// Tipe reusable untuk komponen berbasis div
type DivProps = React.HTMLAttributes<HTMLDivElement>;

// Card
const Card = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// CardHeader
const CardHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// CardTitle
const CardTitle = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// CardDescription
const CardDescription = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// CardContent
const CardContent = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// CardFooter
const CardFooter = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Export semua komponen
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
