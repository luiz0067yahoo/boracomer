import {until} from '../untils/until.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { OrdersHelper } from '../helpers/Orders-helper.js'
import { OrdersItemHelper } from '../helpers/Orders-item-helper.js'
import { OrdersItemFlavorsHelper } from '../helpers/Orders-item-flavors-helper.js'
export const OrderItemsComponent={
    template: '#order-items-template',
       data() {
            return {
                store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
                emptyPhoto: './assets/img/logo.svg',
                storePath: '',
                order:[],
                address:null,
                phone:"",
                errorPhone:null,
                name:"",
                errorName:"",
                note:"",
                typeDelivery:"RETIRAR_BALCAO",
                cashback:0,
                total:0,
                menssageError:"",
            }
        },
        async created(){
            if(!until.isEmpty(this.$route.params.aliasStore)){
                this.storePath='/empresa/'+this.$route.params.aliasStore;
                this.store=await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            }
            this.order=JSON.parse(localStorage.order);
            this.address=JSON.parse(localStorage.addressDelivery);
            if(localStorage.name==null){
                localStorage.name='';
            }
            this.name= localStorage.name;
            this.phone=localStorage.phone;
            if(localStorage.note==null){
                localStorage.note='';
            }
            this.note=localStorage.note;

            if(localStorage.typeDelivery!="ENTREGAR"){
                localStorage.typeDelivery="RETIRAR_BALCAO";
                this.typeDelivery="RETIRAR_BALCAO"
                $("#typeDelivery").prop('checked', false);
            }
            else{
                localStorage.typeDelivery="ENTREGAR";
                this.typeDelivery="ENTREGAR";
                $("#typeDelivery").prop('checked', true);
            }
            this.typeDelivery=localStorage.typeDelivery;
            this.cashback=localStorage.cashback;
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
        },
        mounted: function() {
            $('title').html(this.store.nome+' Pedido ');
            $(":input").inputmask();
            $("#phone").val(localStorage.phone);
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
        },
        methods:{
            formatMoney(val){
                return until.formatMoney(val);
            },
            isEmpty(val){
                return until.isEmpty(val);
            },
            goBack(){
                this.$router.go(-1);
            },

            setName(){
                localStorage.name=this.name;
            },
            setPhone(){
                var phone=$("#phone").val()
                
                this.errorPhone=null;
                if(!until.phoneIsValid(phone)){
                    this.errorPhone='não é um telefone válido exemplo de telefone: "(999) 99999-9999"';
                }
                else{
                    this.phone=phone;
                    localStorage.phone=this.phone;
                }
            },
            setNote(){
                localStorage.note=this.note;
            },
            setCashback(){
                localStorage.cashback=this.cashback;
                /**/            
            },
            setTypeDelivery(){
                if($("#typeDelivery").prop("checked")){
                    this.typeDelivery="ENTREGAR";
                    localStorage.typeDelivery="ENTREGAR";
                }
                else{
                    this.typeDelivery="RETIRAR_BALCAO";
                    localStorage.typeDelivery="RETIRAR_BALCAO";
                }
            },
            editItem(item){
                try{
                    if(item.itemsGroupAdditional.length>0){
                        if(item.product.pizza===true){
                            if(!until.isEmpty(item.border)){
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/borda/'+item.border.id+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")+'/quantidade/'+item.amount});
                            }
                            else{
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")+'/quantidade/'+item.amount});
                            }    
                        }
                        else{
                            this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")+'/quantidade/'+item.amount});
                        }
                    }
                    else{
                        if(item.product.pizza===true){
                            if(!until.isEmpty(item.border)){
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/borda/'+item.border.id+'/quantidade/'+item.amount});
                            }
                            else{
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/quantidade/'+item.amount});
                            }    
                        }
                        else{
                            this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/quantidade/'+item.amount});
                        }
                    }
                }
                catch(e){
                    console.log(e);
                }
            },
            addItem(){
                this.$router.push({ path: this.storePath+'/buscar-produtos/'});
            },
          

            calcPriceItem(item){
                var price=0;
                if(item.product.pizza===true){
                    price= this.calcPriceProduct(item.product,item.size,item.flavors,item.border,item.itemsGroupAdditional)*item.amount;
                }
                else{
                    price=item.product.preco*item.amount;;
                }
                return price;
            },
            calcitemsGroupAdditional(itemsGroupAdditional){
                var price=0;
                console.itemsGroupAdditional
                itemsGroupAdditional.forEach(element => {
                    price=price+element.valor;
                });
                return price;
            },
            calcPriceProduct(product,size,flavors,border,itemsGroupAdditional){
                var price=0;
                if(product.pizza===true){
                    price=this.calcPriceSizePizza(size)+this.sumPriceFlavorsPizza(flavors)+this.calcPriceBorderPizza(border)+this.calcitemsGroupAdditional(itemsGroupAdditional);
                }
                else{
                    price=product.preco;
                }
                return price;
            },
            sumPriceFlavorsPizza(flavors){
                var sum=0;
                flavors.forEach(element => {
                    if(!until.isEmpty(element)&& (typeof  element.valor == 'number')){
                        sum=sum+element.valor;
                    }
                });
                return sum;
            },
            calcPriceSizePizza(size){
                var price=0;
                if(!until.isEmpty(size)){
                    price=size.valor_tamanho;
                }
                return price;
            },
            calcPriceBorderPizza(border){
                var price=0;
                if(!until.isEmpty(border)){
                    price=border.valor_borda;
                }
                return price;
            },

            calcTotal(){
                var total=0;
                if (!until.isEmpty(this.order)){
                    this.order.forEach(element => {
                        //total=total+(element.amount*calcPriceProduct(element.product,element.size,element.flavors,element.border));
                        total=total+(element.amount*element.total);
                    });
                    this.total=total;
                }
                return total;
            },
            clearOrder(){
                this.total=0;
                this.order=[];
                localStorage.order=null;
                localStorage.name="";
                localStorage.phone="";
                localStorage.note="";
                localStorage.typeDelivery="";
                localStorage.addressDelivery=null;
                localStorage.cashback=0;
            },
            cancelOrder(){
                this.clearOrder();
                this.$router.push({ name: 'panel-store',path: this.storePath+'panel', }); 
            },
            getIdsFlavorsPizza(flavorsPizza){
                var ids=[];
                flavorsPizza.forEach(element => {
                    if(!until.isEmpty(element)){
                        ids.push(element.id);
                    }
                });
                return ids;
            },
            getIdsItemsGroupAdditional(itemsGroupAdditional){
                var ids=[];
                itemsGroupAdditional.forEach(element => {
                    if(!until.isEmpty(element)){
                        ids.push(element.id);
                    }
                });
                return ids;
            },
            getDesriptionFlavorsPizza(flavorsPizza){
                try{
                    var descriptions=[];
                    flavorsPizza.forEach(element => {
                        if(!until.isEmpty(element)&& (typeof  element.descricao === 'string')){
                            descriptions.push(element.descricao);
                        }
                    });
                }
                catch(e){
                    //console.log(e);
                }
                return descriptions;
            },
            async login(){
                this.$router.push({ name: 'check-login-store',path: this.storePath+'check-login', });          
            },
            getUserName(){
                var user = JSON.parse(localStorage.user);
                var result="";
                if(!until.isEmpty(user)){
                    result=user.username;
                }
                return result;
            },
            getUserID(){
                var user = JSON.parse(localStorage.user);
                var result=null;
                if(!until.isEmpty(user)){
                    result=user.id;
                }
                return result;
            },
            isLoged(){
                var user = JSON.parse(localStorage.user);
                return (!until.isEmpty(user));
            },

            async createOrder(){
                let resultOrder=null;
                try{
                    if (!until.isEmpty(this.order)){
                        resultOrder=await OrdersHelper.sendOrder(
                            this.store.apelido,
                            this.store.id,
                            until.uuid(),
                            this.getUserID(),
                            this.name,
                            this.phone,
                            this.address,
                            this.note,
                            this.typeDelivery,
                            this.cashback,
                            this.calcTotal()
                        );
                    }
                }catch(e){
                    this.menssageError=e.message;
                    console.log(e);
                }
                return resultOrder;
            },
            async createItemOrder(item,orderId){
                let resultItem=null;
                try{
                    if (!until.isEmpty(this.order)){
                        var border_id=null;
                        if(!until.isEmpty(item.border) && !until.isEmpty(item.border.id)){
                            border_id=item.border.id;
                        }
                        resultItem= await OrdersItemHelper.sendItemOrder(
                            this.store.apelido,
                            this.store.id,
                            until.uuid(),
                            orderId,
                            item.product.id,
                            border_id,
                            item.size.id,
                            item.note,
                            item.total,
                            item.amount,
                            item.total*item.amount
                        );
                        var itemId=resultItem.id;
                        if(item.product.pizza==true){
                            this.createItemFlavorOrder(this.store.id,item.flavors,itemId)
                        }
                    }
                }catch(e){
                    this.menssageError=e.message;
                    console.log(e);
                }
                return resultItem;
            },
            async createItemFlavorOrder(storeId,flavors,itemId){
                let resultFlavorItem=null;
                try{
                    if (!until.isEmpty(flavors)){
                        resultFlavorItem =await OrdersItemFlavorsHelper.sendItemsFlavorsOrder(
                            storeId,
                            flavors,
                            itemId,
                        )
                    }
                }catch(e){
                    this.menssageError=e.message;
                    console.log(e);
                }
                return resultFlavorItem;
            },
            async confirmOrder(){
                let resultOrder= await this.createOrder();
                let createItemOrder=this.createItemOrder;
                if (!until.isEmpty(resultOrder) && !until.isEmpty(resultOrder.id)){
                    var orderId=resultOrder.id;
                    this.order.forEach((item, index) => {
                        createItemOrder(item,orderId);
                    });
                    this.clearOrder();
                    this.$router.push({ name: 'create-order-success-store',path:this.storePath+'/create-order-success/'+resultOrder.id, params: { id: resultOrder.id}},);
                }
            },
            
        }
    
    }