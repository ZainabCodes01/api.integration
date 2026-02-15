
import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg" | "full";
};

export default function Button({
  children,
  variant = "filled",
  size = "md",
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyle =
    "font-medium transition duration-300 inline-block";

  const variants: Record<string, string> = {
    filled: "bg-gray-600 text-white hover:bg-sky-700 shadow-lg",
    outline:
      "border border-sky-600 text-sky-600 hover:bg-sky-50 hover:text-sky-700",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm rounded-lg",   
    md: "px-5 py-2 text-base rounded-md", 
    lg: "px-7 py-2 text-lg rounded-xl", 
    full: "px-9 py-2 font-semibold rounded-full"  
  };

  return (
    <button
     
      // className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      className={twMerge(baseStyle, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
