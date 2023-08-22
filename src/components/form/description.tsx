import { HTMLAttributes } from "react";

interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export default function Description({className, children, ...props}: DescriptionProps) {
    return (
        <p className={`text-gray-800 text-sm ${className}`} {...props}>
            { children }
        </p>
    )
}