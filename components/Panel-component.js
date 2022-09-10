import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {GroupsOfProductsHelper} from '../helpers/Groups-of-products-helper.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import { UsersHelper } from '../helpers/Users-helper.js'
export const PanelComponent={
    template: '#panel-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            groupsOfProducts: [],
            inputSearch:'',
        }
    },
    async created(){
        localStorage.createUser=null;
        localStorage.createAddress=null;
        localStorage.addressList=null;
        localStorage.store=null;
        localStorage.stores=null;
        localStorage.groups=null;
        localStorage.groupsAdicionals=null;
        localStorage.products=null;
        localStorage.itemsGroupsAdditional=null;
        localStorage.flavorsPizza=null;
        localStorage.sizesPizza=null;
        localStorage.bordersPizza=null;
        localStorage.bordersPizzaSize=null;
            
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            this.groupsOfProducts= await GroupsOfProductsHelper.findByStoreAliasLocalStorage(this.$route.params.aliasStore);
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Págia Inicial');
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
        toggleMenu(){
            $('#menu-user').toggleClass('d-none');
        },
        goOrder(){
            this.$router.push({ name: 'items-pedido-store',path:this.storePath+'/items-pedido'});
        },
        async findGroup(){
            //this.groupsOfProducts= await GroupsOfProductsHelper.findByStoreAliasNameGroupLocalStorage(this.$route.params.aliasStore,this.inputSearch)
            var products=await ProductsHelper.findByStoreAliasDescriptionLocalStorage(this.$route.params.aliasStore,this.inputSearch);
            this.$router.push({ name: 'produtos-store',path: this.storePath+'produtos',params: {products: JSON.stringify(products)} }); 
        },
        logout(){
            localStorage.token=null;
            localStorage.user=null;
            localStorage.createUser=null;
            localStorage.createAddress=null;
            localStorage.addressList=null;
            localStorage.store=null;
            localStorage.stores=null;
            localStorage.groups=null;
            localStorage.groupsAdicionals=null;
            localStorage.products=null;
            localStorage.itemsGroupsAdditional=null;
            localStorage.flavorsPizza=null;
            localStorage.sizesPizza=null;
            localStorage.bordersPizza=null;
            localStorage.bordersPizzaSize=null;
            localStorage.order=null;
            localStorage.name="";
            localStorage.phone="";
            localStorage.note="";
            localStorage.typeDelivery="RETIRAR_BALCAO";
            localStorage.cashback=0;
            localStorage.addressDelivery=null;
            UsersHelper.logout();
            this.$router.push({ name: 'logout-store',path: this.storePath+'logout',params: {}}); 
        },
        getUserName(){
            var user = JSON.parse(localStorage.user);
            var result="";
            if(!until.isEmpty(user)){
                result=user.username;
            }
            return result;
        },
        isLoged(){
            var user = JSON.parse(localStorage.user);
            return (!until.isEmpty(user));
        }
    }
}