"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { forwardRef, type ReactNode } from "react";

/** 按钮变体类型 */
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** 变体样式映射 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-primary-500 to-primary-600 text-white 
    shadow-lg shadow-primary-500/25 
    hover:from-primary-600 hover:to-primary-700 hover:shadow-xl hover:shadow-primary-500/30
    active:from-primary-700 active:to-primary-800
    dark:from-primary-500 dark:to-primary-600
    dark:shadow-primary-900/40 dark:hover:shadow-primary-800/50
  `,
  secondary: `
    bg-slate-100 text-slate-700 
    hover:bg-slate-200
    dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
  `,
  ghost: `
    bg-transparent text-slate-600 
    hover:bg-slate-100
    dark:text-slate-300 dark:hover:bg-slate-700
  `,
  outline: `
    bg-transparent border-2 border-slate-200 text-slate-700
    hover:border-primary-300 hover:bg-primary-50
    dark:border-slate-600 dark:text-slate-200 
    dark:hover:border-primary-500 dark:hover:bg-primary-950/40
  `,
};

/** 尺寸样式映射 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2.5",
};

/**
 * 通用按钮组件
 * 支持多种变体、尺寸和交互动画
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={clsx(
          "focus-ring inline-flex items-center justify-center font-medium",
          "transition-colors duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

/** 加载动画 */
function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        fill="currentColor"
      />
    </svg>
  );
}

