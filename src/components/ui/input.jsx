import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "px-3 focus:outline-primary border rounded-md",
  flushed: "focus:border-primary outline-transparent border-b-2 ",
  subtle: "px-3 focus:outline-primary bg-muted rounded-md ",
  floating: "px-3 focus:outline-primary border rounded-md ",
};

const Input = React.forwardRef(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <div className={cn("relative w-full")}>
        <input
          type={type}
          className={cn(
            "peer w-full bg-transparent text-base transition-all py-2",
            variants[variant],
            className
          )}
          ref={ref}
          {...props}
          placeholder={variant !== "floating" ? props.placeholder : " "}
        />
        {variant === "floating" && props.placeholder && (
          <label
            className={cn(
              "absolute left-3 px-1 top-1/2 transform bg-background capitalize -translate-y-1/2 text-muted-foreground transition-all pointer-events-none",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
              "peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary"
            )}
          >
            {props.placeholder}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
