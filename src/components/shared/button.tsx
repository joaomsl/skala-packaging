import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary'|'danger',
    aspect?: 'full'|'outline'
}

const styleVariants = {
    primary: {
        full: 'bg-green-600 text-white hover:bg-green-700 transition-colors',
        outline: 'text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-colors'
    },
    danger: {
        full: 'bg-red-700 text-white hover:bg-red-800 transition-colors',
        outline: 'text-red-700 border border-red-700 hover:bg-red-700 hover:text-white transition-colors'
    }
}

export default function Button({color = 'primary', aspect = 'full', children, className, ...props}: ButtonProps) {
    return (
        <button className={`w-full px-4 py-2 rounded-md ${styleVariants[color][aspect]} ${className}`} {...props}>
            { children }
        </button>
    )
}