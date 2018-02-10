import { Output, EventEmitter } from "@angular/core";

export { Cpus, Cpu_item, Cpus_item_post, Cpus_post, Cpu_lista }

class Cpus {

    id: number
    descricao: string
    unidade: string
    tipos_id: number
    tipo: string
    cst_total: number
    cst_mo: number
    cst_outros: number
    cst_subtotal : number
    cst_encargos: number
    cst_bdi : number
    itens: Cpu_item[]
    
    
    private _taxa_bdi : number = 26
    get taxa_bdi():number {
        return this._taxa_bdi
    }
    set taxa_bdi(val:number) {
        this._taxa_bdi = Number(val)
        this.calcularTotal()
    }

    private _taxa_ls_hora : number = 120
    get taxa_ls_hora():number {
        return this._taxa_ls_hora
    }
    set taxa_ls_hora(val:number) {
        this._taxa_ls_hora = Number(val)
        this.calcularTotal()
    }

    private _taxa_ls_mes : number = 80
    get taxa_ls_mes():number {
        return this._taxa_ls_mes
    }
    set taxa_ls_mes(val:number) {
        this._taxa_ls_mes = Number(val)
        this.calcularTotal()
    }

    constructor(id: number, descricao: string, unidade: string, tipos_id: number, tipo: string, cst_total: number,
                itens: Cpu_item[] = [])
    {
        this.id = id
        this.descricao = descricao
        this.unidade = unidade
        this.tipos_id = tipos_id
        this.tipo = tipo
        this.cst_total = cst_total
        this.cst_mo = 0
        this.cst_outros = 0
        this.cst_encargos = 0
        this.cst_bdi = 0
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
        let cst_mo : number = 0
        let cst_outros : number = 0
        this.itens.forEach(item => {
            cst_mo += Number((item.cst_mo * item.quantidade).toFixed(2))
            cst_outros += Number((item.cst_outros * item.quantidade).toFixed(2))
        })
        this.cst_mo = cst_mo
        this.cst_outros = cst_outros
        this.cst_encargos = Number((cst_mo * this._taxa_ls_hora / 100).toFixed(2))
        this.cst_subtotal = this.cst_mo + this.cst_outros + this.cst_encargos
        this.cst_bdi = Number((this.cst_subtotal * this._taxa_bdi / 100).toFixed(2))
        this.cst_total = this.cst_subtotal + this.cst_bdi
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
            cst_total : this.cst_mo + this.cst_outros,
            cst_mo : this.cst_mo,
            cst_outros : this.cst_outros,
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
    cst_mo: number
    cst_outros: number
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
                tipo: string, cst_total: number, status: number, quantidade: number, id : number = null,
                cst_mo: number, cst_outros: number) 
    {
        this.id = id
        this.insumos_id = insumos_id
        this.descricao = descricao
        this.unidade = unidade
        this.tipos_id = tipos_id
        this.tipo = tipo
        this.cst_total = cst_total
        this.cst_mo = cst_mo
        this.cst_outros = cst_outros
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

// Class para listagem de cpus e com implementação para alterar as LS e BDI conforme parametrização do usuário
class Cpu_lista {

    itens : Cpus[] = []

    private _taxa_bdi : number = 0
    get taxa_bdi():number {
        return this._taxa_bdi
    }
    set taxa_bdi(val:number) {
        this._taxa_bdi = Number(val)
        this.calcularBonificacoes()
    }

    private _taxa_ls_hora : number = 120
    get taxa_ls_hora():number {
        return this._taxa_ls_hora
    }
    set taxa_ls_hora(val:number) {
        this._taxa_ls_hora = Number(val)
        this.calcularBonificacoes()
    }

    private _taxa_ls_mes : number = 80
    get taxa_ls_mes():number {
        return this._taxa_ls_mes
    }
    set taxa_ls_mes(val:number) {
        this._taxa_ls_mes = Number(val)
        this.calcularBonificacoes()
    }

    calcularBonificacoes() {

        this.itens.forEach(item => {
            item.cst_encargos = 
            item.cst_encargos = Number((item.cst_mo * this._taxa_ls_hora / 100).toFixed(2))
            item.cst_subtotal = item.cst_mo + item.cst_outros + item.cst_encargos
            item.cst_bdi = Number((item.cst_subtotal * this._taxa_bdi / 100).toFixed(2))
            item.cst_total = item.cst_subtotal + item.cst_bdi
        })

    }


}

interface Cpus_post {

    id: number,
    descricao: string,
    unidade: string,
    cst_total: number,
    cst_mo: number,
    cst_outros: number

    itens : Cpus_item_post[]

}

interface Cpus_item_post {

    id: number,
    insumos_id: number,
    status: number,
    quantidade: number

}