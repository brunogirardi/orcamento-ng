import { Output, EventEmitter } from "@angular/core";

export { Cpus, Cpu_item, Cpus_item_post, Cpus_post }

class Cpus {

    id: number
    descricao: string
    unidade: string
    tipos_id: number
    tipo: string
    cst_total: number
    itens: Cpu_item[]

    constructor(id: number, descricao: string, unidade: string, tipos_id: number, tipo: string, cst_total: number, itens: Cpu_item[] = [])
    {
        this.id = id
        this.descricao = descricao
        this.unidade = unidade
        this.tipos_id = tipos_id
        this.tipo = tipo
        this.cst_total = cst_total
        this.itens = itens
    }

    adicionarItem(novo : Cpu_item) {
        this.itens.push(novo)
        novo.onQuantidadeChange.subscribe(event => { this.calcularTotal() })
        this.calcularTotal()
    }

    removerItem(i : number) {
        // Retorno o item a lista
        if (this.itens[i].status == 2) {
            if (this.itens[i].quant_original != null) {
                this.itens[i].status = 0
            } else {
                this.itens[i].status = 3
            }
            this.itens[i].resetarQuantidade()
        } else {
            this.itens[i].status = 2
            this.itens[i].quantidade = 0
        }

        this.calcularTotal()
    }

    observarItens() {
        this.itens.forEach(item => {
            item.onQuantidadeChange.subscribe(event => { this.calcularTotal() })
        })
    }

    calcularTotal() {
        let total : number = 0
        this.itens.forEach(item => {
            if (item.status != 2) {
                total += Number((item.cst_total * item.quantidade).toFixed(2))
            }
        })
        this.cst_total = total
    }

    gerarPost() : Cpus_post {

        let itens : Cpus_item_post[] = []

        this.itens.forEach(item => {
            let novo : Cpus_item_post = {
                id : item.id,
                insumos_id : item.insumos_id,
                quantidade : item.quantidade,
                status : item.status
            }
            itens.push(novo)
        })

        let item : Cpus_post = {
            id : this.id,
            descricao : this.descricao,
            unidade : this.unidade,
            cst_total : this.cst_total,
            itens : itens
        }

        return item
    }

}

class Cpu_item {

    id: number
    insumos_id: number
    descricao: string
    unidade: string
    tipos_id: number
    tipo: string
    cst_total: number
    status: number
    quant_original: number = null

    @Output() onQuantidadeChange = new EventEmitter

    private _quantidade: number
    get quantidade():number {
        return this._quantidade
    }
    set quantidade(val:number) {
        if (this.status == 0) { this.status = 1 }
        this._quantidade = Number(val)
        this.onQuantidadeChange.emit()
    }

    constructor(insumos_id: number, descricao: string, unidade: string, tipos_id: number,
                tipo: string, cst_total: number, status: number, quantidade: number, id : number = null) 
    {
        this.id = id
        this.insumos_id = insumos_id
        this.descricao = descricao
        this.unidade = unidade
        this.tipos_id = tipos_id
        this.tipo = tipo
        this.cst_total = cst_total
        this.status = status
        this._quantidade = quantidade
        if (status == 0) {
            this.quant_original = quantidade
        }

    }

    public resetarQuantidade() {
        if (this.quant_original == null) {
            this._quantidade = 0
        }
        this._quantidade = this.quant_original
    }

}

interface Cpus_post {

    id: number,
    descricao: string;
    unidade: string;
    cst_total: number,

    itens : Cpus_item_post[]

}

interface Cpus_item_post {

    id: number,
    insumos_id: number,
    status: number,
    quantidade: number

}