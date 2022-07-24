import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {GroupsOfProductsHelper} from '../helpers/Groups-of-products-helper.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import { UsersHelper } from '../helpers/Users-helper.js'
export const PanelComponent={
    template: '#panel-template',
    data() {
        return {
            store:{nome:'Bora Comer'},
            groupsOfProducts: [],
            storePath: '',
            storeVerticalLogo: './assets/img/logo_vertical.svg',
            inputSearch:'',
        }
    },
    async created(){
        /*
        localStorage.token=null;
        localStorage.stores=null;
        localStorage.user=null;
        localStorage.store=null;
        localStorage.flavorsPizza=null;
        localStorage.sizesPizza=null;
        localStorage.bordersPizza=null;
        localStorage.order=null;        
        */
        localStorage.groups=null;
        localStorage.products=null;
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            this.groupsOfProducts= await GroupsOfProductsHelper.findByStoreAliasLocalStorage(this.$route.params.aliasStore);
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Págia Inicial');
        
    },
    methods:{
        toggleMenu(){
            $('#menu-user').toggleClass('d-none');
        },
        goOrder(){
            this.$router.push({ name: 'itens-pedido-store',path:this.storePath+'/itens-pedido'});
        },
        async findGroup(){
            //this.groupsOfProducts= await GroupsOfProductsHelper.findByStoreAliasNameGroupLocalStorage(this.$route.params.aliasStore,this.inputSearch)
            var products=await ProductsHelper.findByStoreAliasDescriptionLocalStorage(this.$route.params.aliasStore,this.inputSearch);
            this.$router.push({ name: 'produtos-store',path: this.storePath+'produtos',params: {products: JSON.stringify(products)} }); 
        },
        logout(){
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
