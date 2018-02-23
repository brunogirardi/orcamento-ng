interface Insumos {
    
    id: any
    descricao: string
    unidade: string
    tipo: string
    tipos_id: number
    cst_total: number
    cst_mo : number
    cst_outros : number
    
}

interface InsumosPost {
    
    id: number
    descricao: string
    unidade: string
    cst_total: number
    tipos_id: number 
    
}

export { Insumos, InsumosPost }