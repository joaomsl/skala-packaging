import { useState } from "react"
import { Action } from './types'
import ViewReports from "../components/view-reports"
import CreateReport from "../components/create-report"
import { useReports } from "../hooks/useReports"
import { AppContext } from "../context/app-context"

export default function App() {
    const [action, setAction] = useState<Action>('view_reports')
    const [reports, setReports] = useReports()

    return (
        <AppContext.Provider value={{action, setAction, reports, setReports}}>
            <div className='p-3 min-h-screen flex flex-col justify-center'>
                <header className='flex gap-2 items-center justify-center'>
                    <img className="max-h-[40px] block" src="brand-icon.webp" alt="Logotipo Skala Cosméticos" />
                    <h1 className='font-medium text-2xl'>Movimentação Skala</h1>
                </header>
                <main>
                    {action === 'view_reports' && <ViewReports />}
                    {action === 'create_report' && <CreateReport />}
                </main>
            </div>
        </AppContext.Provider>
    )
}