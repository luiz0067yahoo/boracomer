import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {OrdersHelper} from '../helpers/Orders-helper.js'
import {OrdersItemHelper} from '../helpers/Orders-item-helper.js'
import { BordersPizzaHelper } from '../helpers/Borders-pizza-helper.js'
import { OrdersItemFlavorsHelper } from '../helpers/Orders-item-flavors-helper.js'
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
            userId=6;//###########
            this.order = await OrdersHelper.findByStoreAliasOrderId(this.store.apelido,this.store.id,userId,this.id);
            var orderId=this.order.id;
            if(!until.isEmpty(this.order)){
                this.orderItems = await OrdersItemHelper.findByStoreAliasOrderId(this.store.apelido,this.store.id,userId,orderId)
            }
            if(!until.isEmpty(this.orderItems)){
                
                var orderItemsFlavors=[];
                for(var index=0;index<this.orderItems.length;index++){
                    var element=this.orderItems[index];
                    if(element.produto.pizza){
                        let orderitemId=element.id;
                        let flavors = await OrdersItemFlavorsHelper.findByStoreAliasOrderItemId(this.store.apelido,this.store.id,orderId,orderitemId);
                        orderItemsFlavors.push(flavors)
                    }
                    else{
                        orderItemsFlavors.push(null)
                    }
                }
                this.orderItemsFlavors=orderItemsFlavors;
            }
        }

        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - detalhes do pedido '+this.id);
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
        }
    }
}
