import { TdHTMLAttributes } from "react";

interface DataCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    lineClamp?: boolean
}

export default function DataCell({className, children, lineClamp = false, ...props}: DataCellProps) {
    return (
        <td className={`border border-gray-900 p-3 ${className}`} {...props}>
            {
                lineClamp ?
                <span className='line-clamp-1'>{children}</span> : 
                children
            }
        </td>
    )
}