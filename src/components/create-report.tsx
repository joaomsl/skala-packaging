import { useContext, useState } from "react"
import { Product } from "../app/types"
import calculatePackagingBoxes from "../utils/packaging-boxes-calculator"
import { AppContext } from "../context/app-context"
import products from '../app/products.json'
import Button from "./shared/button"
import Select from "./form/select"
import Label from "./form/label"
import Description from "./form/description"
import Input from "./form/input"

export default function CreateReport() {
    const app = useContext(AppContext)!

    const [product, setProduct] = useState<Product>(products[0])
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
                    <Label htmlFor="product">Produto</Label>
                    <Select 
                        id="product"
                        onChange={(ev) => setProduct(products[parseInt(ev.target.value)])}
                    >
                        {products.map((product, index) => (
                            <option value={index} key={index}>{ product.name }</option>
                        ))}
                    </Select>

                    {product && <Description className="mt-1">Pote utilizado: {product.packaging}</Description>}
                </div>
                <div className="mt-3">
                    <Label htmlFor="line">Linha de produção</Label>
                    <Input 
                        id="line" 
                        type="number"
                        onChange={(ev) => setProductionLine(parseInt(ev.target.value))}
                    />
                </div>

                <div className="flex gap-3 mt-3">
                    <div>
                        <Label htmlFor="total_batches">Total de lotes</Label>
                        <Input 
                            id="total_batches" 
                            type="number"
                            min="1" 
                            onChange={(ev) => setTotalBatches(parseInt(ev.target.value))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="finished_batches">Lotes finalizados</Label>
                        <Input 
                            id="finished_batches" 
                            type="number"
                            defaultValue={finishedBatches}
                            min="0" 
                            onChange={(ev) => setFinishedBatches(parseInt(ev.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <Label htmlFor="warehouse_packaging_boxes">Caixas de embalagens (no armazém)</Label>
                    <Input 
                        id="warehouse_packaging_boxes" 
                        type="number"
                        defaultValue={warehousePackagingBoxes}
                        min="0" 
                        onChange={(ev) => setWarehousePackagingBoxes(parseInt(ev.target.value))}
                    />
                    <Description className="mt-1">
                        Apenas relevante para essa movimentação, as outras <b>não são recalculadas.</b>
                    </Description>
                </div>

                <div className='flex flex-col mt-3 gap-2 sm:flex-row sm:gap-4'>
                    <Button type="button" onClick={createReport}>
                        Calcular
                    </Button>

                    <Button 
                        type="button"
                        color='danger' 
                        aspect='outline' 
                        onClick={() => app.setAction('view_reports')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </section>
    )
}