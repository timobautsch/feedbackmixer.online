import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full text-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        pinButtonHover: "hover:bg-fuchsia-500 text-white",
        greenButtonHover: "hover:bg-greenButtonHover text-white w-32 h-12",
        copyButton: "text-black focus:bg-transparent",
        linkButton:
          "text-base focus:bg-transparent cursor-text hover:bg-transparent",
        submitButton: "focus:bg-none hover:bg-submitButtonHover",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        buttonSize: "w-full h-14",
        fullSize: "w-full h-full",
        editSession: "w-28 h-14",
      },
      backgroundColors: {
        default: "bg-white",
        red: "bg-red-500",
        blue: "bg-blue-400",
        pink: "bg-pinkButton",
        green: "bg-greenButton",
        black: "bg-black",
        lightGreen: "bg-mantis",
        submitButton: "bg-submitButton",
      },
      textColor: {
        default: "white",
        black: "text-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      backgroundColors: "default",
      textColor: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      backgroundColors,
      textColor,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            backgroundColors,
            textColor,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
