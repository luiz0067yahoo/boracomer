import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'
import {StoresHelper} from './Stores-helper.js'
export const OrdersItemHelper= {
    url:'itempedidos',
   
    async sendItemOrder(storeAlias,storeId,uuid,orderId,productId,borderId,sizeId,note,price,amount,total){
        try{
            var params={
                "empresa": storeId,
                "pedido": orderId,
                "uuid": uuid,
                "produto": productId,
                "bordatamanho": borderId,
                "tamanho": sizeId,
                "observacao": note,
                "preco": price,
                "quantidade": amount,
                "valor_total_item": total,
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