import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'
import {StoresHelper} from './Stores-helper.js'
export const OrdersItemHelper= {
    url:'itempedidos',
   
    async sendItemOrder(storeAlias,storeId,uuid,orderId,productId,price,amount,total,note){
        try{
            var params={
                "empresa": storeId,
                "pedido": orderId,
                "uuid": uuid,
                "produto": productId,
                "preco": price,
                "quantidade": amount,
                "valor_total_item": total,
                "observacao": note,
            };
            let resultItemOrder= await conect.post(
                this.url+"?"+(new URLSearchParams({"empresa.apelido":storeAlias})).toString(),
                params
            );
            return resultItemOrder.data;
        }
        catch(e){
            throw Error("Erro ao enviar item o pedido");
        }
    },
    async sendItemOrderPizza(storeAlias,storeId,uuid,orderId,productId,borderId,sizeId,price,amount,total,note){
        try{
            var params={
                "empresa": storeId,
                "pedido": orderId,
                "uuid": uuid,
                "produto": productId,
                "bordatamanho": borderId,
                "tamanho": sizeId,
                "preco": price,
                "quantidade": amount,
                "valor_total_item": total,
                "observacao": note,
            };
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
    async findByStoreAliasOrderId(storeAlias,storeId,userId,OrderId){
        let resultOrderItems;
        try{
            resultOrderItems= await conect.get(this.url,{"empresa.apelido":storeAlias,"empresa.id":storeId,"pedido.usuario":userId,"pedido.id":OrderId});
            return resultOrderItems.data
        }catch(e){throw Error("Erro ao buscar items de pedido");}
    }, 
    
}