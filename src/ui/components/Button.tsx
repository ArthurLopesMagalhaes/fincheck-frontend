import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Components";

interface ButtonProps extends ComponentProps<"button"> {
  isPending?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  isPending,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-100",
        className
      )}
      disabled={disabled || isPending}
      {...props}
    >
      {!isPending && children}
      {isPending && <Spinner />}
    </button>
  );
}
