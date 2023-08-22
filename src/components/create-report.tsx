import { useContext, useState } from "react"
import { Product } from "../app/types"
import calculatePackagingBoxes from "../utils/packaging-boxes-calculator"
import { AppContext } from "../context/app-context"
import products from '../app/products.json'

export default function CreateReport() {
    const app = useContext(AppContext)!

    const [product, setProduct] = useState<Product|null>(products[0])
    const [productionLine, setProductionLine] = useState<number|null>(null)
    const [totalBatches, setTotalBatches] = useState<number|null>(null)
    const [finishedBatches, setFinishedBatches] = useState(0)
    const [warehousePackagingBoxes, setWarehousePackagingBoxes] = useState(0)

    const createReport = () => {
        if(!product) {
            alert('Produto inválido.')
            return
        }
        if(!productionLine) {
            alert('Linha de produção inválida.')
            return
        }
        if(!totalBatches || totalBatches < 1) {
            alert('O total de lotes é inválido.')
            return
        }
        if(finishedBatches < 0 || finishedBatches >= totalBatches) {
            alert('O número de lotes finalizados é inválido.')
            return
        }
        if(warehousePackagingBoxes < 0) {
            alert('O número de caixas no armazém é inválido.')
            return
        }

        const totalPackagingBoxes = calculatePackagingBoxes(totalBatches)
        const usedPackagingBoxes = finishedBatches > 0 ? calculatePackagingBoxes(finishedBatches) : 0

        const requiredPackagingBoxes = Math.max(totalPackagingBoxes - warehousePackagingBoxes - usedPackagingBoxes, 0)

        const currentDate = new Date
        app.setReports([
            {
                product: product,
                line: productionLine,
                total_batches: totalBatches,
                finished_batches: finishedBatches,
                total_packaging_boxes: totalPackagingBoxes,
                total_packaging_boxes_warehouse: warehousePackagingBoxes,
                required_packaging_boxes: requiredPackagingBoxes,
                created_at: `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`
            },
            ...app.reports
        ])
        app.setAction('view_reports')
    }

    return (
        <section className="mt-4">
            <form className="mt-4 max-w-lg w-full mx-auto">
                <div>
                    <label className="text-gray-800 font-medium" htmlFor="product">Produto</label>
                    <select 
                        onChange={(ev) => setProduct(products[parseInt(ev.target.value)])}
                        className="w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all"
                        id="product"
                    >
                        {products.map((product, index) => (
                            <option value={index} key={index}>{ product.name }</option>
                        ))}
                    </select>

                    {product && <p className="mt-1 text-gray-800 text-sm">Pote utilizado: {product.packaging}</p>}
                </div>
                <div className="mt-3">
                    <label className="text-gray-800 font-medium" htmlFor="line">Linha de produção</label>
                    <input 
                        onChange={(ev) => setProductionLine(parseInt(ev.target.value))}
                        className="w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all" 
                        id="line" 
                        type="number"
                    />
                </div>

                <div className="flex gap-3">
                    <div className="mt-3">
                        <label className="text-gray-800 font-medium" htmlFor="total_batches">Total de lotes</label>
                        <input 
                            onChange={(ev) => setTotalBatches(parseInt(ev.target.value))}
                            className="w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all" 
                            id="total_batches" 
                            type="number" 
                            min="1" 
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-gray-800 font-medium" htmlFor="finished_batches">Lotes finalizados</label>
                        <input 
                            onChange={(ev) => setFinishedBatches(parseInt(ev.target.value))}
                            className="w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all" 
                            id="finished_batches" 
                            type="number" 
                            defaultValue="0" 
                            min="0" 
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <label className="text-gray-800 font-medium" htmlFor="warehouse_packaging_boxes">
                        Caixas de embalagens (no armazém)
                    </label>
                    <input 
                        onChange={(ev) => setWarehousePackagingBoxes(parseInt(ev.target.value))}
                        className="w-full rounded-lg border-gray-300 bg-gray-200 hover:ring-green-600 hover:border-green-600 focus:ring-green-600 focus:border-green-600 transition-all" 
                        id="warehouse_packaging_boxes" 
                        type="number" 
                        defaultValue="0" 
                        min="0" 
                    />
                    <p className="mt-1 text-gray-800 text-sm">
                        Apenas relevante para essa movimentação, as outras <b>não são recalculadas.</b>
                    </p>
                </div>

                <div className='flex flex-col mt-3 gap-2 sm:flex-row sm:gap-4'>
                    <button 
                        onClick={createReport}
                        type="button" 
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                        Calcular
                    </button>
                    <button 
                        onClick={() => app.setAction('view_reports')}
                        type="button" 
                        className="w-full text-red-700 border border-red-700 px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    )
}