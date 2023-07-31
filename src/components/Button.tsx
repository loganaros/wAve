import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
    small?: boolean;
    gray?: boolean;
    className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({ small = false, gray = false, className="", ...props }:ButtonProps) {
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
    const colorClasses = gray ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300" :
                                "bg-pink-500 hover:bg-pink-400 focus-visible:bg-pink-400";

    return <button className={`rounded-lg transition-colors duration-100 disable:cursor-not-allowed disabled:opacity-50 text-white ${sizeClasses} ${colorClasses} ${className}`} {...props}></button>
}