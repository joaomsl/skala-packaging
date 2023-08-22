import { useEffect, useState } from "react"
import { Report } from "../app/types"

export function useReports(): [Report[], (reports: Report[]) => void] {
    const [reports, setReports] = useState<Report[]>(
        JSON.parse(window.localStorage.getItem('reports') ?? '[]')
    )
    
    useEffect(() => {
        window.localStorage.setItem('reports', JSON.stringify(reports))
    }, [reports]);

    return [reports, setReports]
}