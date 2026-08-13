import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className = "", variant = "primary", ...props }: Props) {
  const styles = {
    primary: "bg-brand-dark text-white hover:bg-brand-hover",
    secondary: "bg-white text-app-text border border-app-border hover:bg-brand-light",
    ghost: "bg-transparent text-app-text hover:bg-app-surface2"
  };
  return (
    <button
      {...props}
      className={`focus-ring min-h-11 rounded-lg px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    />
  );
}

