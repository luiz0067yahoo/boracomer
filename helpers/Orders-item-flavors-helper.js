import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'

export const OrdersItemFlavorsHelper= {
    url:'itempedidosabors',
   
    async sendItemFlavorOrder(storeAlias,storeId,itemId,flavor){
        try{
            var params={
                "uuid": until.uuid(),
                "itempedido": {
                    "id": itemId
                },
                "sabor": {
                    "id": flavor.id
                },
                "valor_sabor": flavor.valor,
                "empresa": {
                    "id": storeId,
                }
            }
            let resultItemOrder= await conect.post(
                this.url+"?"+(new URLSearchParams({"empresa.apelido":storeAlias})).toString(),
                params
            );
            return resultItemOrder.data;
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar item o pedido");
        }
    },
    async sendItemsFlavorsOrder(storeAlias,storeId,itemId,flavors){
        var resultItems=[];
        try{
            flavors.forEach(flavor=> {
                var resultItem=this.sendItemFlavorOrder(storeAlias,storeId,itemId,flavor);
                resultItems.push(resultItem.data);
            });
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar item o pedido");
        }
        return resultItems;
    },
    async findByStoreAliasOrderItemId(storeAlias,storeId,orderId,orderitemId){
        let resultOrderItems;
        try{
            resultOrderItems= await conect.get(this.url,{"empresa.apelido":storeAlias,"empresa.id":storeId,"itempedido.pedido":orderId,"itempedido.id":orderitemId});
            return resultOrderItems.data
        }catch(e){throw Error("Erro ao buscar items de pedido");}
    }, 
    
}