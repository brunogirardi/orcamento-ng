export { Cpus, Cpu_item }

interface Cpus {

    id: number
    descricao: string
    unidade: string
    tipos_id: number
    tipo: string
    itens: Cpu_item[]
}

interface Cpu_item {
    id: number              // ID da posição na lista de itens da CPU
    insumos_id: number
    descricao: string
    unidade: string
    tipos_id: number
    tipo: string
    cst_total: number
    quantidade: number
}
