import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'

export const OrdersItemFlavorsHelper= {
    url:'itempedidosabors',
   
    async sendItemFlavorOrder(storeId,flavor,itemId){
        try{
            console.log(itemId);
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
            console.log(params);
            let resultItemOrder= await conect.post(
                this.url,
                params
            );
            return resultItemOrder.data;
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar item o pedido");
        }
    },
    async sendItemsFlavorsOrder(storeId,flavors,itemId){
        var resultItems=[];
        try{
            flavors.forEach(flavor=> {
                var resultItem=this.sendItemFlavorOrder(storeId,flavor,itemId);
                resultItems.push(resultItem.data);
            });
        }
        catch(e){
            console.log(e);
            throw Error("Erro ao enviar item o pedido");
        }
        return resultItems;
    },
    
}