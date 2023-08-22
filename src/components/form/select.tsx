import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({className, children, ...props}: SelectProps) {
    return (
        <select 
            className={`w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all ${className}`} 
            {...props}
        >
            { children }
        </select>
    )
}