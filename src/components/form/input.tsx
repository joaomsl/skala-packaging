import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({className, ...props}: InputProps) {
    return (
        <input 
            className={`w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all ${className}`} 
            {...props}
        />
    )
}