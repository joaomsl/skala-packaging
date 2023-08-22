import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({className, children, ...props}: LabelProps) {
    return (
        <label className={`text-gray-800 font-medium ${className}}`} {...props}>
            { children }
        </label>
    )
}