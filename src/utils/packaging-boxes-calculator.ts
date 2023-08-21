const totalProductsPerBatch = 2900
const totalPackagingPerBox = 124

export default function calculatePackagingBoxes(totalBatches: number) {
    const total = Math.round((totalBatches * totalProductsPerBatch) / totalPackagingPerBox)
    return Math.max(total, 1);
}