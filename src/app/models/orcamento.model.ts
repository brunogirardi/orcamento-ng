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
    dataBase : Date
    lsHora : number
    lsMes : number
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
        this.dataBase = params.data_base
        this.lsHora = params.ls_hora
        this.lsMes = params.ls_mes

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
        this.dataBase = new Date()
        this.lsHora = null
        this.lsMes = null
    }
    // #endregion

}

/**
 * Class utilizada para envio em POST
 * 
 * @export
 * @class OrcamentoPost
 */
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
        this.data_base  = item.dataBase
        this.ls_hora = item.lsHora
        this.ls_mes = item.lsMes
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

export class OrcamentoItem{

    @Output() onQuantidadeChanged = new EventEmitter
    @Output() onSequenciaChanged = new EventEmitter
    @Output() onNivelChanged = new EventEmitter

    id : number
    agrupador: boolean
    sequencia : number
    nivel : number
    itemizacao : string
    descricao : string
    unidade : string
    tipo : number
    cst_unit_mo : number
    cst_unit_outros : number
    bdi_taxa : number
    bdi_id : number
    edicao_mode : boolean
    
    _quantidade : number
    get quantidade():number {
        return this._quantidade
    }
    set quantidade(val:number) {
        this._quantidade = Number(val)
        this.calcularCstTotal()
        this.onQuantidadeChanged.emit();
    }
    
    _cst_unit : number
    get cst_unit():number {
        return this._cst_unit
    }
    set cst_unit(val:number) {
        this._cst_unit = Number(val)
        this.calcularCstTotal()
    }

    _cst_total : number
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

export interface OrcamentoItemPost {
    
}

export class OrcamentoItemLista {
    
    _lista : OrcamentoItem[] = []

    constructor(lista : OrcamentoItem[]) {
        this._lista = lista
        this.observarItens()
        this.calcularSubtotalInicial()
    }

    get lista() : OrcamentoItem[] {
        return this._lista
    }
    set lista(val:OrcamentoItem[]) {
        this._lista = val
        this.observarItens()
    }

    observarItens() {
        this._lista.forEach(item => {
            item.onQuantidadeChanged.subscribe(evento => {
                this.calcularSubtotalInicial()
            })
        })
    }

    calcularSubtotalInicial() {
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

}
