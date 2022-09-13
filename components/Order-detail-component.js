import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {OrdersHelper} from '../helpers/Orders-helper.js'
import {OrdersItemHelper} from '../helpers/Orders-item-helper.js'
import { BordersPizzaHelper } from '../helpers/Borders-pizza-helper.js'
import { OrdersItemFlavorsHelper } from '../helpers/Orders-item-flavors-helper.js'
import { OrdersItemProductAdditionalHelper } from '../helpers/Orders-item-product-additional-helper.js'
export const OrderDetailComponent={
    template: '#order-detail-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            id:0,
            order:null,
            orderItems:[],
            orderItemsFlavors:[],
            orderItemsProductAdditional:[],
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            await BordersPizzaHelper.findByStoreAlias(this.$route.params.aliasStore);//load Borders
        }
        if(!until.isEmpty(this.$route.params.idOrder)){
            this.id= this.$route.params.idOrder;
            var userId=this.getUserID();
            this.order = await OrdersHelper.findByStoreAliasOrderId(this.store.apelido,this.store.id,userId,this.id);
            var orderId=null;
            if(!until.isEmpty(this.order)){
                orderId=this.order.id;
            }   
            if(!until.isEmpty(this.order)){
                this.orderItems = await OrdersItemHelper.findByStoreAliasOrderId(this.store.apelido,this.store.id,userId,orderId)
            }
            if(!until.isEmpty(this.orderItems)){
                var orderItemsFlavors=[];
                var orderItemsProductAdditional=[];
                for(var index=0;index<this.orderItems.length;index++){
                    var element=this.orderItems[index];
                    if(element.produto.pizza){
                        let orderitemId=element.id;
                        let flavors = await OrdersItemFlavorsHelper.findByStoreAliasOrderItemId(this.store.apelido,this.store.id,orderId,orderitemId);
                        orderItemsFlavors.push(flavors)
                        let productAdditional = await OrdersItemProductAdditionalHelper.findByStoreAliasOrderProductAdditionalId(this.store.apelido,this.store.id,orderId,orderitemId);
                        orderItemsProductAdditional.push(productAdditional);
                    }
                    else{
                        orderItemsFlavors.push(null)
                        orderItemsProductAdditional.push(null)
                    }
                }
                this.orderItemsFlavors=orderItemsFlavors;
                this.orderItemsProductAdditional=orderItemsProductAdditional;
            }
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
        $('title').html(this.store.nome+' - detalhes do pedido '+this.$route.params.idOrder);
    },
    mounted: function() {
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        isEmpty(value){
            return until.isEmpty(value);
        },
        arrayAllElementsIsEmpy(val){
            return until.arrayAllElementsIsEmpy(val);
        },
        formatMoney(val){
            return until.formatMoney(val);
        },
        desciptionBorderById(id){
            let border=BordersPizzaHelper.findByStoreAliasIdOnlyLocalStorage(id);
            return border.descricao;
        },
        getUserID(){
            var user = JSON.parse(localStorage.user);
            var result=null;
            if(!until.isEmpty(user)){
                result=user.id;
            }
            return result;
        },
        getDateOrderFormat(){
            var result="";
            if(!until.isEmpty(this.order) && !until.isEmpty(this.order.created_at)){
                moment.locale('pt-br');
                result=moment(this.order.created_at).format('DD/MM/YYYY');
            }
            return result
        },
        getHourOrderFormat(){
            var result="";
            if(!until.isEmpty(this.order) && !until.isEmpty(this.order.created_at)){
                moment.locale('pt-br');
                result=moment(this.order.created_at).format('HH:mm:ss');
            }
            return result
        },
        getPHoneOderFormat(){
            let result="";
            if(!until.isEmpty(this.order)){
                if(!until.isEmpty(this.order.telefone)){
                    result=until.formatPhoneNumber(this.order.telefone) ;
                }
            }
            return result;
        },
        getCashbackOderFormat(){
            if(until.isEmpty(this.order.troco)){
                this.order.troco=0;
            }
            return until.formatMoney(this.order.troco) ;
        },
        getTotalOderFormat(){
            if(until.isEmpty(this.order.valor_total)){
                this.order.valor_total=0;
            }
            return until.formatMoney(this.order.valor_total) ;
        },
        getUserNameOrder(){
            let result="";
            if(!until.isEmpty(this.order)){
                if(!until.isEmpty(this.order.usuario)){
                    result=this.order.usuario.username
                }
            }
            return result;
        },
        getEmailOrder(){
            let result="";
            if(!until.isEmpty(this.order)){
                if(!until.isEmpty(this.order.usuario)){
                    result=this.order.usuario.email
                }
            }
            return result;
        },
        getDesriptionFlavorsPizzaAndPrice(index){
            var result=[];
            if(this.orderItemsFlavors.length>index){
                this.orderItemsFlavors[index].forEach(element => {
                    if(!until.isEmpty(element)){
                        if(element.valor_sabor>0){
                            result.push(element.sabor.descricao+" "+ this.formatMoney(element.valor_sabor));
                        }
                        else{
                            result.push(element.sabor.descricao);
                        }
                    }
                });
            }
            return result;
        },
        getDesriptionProductAdditionalAndPrice(index){
            var result=[];
            if(this.orderItemsProductAdditional.length>index){
                this.orderItemsProductAdditional[index].forEach(element => {
                    if(!until.isEmpty(element)&&!until.isEmpty(element.produto_adicional)){
                        if(element.valor_adicional>0){
                            result.push(element.produto_adicional.descricao+" "+ this.formatMoney(element.valor_adicional));
                        }
                        else{
                            result.push(element.produto_adicional.descricao);
                        }
                    }
                });
            }
            return result;
        }
    }
}
