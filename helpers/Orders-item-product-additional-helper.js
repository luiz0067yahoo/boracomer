import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'

export const OrdersItemProductAdditionalHelper= {
    url:'itempedidoadicionals',   
    async sendItemProductAdditionalOrder(storeAlias,storeId,itemId,productAdditional){
        try{
            var params={
                "uuid": until.uuid(),
                "itempedido": {
                    "id": itemId
                },
                "produto_adicional": {
                    "id": productAdditional.produto.id
                },
                "valor_adicional": productAdditional.valor,
                "empresa": {
                    "id": storeId,
                }
            }
            let resultProductAdditional = await conect.post(
                this.url+"?"+(new URLSearchParams({"empresa.apelido":storeAlias})).toString(),
                params
            );
            return resultProductAdditional.data;
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar produto adicional o pedido");
        }
    },
    async sendItemsProductAdditionalOrder(storeAlias,storeId,itemId,productAdditionals){
        var resultItems=[];
        try{
            productAdditionals.forEach(productAdditional=> {
                var resultItem=this.sendItemProductAdditionalOrder(storeAlias,storeId,itemId,productAdditional);
                resultItems.push(resultItem.data);
            });
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar produto adicional o pedido");
        }
        return resultItems;
    },
    async findByStoreAliasOrderProductAdditionalId(storeAlias,storeId,orderId,orderitemId){
        let resultOrderProductAdditionals;
        try{
            resultOrderProductAdditionals= await conect.get(this.url,{"empresa.apelido":storeAlias,"empresa.id":storeId,"itempedido.pedido":orderId,"itempedido.id":orderitemId});
            return resultOrderProductAdditionals.data
        }catch(e){throw Error("Erro ao buscar produtos adicional de pedido");}
    },     
}