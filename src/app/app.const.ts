export enum status_items {
    original,               // index = 0
    updated,                // index = 1
    deleted,                // index = 2
    inserted                // index = 3
}

export enum tipos_insumos_enum {
    material = 1,
    mao_de_obra,
    equipamento,
    tercerizados,
    verbas,
    cpus
}

export const tipos_insumos : Array<any> = [
    {
        id: 1,
        text: "MATERIAL",
    },
    {
        id: 2,
        text: "MÃO DE OBRA",
    },
    {
        id: 3,
        text: "EQUIPAMENTOS",
    },
    {
        id: 4,
        text: "TERCERIZADOS",
    },
    {
        id: 5,
        text: "VERBAS",
    },
    {
        id: 6,
        text: "CPUS",
    }    
]