import { Trash } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AppContext } from '../context/app-context'
import { Report } from '../app/types'
import Button from './shared/button'

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
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[300px]'>Produto</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[300px]'>Embalagem do Produto</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[80px]'>Linha</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[150px]'>Total de Lotes</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[180px]'>Lotes Finalizados</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[230px]'>Caixas de Embalagens</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[230px]'>Caixas de Embalagens (Armazém)</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[230px]'>Caixas de Embalagens Necessárias</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[150px]'>Criado em</th>
                            <th className='border border-gray-900 bg-gray-200 py-1 w-[80px]'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {app.reports.map((report, index) => (
                            <tr key={index}>
                                <td className='border border-gray-900 p-3'>
                                    <span className='line-clamp-1'>{report.product.name}</span>
                                </td>
                                <td className='border border-gray-900 p-3'>
                                    <span className='line-clamp-1'>{report.product.packaging}</span>
                                </td>
                                <td className='border border-gray-900 p-3'>{report.line}</td>
                                <td className='border border-gray-900 p-3'>{report.total_batches}</td>
                                <td className='border border-gray-900 p-3'>{report.finished_batches}</td>
                                <td className='border border-gray-900 p-3'>{report.total_packaging_boxes}</td>
                                <td className='border border-gray-900 p-3'>{report.total_packaging_boxes_warehouse}</td>
                                <td className='border border-gray-900 p-3'>{report.required_packaging_boxes}</td>
                                <td className='border border-gray-900 p-3'>{report.created_at}</td>
                                <td className='border border-gray-900 p-3 text-center'>
                                    <button 
                                        onClick={() => handleClickOnRemoveReportButton(index, report)}
                                        className='p-2 bg-red-600 text-white rounded-md shadow-md'
                                    >
                                        <Trash size={24} />
                                    </button>
                                </td>
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