interface Insumos {
    
    id: any
    descricao: string
    unidade: string
    tipo: string
    tipos_id: number
    cst_total: number
    
}

interface InsumosPost {
    
    descricao: string
    unidade: string
    cst_total: number
    tipo_id: number
    
}

export { Insumos, InsumosPost }