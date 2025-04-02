import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";

// Variants untuk styling Label
const labelVariants = cva(
  "text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// ✅ Komponen Label dengan ref dan typing props
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
