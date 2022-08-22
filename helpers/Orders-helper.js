import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const OrdersHelper= {
    url:'pedido',
    
    async sendOrder(storeAlias,address,userId,name,phone,Note,typeDelivery,cashback,total,itens){
        try{
            store= await StoresHelper.findByAliasLocalStorage(storeAlias);
            let resultOrder= await conect.post(
                this.url+"?"+(new URLSearchParams({"empresa.apelido":storeAlias})).toString(),
                {
                    //"id":id,
                    "uuid":until.uuid(),
                    "empresa":{
                        "id":store.id,
                    },
                    "municipio": {
                        "id": address.municipio.id
                    },
                    "bairro": address.bairro,
                    "endereco": address.endereco,
                    "numero": address.numero,
                    "complemento": address.complemento,
                    "nome": name,
                    "telefone": phone,
                    "usuario":{
                        "id": userId
                    },
                    "observacao": Note,
                    "tipo_entrega": typeDelivery,
                    "troco": cashback,
                    "valor_total": total,
                    "itempedidos":itens,
                }
            );
            return resultOrder.data;
        }
        catch(e){throw Error("Erro ao enviar o pedido");}
    },
    async lastOrdes(userId){
        let resultOrder= await conect.post(this.url,{"id_usuario":userId});
        return resultOrder.data;
    },
}

/*
    {
        "id": 888,
        "uuid": "83f0152c-83e3-4f87-8d29-2bb149f18b5f",
        "empresa": {
            "id": 1
        },
        "municipio": {
            "id": 1
        },
        "bairro": "JD GISELA",
        "endereco": "R WALDEMAR ROSSONI",
        "numero": "298",
        "complemento": null,
        "nome": "ALEXANDRO",
        "telefone": "45999225548",
        "usuario": {
            "id": 1
        },
        "observacao": "ENTREGAR AS 19H",
        "tipo_entrega": "ENTREGAR",
        "troco": null,
        "valor_total": 100,
        "itempedidos": [
            {
                "id": 3
            }
        ]
    }

 {
    "uuid": "5e004d4a-8f24-4d9d-9d74-26491ac4becb",
    "empresa": 1,
    "bordatamanho": 1,
    "produto": 3,
    "observacao": null,
    "preco": 100,
    "quantidade": 1,
    "tamanho": 2,
    "valor_total_item": 100,
    "pedido": 888
}
sabor
adicionais
tipo de borda    
    */