import {until} from '../untils/until.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { FlavorsPizzaHelper } from '../helpers/Flavors-pizza-helper.js'
import { SizesPizzaHelper } from '../helpers/Sizes-pizza-helper.js'
import { BordersPizzaHelper } from '../helpers/Borders-pizza-helper.js'
import { BordersPizzaSizeHelper } from '../helpers/Borders-pizza-size-helper.js'
import { GroupsAdditionalHelpers } from '../helpers/Groups-additional-helper.js'
import { ItemsGroupsAdditionalHelpers } from '../helpers/Items-groups-additional-helper.js'
export const OrderItemComponent={
    template: '#order-item-template',    
        data() {
            return {
                store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
                storePath: '',
                emptyPhoto: './assets/img/emptyPhoto.svg',
                product:{descricao:"",descricao_longa:"",preco:0},
                group:{nome:""},
                products:[],
                flavorsPizza:[],
                flavorsPizzaSelected:[],
                flavorsPizzaParam:[],
                sizesPizza:[],
                sizePizzaSelected:null,
                sizePizzaParam:null,
                bordersPizza:[],
                borderPizzaSelected:null,
                borderPizzaParam:null,
                bordersSizePizza:[],
                borderSizePizzaSelected:null,
                borderSizePizzaParam:null,
                groupsAdditional:[],
                itemsGroupsAdditional:[],
                itemsGroupAdditionalSelected:[],
                itemsGroupAdditionalParam:[],
                amount:1,
                amountParam:1,
                noteParam:"",
                note:"",
                total:0,
                messageError:"",
            }
        },
        async created(){
            if(!until.isEmpty(this.$route.params.aliasStore)){
                this.storePath='/empresa/'+this.$route.params.aliasStore;
                this.store=await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            }
            
            this.product=await ProductsHelper.findByStoreAliasIdLocalStorage(this.$route.params.aliasStore,this.$route.params.id);
            this.group=this.product.grupo;
            this.sizesPizza=await SizesPizzaHelper.findByStoreAlias(this.$route.params.aliasStore);
            this.bordersPizza=await BordersPizzaHelper.findByStoreAlias(this.$route.params.aliasStore);
            this.bordersSizePizza=await BordersPizzaSizeHelper.findByStoreAlias(this.$route.params.aliasStore);
            this.groupsAdditional=await GroupsAdditionalHelpers.findByStoreAlias(this.$route.params.aliasStore);
            this.itemsGroupsAdditional=await ItemsGroupsAdditionalHelpers.findByStoreAlias(this.$route.params.aliasStore);
            this.itemsGroupAdditionalSelected=await ItemsGroupsAdditionalHelpers.findByStoreAliastypeWithWithout_C_LocalStorage(this.$route.params.aliasStore);

            if(!until.isEmpty(this.$route.params.idsFlavors)){
                this.flavorsPizzaSelected=await FlavorsPizzaHelper.findByStoreAliasIdsLocalStorage(this.$route.params.aliasStore,this.$route.params.idsFlavors);
                this.flavorsPizzaParam=await FlavorsPizzaHelper.findByStoreAliasIdsLocalStorage(this.$route.params.aliasStore,this.$route.params.idsFlavors);
            }
            if(!until.isEmpty(this.$route.params.idsItemsGroupsAdditional)){
                this.itemsGroupAdditionalSelected=await ItemsGroupsAdditionalHelpers.findByStoreAliasIdsLocalStorage(this.$route.params.aliasStore,this.$route.params.idsItemsGroupsAdditional);
                this.itemsGroupAdditionalParam=await ItemsGroupsAdditionalHelpers.findByStoreAliasIdsLocalStorage(this.$route.params.aliasStore,this.$route.params.idsItemsGroupsAdditional);
            }
            this.flavorsPizza=await FlavorsPizzaHelper.findByStoreAliasLocalStorage(this.$route.params.aliasStore);
            if(!until.isEmpty(this.$route.params.idSize)){
                this.sizePizzaSelected=await SizesPizzaHelper.findByStoreAliasIdLocalStorage(this.$route.params.aliasStore,this.$route.params.idSize);
                this.sizePizzaParam=await SizesPizzaHelper.findByStoreAliasIdLocalStorage(this.$route.params.aliasStore,this.$route.params.idSize);
                this.changeSize();
            }
            
            if(!until.isEmpty(this.$route.params.IdBorderSize)){
                var borderSizePizza=await BordersPizzaSizeHelper.findByStoreAliasIdLocalStorage(this.$route.params.aliasStore,this.$route.params.IdBorderSize);
                this.borderSizePizzaSelected=borderSizePizza;
                this.borderSizePizzaParam=borderSizePizza;
                this.bordersPizza.forEach((element, index) => {
                    if(borderSizePizza.borda.id==element.id){
                        this.borderPizzaParam=element;
                        this.borderPizzaSelected=element;
                    }
                });
                this.changeBorder();
            }
            if(!until.isEmpty(this.$route.params.note)){
                this.noteParam=this.$route.params.note;
                this.note=this.$route.params.note;
            }
            if(!until.isEmpty(this.$route.params.amount)){
                this.amountParam=this.$route.params.amount;
                this.amount=this.$route.params.amount;
            }
            else{
                this.loadAmount();
            }
            
            this.totalPriceProduct();
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
            $('title').html(this.store.nome+' - item pedido');
        },
        mounted: function() {
            this.changeAdditional();
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
            minusAmountitem(){
                if(this.amount>1)
                    this.amount--;
                this.totalPriceProduct();
            },
            async changeBorder(){
                if(!until.isEmpty(this.sizePizzaSelected) && !until.isEmpty(this.borderPizzaSelected)){
                    this.borderSizePizzaSelected=await BordersPizzaSizeHelper.findByStoreAliasIdBorderIdSizeLocalStorage(this.$route.params.aliasStore,this.borderPizzaSelected.id,this.sizePizzaSelected.id);
                }
                this.totalPriceProduct();
            },
            async changeAdditional(){
                var ids=[];
                jQuery(".itemGroupAdditionalID").each(function( index ) {
                    var id=$( this ).text();
                    if(jQuery(".itemGroupAdditionalCheckBox").eq(index).is(':checked')){
                        ids.push(id);
                    }
                });
                if(ids.length>0){
                    this.itemsGroupAdditionalSelected = await ItemsGroupsAdditionalHelpers.findByStoreAliasIdsLocalStorage(this.$route.params.aliasStore,ids.join(","));
                }
            },
            async changeSize(){
                try{
                    if(!until.isEmpty(this.sizePizzaSelected) && !until.isEmpty(this.borderPizzaSelected)){
                        this.borderSizePizzaSelected=await BordersPizzaSizeHelper.findByStoreAliasIdSizeLocalStorage(this.$route.params.aliasStore,this.sizePizzaSelected.id);
                    }
                    if(!until.isEmpty(this.sizePizzaSelected) && !until.isEmpty(this.borderPizzaSelected)){
                        this.borderSizePizzaSelected=await BordersPizzaSizeHelper.findByStoreAliasIdBorderIdSizeLocalStorage(this.$route.params.aliasStore,this.borderPizzaSelected.id,this.sizePizzaSelected.id);
                    }
                    if (this.flavorsPizzaSelected.length<this.sizePizzaSelected.maximo_sabores){
                        var addFlabors=(this.sizePizzaSelected.maximo_sabores-this.flavorsPizzaSelected.length);
                        for(var countNewsFlabors=0;countNewsFlabors<addFlabors;countNewsFlabors++){
                            this.flavorsPizzaSelected.push(null); 
                        }
                    }
                    else{
                        var removeFlabors=(this.flavorsPizzaSelected.length-this.sizePizzaSelected.maximo_sabores);
                        for(var countNewsFlabors=0;countNewsFlabors<removeFlabors;countNewsFlabors++){
                            this.flavorsPizzaSelected.pop(); 
                        }
                    }
                    this.totalPriceProduct();
                }
                catch(e){
                }
            },
            countFlavorsPizzaSelected(){
                var count=0;
                this.flavorsPizzaSelected.forEach((element, index) => {
                    if(this.flavorsPizza.indexOf(element)>=0){
                        count=count+1;
                    }
                });
                return count;
            },
            getDistinctFlavorsPizzaSelected(){
                var DistinctFlavors=[]
                this.flavorsPizzaSelected.forEach((element, index) => {
                    if(this.flavorsPizzaSelected.indexOf(element)==index)
                    {
                        DistinctFlavors.push(element);
                    }
                });
                return DistinctFlavors;
            },
            getLegendFlavorsSlice(index){
                var legend=[
                    "./assets/img/pizza/pizza1.png",
                    "./assets/img/pizza/pizza2.png",
                    "./assets/img/pizza/pizza3.png",
                    "./assets/img/pizza/pizza4.png",
                ];
                var DistinctFlavors=this.getDistinctFlavorsPizzaSelected();
                var legendFlavors=[]
                for(var count=0;count<Math.min(DistinctFlavors.length,4);count++){
                    legendFlavors.push(legend[count]);//lengend index equals DistinctFlavors index
                }
                var currentFlavor=this.flavorsPizzaSelected[index];
                var position=DistinctFlavors.indexOf(currentFlavor);
                return legendFlavors[position];
            },
            changeFlavor(index){
                try{
                    this.changeSize();
                    var acumulator=[...this.flavorsPizzaSelected];
                    acumulator.shift();
                    if(until.arrayAllElementsIsEmpy( acumulator )){
                        this.flavorsPizzaSelected.forEach((element,index) => {
                            if(index!=0){
                                this.flavorsPizzaSelected[index]=this.flavorsPizzaSelected[0];
                            }
                        });
                    }
                    this.totalPriceProduct();
                }
                catch(e){
                }
            },            
            addAmountitem(){
                this.amount++;
                this.totalPriceProduct();
            },            
            goBack(){
                this.$router.go(-1);
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
            async totalPriceProduct(){
                this.total=this.amount*this.calcPriceProduct();
                return this.total;
            },           
            calcPriceProduct(){
                var price=0;
                if(this.product.pizza===true){
                    price=this.calcPriceSizePizza()+this.sumPriceFlavorsPizza()+this.calcPriceBorderPizza()+this.calcitemsGroupAdditional();
                }
                else{
                    price=this.product.preco;
                }
                return price;
            },
            sumPriceFlavorsPizza(){
                var sum=0;
                this.flavorsPizzaSelected.forEach(element => {
                    if((!until.isEmpty(element))&&(typeof  element.valor == 'number')){
                        sum=sum+element.valor;
                    }
                });
                return sum;
            },
            calcPriceSizePizza(){
                var price=0;
                if(!until.isEmpty(this.sizePizzaSelected)){
                    price=this.sizePizzaSelected.valor_tamanho;
                }
                return price;
            },
            getValueBoderbySize(idBorder){
                var value=0;
                var accumulatorBorderPizzaSize=null;
                if(
                    !until.isEmpty(this.sizePizzaSelected)
                ){
                    var idSize=this.sizePizzaSelected.id;
                    this.bordersSizePizza.forEach(element => {
                        if(
                            element.tamanho.id==idSize
                            &&
                            element.borda.id==idBorder
                        ){
                            accumulatorBorderPizzaSize=element;
                        }
                    });
                    if(!until.isEmpty(accumulatorBorderPizzaSize)){
                        value=accumulatorBorderPizzaSize.valor_borda;
                    }
                }
                return value;       
            },
            calcPriceBorderPizza(){
                var price=0;
                if(
                    !until.isEmpty(this.borderSizePizzaSelected)
                    &&
                    !until.isEmpty(this.borderPizzaSelected)
                    &&
                    !until.isEmpty(this.sizePizzaSelected)
                ){
                    price=this.borderSizePizzaSelected.valor_borda
                }
                return price;
            },
            calcitemsGroupAdditional(){
                var price=0;
                if(this.product.pizza){
                    this.itemsGroupAdditionalSelected.forEach(element => {
                        price=price+element.valor;
                    });
                }
                return price;
            },
            itemPizzaEquals(productA,sizeA,flavorsA,borderA,itemsGroupAdditionalA,noteA,productB,sizeB,flavorsB,borderB,itemsGroupAdditionalB,noteB){
                var result=(
                    (
                        this.getIdsFlavorsPizza(flavorsA).join(",")
                        ==
                        this.getIdsFlavorsPizza(flavorsB).join(",")
                    )
                    &&
                    (
                        this.getIdsItemsGroupAdditional(itemsGroupAdditionalA).join(",")
                        ==
                        this.getIdsItemsGroupAdditional(itemsGroupAdditionalB).join(",")
                    )
                    &&(productA.id==productB.id)
                    &&
                    (
                        (
                            (!until.isEmpty(borderA))
                            &&(!until.isEmpty(borderB))
                            &&(borderA.id==borderB.id)
                        )
                        ||
                        (
                            (until.isEmpty(borderA))
                            &&(until.isEmpty(borderA))
                        )
                    )
                    &&
                    (
                        (
                            (!until.isEmpty(sizeA))
                            &&(!until.isEmpty(sizeB))
                            &&(sizeA.id==sizeB.id)
                        )
                    )
                    &&
                    (
                        (
                            (!until.isEmpty(noteA))
                            &&(!until.isEmpty(noteB))
                            &&(noteA==noteB)
                        )
                    )
                );
                return result;
            },
            itemIndexOf(order,product,size,flavors,border,itemsGroupAdditional,note){
                var position=-1;
                order.forEach((element,index) => {
                    if
                    (
                        (
                            (element.product.pizza===true)
                            &&
                            this.itemPizzaEquals(
                                element.product,
                                element.size,
                                element.flavors,
                                element.border,
                                element.itemsGroupAdditional,
                                element.note,
                                product,
                                size,
                                flavors,
                                border,
                                itemsGroupAdditional,
                                note,
                            )
                        )
                        ||
                        (
                            (element.product.pizza==false)
                            &&
                            (element.product.id==product.id)
                        )
                    )
                    {
                        position= index;
                    }

                });
                return position;
            },
            validPizzaSize(product,size){
                if((product.pizza===true)&&(until.isEmpty(size))){
                     throw new Error("Selecione o tamanho da pizza");
                }
                return true;
            },
            validPizzaFlavors(product,flavors){
                if((product.pizza===true)&&(until.arrayAllElementsIsEmpy(flavors))){
                     throw new Error("Selecione o sabor da pizza");
                }
                return true;
            },
            validPizza(product,size,flavors){
                var result=
                (
                    (product.pizza===true)
                    &&
                    (
                        (this.validPizzaSize(product,size))
                        &&
                        (this.validPizzaFlavors(product,flavors))
                    )
                );
                return result;
            },
            loadOrder(){
                var order=[]
                if(!until.isEmpty(JSON.parse(localStorage.order))){
                    order=JSON.parse(localStorage.order);
                }
                return order;
            },
            saveOrder(order){
                localStorage.order=JSON.stringify(order);
            },
            addItem(){
                try{
                    var order=this.loadOrder();
                    var amount=this.amount;
                    var product=this.product;
                    var flavors=this.flavorsPizzaSelected; 
                    var border=this.borderSizePizzaSelected;
                    var size=this.sizePizzaSelected;
                    var itemsGroupAdditional=this.itemsGroupAdditionalSelected;
                    var flavorsParam=this.flavorsPizzaParam; 
                    var borderParam=this.borderSizePizzaParam;
                    var sizeParam=this.sizePizzaParam;
                    var itemsGroupAdditionalParam=this.itemsGroupAdditionalParam;
                    var note=this.note;
                    var total=this.calcPriceProduct();                   
                    if((product.pizza===false)||this.validPizza(product,size,flavors)){
                        var index=this.itemIndexOf(order,product,sizeParam,flavorsParam,borderParam,itemsGroupAdditionalParam,note);
                        if(index!=-1){
                            order[index].amount=amount;
                            order[index].total=total;
                            if(product.pizza===true){
                                order[index].flavors=flavors;
                                order[index].size=size;
                                order[index].border=border;
                                order[index].itemsGroupAdditional=itemsGroupAdditional;
                                order[index].note=note;
                            }
                        }
                        else{
                            if(product.pizza==true){
                                order.push({"amount":amount,"product":product,"size":size,"flavors":flavors,"border":border,"itemsGroupAdditional":itemsGroupAdditional,"total":total,"note":note});
                            }
                            else{
                                order.push({"amount":amount,"product":product,"total":total,"note":note});
                            }
                        }
                        this.saveOrder(order);
                        this.$router.push({ name: 'items-pedido-store',path:this.storePath+'/items-pedido'});
                    }
                }
                catch(e){
                    this.messageError=e.message;
                }
            },
            removeItem(){
                var order=this.loadOrder();
                var index=this.itemIndexOfByParams();
                if(index!=-1){
                    order.splice(index, 1);
                }
                this.saveOrder(order);
                this.$router.push({ name: 'items-pedido-store',path:this.storePath+'/items-pedido'});
            },
            hasItem(){
                return (this.itemIndexOfByParams()!=-1);
            },
            itemIndexOfByParams(){
                var index= -1;
                try{
                    var order=this.loadOrder();
                    var product=this.product;
                    var flavors=this.flavorsPizzaSelected; 
                    var size=this.sizePizzaSelected;
                    var flavorsParam=this.flavorsPizzaParam; 
                    var borderParam=this.borderSizePizzaParam;
                    var sizeParam=this.sizePizzaParam;
                    var itemsGroupAdditionalParam=this.itemsGroupAdditionalParam;
                    if((product.pizza===false)||this.validPizza(product,size,flavors)){
                        index=this.itemIndexOf(order,product,sizeParam,flavorsParam,borderParam,itemsGroupAdditionalParam);
                    }
                    this.messageError="";
                }
                catch(e){
                    this.messageError=e.message;
                }
                return index;
            },
            loadAmount(){
                var order=this.loadOrder();
                var index=this.itemIndexOf(order,this.product,this.sizePizzaSelected,this.flavorsPizzaSelected,this.borderSizePizzaSelected,this.itemsGroupAdditionalSelected);
                if(index!=-1){
                    this.amount=order[index].amount;
                }
                this.saveOrder(order);
            },
        }
    
    }
    