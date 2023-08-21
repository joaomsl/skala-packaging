export type State = 'view_reports'|'create_report'|'edit_report'

export type Product = {
    name: string,
    packaging: string
}

export type Report = {
    product: Product,
    line: number,
    total_batches: number,
    finished_batches: number,
    total_packaging_boxes: number,
    total_packaging_boxes_warehouse: number,
    required_packaging_boxes: number,
    created_at: string
}