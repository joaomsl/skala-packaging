import { useEffect, useState } from "react"
import {State, Report} from './types'
import ViewReports from "../components/view-reports"
import CreateReport from "../components/create-report"
import products from './products.json'

export default function App() {
    const [state, setState] = useState<State>('view_reports');
    const [reports, setReports] = useState<Report[]>(
        JSON.parse(window.localStorage.getItem('reports') ?? '[]')
    )

    useEffect(() => {
        window.localStorage.setItem('reports', JSON.stringify(reports))
    }, [reports])

    const addReport = (report: Report) => {
        setReports([report, ...reports])
    }

    return (
        <div className='p-3 min-h-screen flex flex-col justify-center'>
            <header className='flex gap-2 items-center justify-center'>
                <img className="max-h-[40px] block" src="brand-icon.webp" alt="Logotipo Skala Cosméticos" />
                <h1 className='font-medium text-2xl'>Movimentação Skala</h1>
            </header>
            <main>
                {state === 'view_reports' ? <ViewReports reports={reports} setState={setState} setReports={setReports} /> : ''}
                {state === 'create_report' ? <CreateReport products={products} setState={setState} addReport={addReport} /> : ''}
            </main>
        </div>
    )
}