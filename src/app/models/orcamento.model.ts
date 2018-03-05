import { isArray, isNullOrUndefined } from "util";
import { Console } from "@angular/core/src/console";
import { Output, EventEmitter } from "@angular/core";

export class orcamentoGeral {
    
    // #region Propriedades

    id : number
    descricao : string
    endereco : string
    cliente : string
    contrato : string
    data_base : Date
    ls_hora : number
    ls_mes : number
    bdi : OrcamentoBdi[]

    // #endregion

    // #region Constructor function
    /**
     * Creates an instance of orcamentoGeral.
     * @param {*} params - parameter provided from the {@class orcamentoService}
     * 
     * @memberOf orcamentoGeral
     */
    constructor(params : any) {
        if (!isNullOrUndefined(params)) {
            this.inicializeOrcamento(params)
        } else {
            this.inicializeEmpty()
        }
    }

    // #endregion

    // #region Helper functions

    /**
     * Auxilia no preenchimento das propriedades da instancia a partir dos dados retornados pelo {@class orcamentoService}
     * 
     * @param {*} params - item retornado pelo serviço
     * 
     * @memberOf orcamentoGeral
     */
    public inicializeOrcamento(params:any) {

        this.id = params.id
        this.descricao = params.descricao
        this.endereco = params.endereco
        this.cliente = params.cliente
        this.contrato = params.contrato
        this.data_base = params.data_base
        this.ls_hora = params.ls_hora
        this.ls_mes = params.ls_mes

        if (!isNullOrUndefined(params.bdi)) {
            let listaBdi = []
            params.bdi.map(bdi => listaBdi.push(new OrcamentoBdi(bdi)))
            this.bdi = listaBdi
        }

    }

    /**
     * Auxilia na criação de um instancia vázia
     * 
     * @memberOf orcamentoGeral
     */
    public inicializeEmpty() {
        this.id = null
        this.descricao = ""
        this.endereco = ""
        this.cliente = ""
        this.contrato = ""
        this.data_base = new Date()
        this.ls_hora = null
        this.ls_mes = null
    }
    // #endregion

}

export class OrcamentoPost {

    // #region Propriedades

    id : number
    descricao : string
    endereco : string
    cliente : string
    contrato : string
    data_base : Date
    ls_hora : number
    ls_mes : number

    //#endregion

    // #region Constructor

    constructor(item : orcamentoGeral) {
        this.id = item.id
        this.descricao = item.descricao
        this.endereco = item.endereco
        this.cliente = item.cliente
        this.contrato = item.contrato
        this.data_base  = item.data_base
        this.ls_hora = item.ls_hora
        this.ls_mes = item.ls_mes
    }

    // #endregion

}

export class OrcamentoBdi {

    id : number
    descricao : string
    valor : number

    // #region Construtor

    /**
     * Creates an instance of orcamentoBdi.
     * 
     * @param {any} params - Dados vindo da consulta HTTP
     * 
     * @memberOf orcamentoBdi
     */
    constructor(params) {
        if (!isNullOrUndefined(params)) {
            this.inicialize(params)
        } else {
            this.inicializeEmpty()
        }
    }
    // #endregion


    // #region Helper functions

    /**
     * Inicializa a instancia com os dados vindo do array de parametros da consulta HTTP
     * 
     * @param {*} params 
     * 
     * @memberOf orcamentoBdi
     */
    public inicialize(params : any) {
        this.id = params.id
        this.descricao = params.descricao
        this.valor = params.valor
    }

    /**
     * Inicializa a instancia com valores nulos ou vazios
     * @memberOf orcamentoBdi
     */
    public inicializeEmpty() {
        this.id = null
        this.descricao = ""
        this.valor = null
    }
    // #endregion

}

export interface IOrcamentoItem {
    
    id : number
    agrupador: boolean
    sequencia : number
    nivel : number
    itemizacao : string
    insumos_id : number
    descricao : string
    unidade : string
    tipos_id : number
    cst_unit_mo : number
    cst_unit_outros : number
    cst_unit : number
    quantidade : number
    bdi : number
    bdi_id : number

}

export interface IOrcamentoItemPost {
    
    sequencia : number
    nivel : number
    itemizacao : string
    insumos_id : number
    quantidade : number
    bdi_id : number 

}

export class OrcamentoItem {

    constructor() {
    }

    @Output() onQuantidadeChanged = new EventEmitter
    @Output() onSequenciaChanged = new EventEmitter
    @Output() onNivelChanged = new EventEmitter

    id : number
    agrupador: boolean
    sequencia : number
    nivel : number
    itemizacao : string
    insumos_id : number
    descricao : string
    unidade : string
    tipos_id : number
    cst_unit_mo : number
    cst_unit_outros : number
    bdi : number
    bdi_id : number
    edicao_mode : boolean = false
    
    private _quantidade : number
    get quantidade():number {
        return this._quantidade
    }
    set quantidade(val:number) {
        this._quantidade = Number(val)
        this.calcularCstTotal()
        this.onQuantidadeChanged.emit();
    }
    
    private _cst_unit : number
    get cst_unit():number {
        return this._cst_unit
    }
    set cst_unit(val:number) {
        this._cst_unit = Number(val)
        this.calcularCstTotal()
    }

    private _cst_total : number
    get cst_total() : number {
        return this._cst_total
    }
    set cst_total(val:number) {
        this._cst_total = val
    }
    calcularCstTotal() {
        this._cst_total = Number((this._cst_unit * this._quantidade).toFixed(2))
    }

    /**
     * Construtor da classe
     */

}


export class OrcamentoItemLista {
    
    private _lista : OrcamentoItem[] = []

    constructor(lista : IOrcamentoItem[]) {
        this.converterInterface(lista)
        this.calcularSubtotal()
    }

    get lista() : OrcamentoItem[] {
        return this._lista
    }

    adicionarItem(item : OrcamentoItem) {
        item.onQuantidadeChanged.subscribe(evento => {
            this.calcularSubtotal()
        })
        this._lista.push(item)
    }

    calcularSubtotal() {
        let indexGrupo : OrcamentoItem = null
        let subtotal : number = 0
        this._lista.forEach((item, index) => {
            if (item.nivel == 1) {
                if (indexGrupo != null) {
                    indexGrupo.cst_total = subtotal
                } 
                indexGrupo = item;
                subtotal = 0
            } else {
                subtotal += item.cst_total
            }
            indexGrupo.cst_total = subtotal
        })
    }

    removerItemEmEdicaoMode() {
        this._lista.forEach((item, index) => {
            if (item.edicao_mode == true) {
                this._lista.splice(index, 1)
            }
        })
    }

    private converterInterface(data : IOrcamentoItem[]) {

        data.forEach(item => {

            let novoItem : OrcamentoItem = new OrcamentoItem()

            novoItem.id = item.id
            novoItem.agrupador = item.agrupador
            novoItem.sequencia = item.sequencia
            novoItem.nivel = item.nivel
            novoItem.itemizacao = item.itemizacao
            novoItem.insumos_id = item.insumos_id
            novoItem.descricao = item.descricao
            novoItem.unidade = item.unidade
            novoItem.quantidade = item.quantidade
            novoItem.tipos_id = item.tipos_id
            novoItem.cst_unit = item.cst_unit
            novoItem.cst_unit_mo = item.cst_unit_mo
            novoItem.cst_unit_outros = item.cst_unit_outros
            novoItem.bdi = item.bdi
            novoItem.bdi_id = item.bdi_id

            this.adicionarItem(novoItem)

        })


    }

}
