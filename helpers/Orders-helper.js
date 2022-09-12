import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'
export const OrdersHelper= {
    url:'pedidos',
    async sendOrder(storeAlias,storeId,uuid,userId,name,phone,address,Note,typeDelivery,cashback,total){
        try{
            phone=phone.replace("(", "");
            phone=phone.replace(")", "");
            phone=phone.replace("-", "");
            phone=phone.replace(" ", "");
            var params={};
            if(typeDelivery=="RETIRAR_BALCAO"){
                params={
                    //"id":id,
                    "uuid":uuid,
                    "empresa":{
                        "id":storeId,
                    },
                    "nome": name,
                    "telefone": phone.replaceAll("[^\\d.]", ""),
                    "usuario":{
                        "id": userId
                    },
                    "observacao": Note,
                    "tipo_entrega": typeDelivery,
                    "troco": cashback,
                    "valor_total": total,
                    "itempedidos":[],
                };
            }
            else if(typeDelivery=="ENTREGAR"){
                params={
                    //"id":id,
                    "uuid":until.uuid(),
                    "empresa":{
                        "id":storeId,
                    },
                    "municipio": {
                        "id": address.municipio.id
                    },
                    "bairro": address.bairro,
                    "endereco": address.logradouro,
                    "numero": address.numero,
                    "complemento": address.complemento,
                    "nome": name,
                    "telefone": phone.replaceAll("[^\\d.]", ""),
                    "usuario":{
                        "id": userId
                    },
                    "observacao": Note,
                    "tipo_entrega": typeDelivery,
                    "troco": cashback,
                    "valor_total": total,
                    "itempedidos":[],
                };
            }
            let result= await conect.post(
                this.url+"?"+(new URLSearchParams({"empresa.apelido":storeAlias})).toString(),
                params
            );
            var resultOrder = result.data;
            return resultOrder;
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar o pedido");
        }
    },
   
    async lastOrdes(storeAlias,storeId,userId){
		let resultOrder;
        try{
            resultOrder= await conect.get(this.url,{"empresa.apelido":storeAlias,"empresa.id":storeId,"usuario.id":userId});
            return resultOrder.data
        }catch(e){throw Error("Erro ao buscar pedidos");}
    },
    
    async findByStoreAliasOrderId(storeAlias,storeId,userId,OrderId){
        let resultOrder=null;
        let order=null;
        try{
            resultOrder= await conect.get(this.url,{"empresa.apelido":storeAlias,"empresa.id":storeId,"usuario.id":userId,"id":OrderId});
            if (
                (!until.isEmpty(resultOrder.data))
                &&(resultOrder.data.length>0)
                &&(!until.arrayAllElementsIsEmpy(resultOrder.data))
            )
            {
                order=resultOrder.data[0];
            }
            return order
        }catch(e){
            throw Error("Erro ao buscar pedidos");
        }
    }, 
}