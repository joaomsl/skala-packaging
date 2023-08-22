import { Trash } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AppContext } from '../context/app-context'
import { Report } from '../app/types'
import Button from './shared/button'
import HeadCell from './shared/table/head-cell'
import DataCell from './shared/table/data-cell'

export default function ViewReports() {
    const app = useContext(AppContext)!

    const handleClickOnRemoveReportButton = (index: number, report: Report) => {
        if(!confirm(`Você realmente deseja remover o registro: Linha ${report.line}, "${report.product.name}"?`)) {
            return
        }

        const reportsWithoutIndex = app.reports.filter(
            (report, reportIndex) => reportIndex !== index 
        )
        
        app.setReports(reportsWithoutIndex)
    }

    const handleClickOnClearReportsButton = () => {
        if(!confirm(`Tem certeza que deseja remover todos os ${app.reports.length} registros?`)) {
            return
        }

        app.setReports([])
    }

    if(app.reports.length < 1) {
        return (
            <section className="text-center">
                <img className="w-[70%] max-w-xs mx-auto" src="empty-box.svg" alt="Ilustração de uma caixa vazia" />
                <h1 className="font-medium text-xl">Relatório vazio</h1>
                <p className="mt-2 text-md text-gray-800">Gere a primeira movimentação clicando no botão abaixo:</p>
                <Button 
                    className='mt-3 max-w-sm'
                    onClick={() => app.setAction('create_report')}
                >
                    Novo cálculo
                </Button>
            </section>
        )
    }

    return (
        <section className='mt-4'>
            <div className='overflow-x-auto relative scrollbar-thin scroll-m-2'>
                <table className='w-full table-fixed border-collapse mb-1'>
                    <thead>
                        <tr>
                            <HeadCell className='w-[18.75rem]'>Produto</HeadCell>
                            <HeadCell className='w-[18.75rem]'>Embalagem do Produto</HeadCell>
                            <HeadCell className='w-[5rem]'>Linha</HeadCell>
                            <HeadCell className='w-[9.37rem]'>Total de Lotes</HeadCell>
                            <HeadCell className='w-[11.25rem]'>Lotes Finalizados</HeadCell>
                            <HeadCell className='w-[14.37rem]'>Caixas de Embalagens</HeadCell>
                            <HeadCell className='w-[14.37rem]'>Caixas de Embalagens (Armazém)</HeadCell>
                            <HeadCell className='w-[14.37rem]'>Caixas de Embalagens Necessárias</HeadCell>
                            <HeadCell className='w-[12.5rem]'>Criado em</HeadCell>
                            <HeadCell className='w-[5rem]'>Ação</HeadCell>
                        </tr>
                    </thead>
                    <tbody>
                        {app.reports.map((report, index) => (
                            <tr key={index}>
                                <DataCell lineClamp>{report.product.name}</DataCell>
                                <DataCell lineClamp>{report.product.packaging}</DataCell>
                                <DataCell>{report.line}</DataCell>
                                <DataCell>{report.total_batches}</DataCell>
                                <DataCell>{report.finished_batches}</DataCell>
                                <DataCell>{report.total_packaging_boxes}</DataCell>
                                <DataCell>{report.total_packaging_boxes_warehouse}</DataCell>
                                <DataCell>{report.required_packaging_boxes}</DataCell>
                                <DataCell>{report.created_at}</DataCell>
                                <DataCell className='text-center'>
                                    <button 
                                        onClick={() => handleClickOnRemoveReportButton(index, report)}
                                        className='p-2 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-md shadow-md'
                                    >
                                        <Trash size={24} />
                                    </button>
                                </DataCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex flex-col mt-3 gap-2 sm:flex-row sm:gap-4 sm:max-w-sm'>
                <Button onClick={() => app.setAction('create_report')}>
                    Novo cálculo
                </Button>
                {
                    app.reports.length > 1 &&
                    <Button
                        color='danger'
                        aspect='outline'
                        onClick={handleClickOnClearReportsButton}
                    >
                        Limpar registros
                    </Button>
                }
            </div>
        </section>
    )
}