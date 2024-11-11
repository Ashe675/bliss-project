"use client";

import clsx from "clsx";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmit?: boolean;
  disabled?: boolean;
  type?: "success" | "cancel" | "primary";
  className?: string;
  children: React.ReactNode;
}

export const CustomButton = ({
  onClick,
  isSubmit,
  type,
  disabled = false,
  className = "",
  children,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={`${isSubmit ? "submit" : "button"}`}
      className={clsx(
        ` rounded-md font-semibold p-1.5 shadow-sm transition-all capitalize disabled:bg-zinc-500/70 disabled:text-zinc-400/70`,
        className,
        {
          " bg-green-700 hover:bg-green-800": type === "success",
          " bg-red-700 hover:bg-red-800": type === "cancel",
          " bg-primary hover:bg-primary/80": type === "primary",
        }
      )}
    >
      {children}
    </button>
  );
};
