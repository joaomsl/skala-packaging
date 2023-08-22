const totalPackagingPerBox = 124

export default function calculatePackagingBoxes(totalBatches: number, line: number ) {
    let totalProductsPerBatch = 0

    if([1, 2].includes(line)) {
        totalProductsPerBatch = 2900
    } else if([9, 10].includes(line)) {
        totalProductsPerBatch = 2000
    } else if(line == 11) {
        totalProductsPerBatch = 8000
    } else {
        throw new Error("Linha informada é inválida!");
    }
    
    const total = Math.round((totalBatches * totalProductsPerBatch) / totalPackagingPerBox)
    return Math.max(total, 1);
}