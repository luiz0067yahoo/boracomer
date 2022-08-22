import {until} from '../untils/until.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { OrdersHelper } from '../helpers/Orders-helper.js'
export const OrderItemsComponent={
    template: '#order-items-template',
       data() {
            return {
                store:{nome:'Bora Comer'},
                storePath: '',
                storeLogo: './assets/img/logo.svg',
                order:[],
                address:{},
                phone:"",
                errorPhone:null,
                name:"",
                errorName:"",
                note:"",
                typeDelivery:"",
                cashback:null,
                total:0,
            }
        },
        async created(){
            if(!until.isEmpty(this.$route.params.aliasStore)){
                this.storePath='/empresa/'+this.$route.params.aliasStore;
                this.store=await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            }
            this.order=JSON.parse(localStorage.order);
        },
        mounted: function() {
            $('title').html(this.store.nome+' Pedido ');
            $(":input").inputmask();
        },
        methods:{
            formatMoney(val){
                return until.formatMoney(val);
            },
            isEmpty(val){
                return until.isEmpty(val);
            },
            toggleTypeDelivery(){
                if(this.typeDelivery=='ENTREGA'){
                    this.typeDelivery=null;
                }
                else{
                    this.typeDelivery='ENTREGA';
                }
            },
            setPhone(){
                var phone=$("#phone").val()
                
                this.errorPhone=null;
                if(!until.phoneIsValid(phone)){
                    this.errorPhone='não é um telefone válido exemplo de telefone: "(999) 99999-9999"';
                }
                else{
                    this.phone=phone;
                }
                console.log(this.errorPhone);
            },
            editItem(item){
                try{
                    if(item.itemsGroupAdditional.length>0){
                        if(item.product.pizza===true){
                            if(!until.isEmpty(item.border)){
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/borda/'+item.border.id+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")});
                            }
                            else{
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")});
                            }    
                        }
                        else{
                            this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/adicionais/'+this.getIdsItemsGroupAdditional(item.itemsGroupAdditional).join(",")});
                        }
                    }
                    else{
                        if(item.product.pizza===true){
                            if(!until.isEmpty(item.border)){
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")+'/borda/'+item.border.id});
                            }
                            else{
                                this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id+'/tamanho/'+item.size.id+'/sabores/'+this.getIdsFlavorsPizza(item.flavors).join(",")});
                            }    
                        }
                        else{
                            this.$router.push({ path: this.storePath+'/item-pedido/'+item.product.id});
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
            goBack(){
                this.$router.go(-1);
            },

            calcPriceItem(item){
                var price=0;
                if(item.product.pizza===true){
                    price= this.calcPriceProduct(item.product,item.size,item.flavors,item.border)*item.amount;
                }
                else{
                    price=item.product.preco*item.amount;;
                }
                return price;
            },
            calcitemsGroupAdditional(itemsGroupAdditionalSelected){
                var price=0;
                itemsGroupAdditionalSelected.forEach(element => {
                    price=price+element.valor;
                });
                return price;
            },
            calcPriceProduct(product,size,flavors,border,itemsGroupAdditionalSelected){
                var price=0;
                if(product.pizza===true){
                    price=this.calcPriceSizePizza(size)+this.sumPriceFlavorsPizza(flavors)+this.calcPriceBorderPizza(border)+this.calcitemsGroupAdditional(itemsGroupAdditionalSelected);
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
                    price=this.border.valor_borda;
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
            cancelOrder(){
                this.total=0;
                this.order=[];
                localStorage.order=null;
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
            async confirmOrder(){
                var order=[];
                var userId=null;
                var itens=[];
                if (!until.isEmpty(localStorage.user)){
                    userId=localStorage.user.id;
                }
                if (!until.isEmpty(this.order)){
                    this.order.forEach(element => {
                        if(product.pizza===true){
                        }
                        else{
                        }
                    });     
                    OrdersHelper.sendOrder(
                        this.$route.params.aliasStore,
                        this.address,
                        userId,
                        this.name,
                        this.phone,
                        this.note,
                        this.typeDelivery,
                        this.cashback,
                        this.order.total,
                        itens
                    );
                }
                console.log(order);
            },
        }
    
    }
    /*
    {
        "id": 888,
        "uuid": "83f0152c-83e3-4f87-8d29-2bb149f18b5f",
        "empresa": {
            "id": 1
        },
        "municipio": {
            "id": 1
        },
        "bairro": "JD GISELA",
        "endereco": "R WALDEMAR ROSSONI",
        "numero": "298",
        "complemento": null,
        "nome": "ALEXANDRO",
        "telefone": "45999225548",
        "usuario": {
            "id": 1
        },
        "observacao": "ENTREGAR AS 19H",
        "tipo_entrega": "ENTREGAR",
        "troco": null,
        "valor_total": 100,
        "itempedidos": [
            {
                "id": 3
            }
        ]
    }

 {
    "uuid": "5e004d4a-8f24-4d9d-9d74-26491ac4becb",
    "empresa": 1,
    "bordatamanho": 1,
    "produto": 3,
    "observacao": null,
    "preco": 100,
    "quantidade": 1,
    "tamanho": 2,
    "valor_total_item": 100,
    "pedido": 888
}
sabor
adicionais
tipo de borda    
    */