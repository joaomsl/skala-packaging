import { TdHTMLAttributes } from "react";

interface HeadCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export default function HeadCell({className, children, ...props}: HeadCellProps) {
    return (
        <th className={`border border-gray-900 bg-gray-200 py-1 ${className}`} {...props}>
            { children }
        </th>
    )
}