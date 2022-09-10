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
   
    async lastOrdes(storeAlias,userId){
		let resultOrder;
        try{
            resultOrder= await conect.get(this.url,{"empresa.apelido":storeAlias,"usuario.id":userId});
            return resultOrder.data
        }catch(e){throw Error("Erro ao buscar pedidos");}
    },
    
    async OrdeById(storeAlias,userId,OrderId){
        var result=null;
        try{
            let resultOrder= await this.lastOrdes(storeAlias,userId)
            resultOrder.forEach(element => {
                if(
                    (element.id==OrderId)
                ){
                    result=element;
                }
            });
            return result;
        }
        catch(e){
            throw Error("Erro ao buscar pedido");
        }
    }, 
}