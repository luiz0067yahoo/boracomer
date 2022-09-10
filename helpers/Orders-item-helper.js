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
    
    
}