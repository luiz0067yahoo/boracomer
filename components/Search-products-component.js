import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {GroupsOfProductsHelper} from '../helpers/Groups-of-products-helper.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
export const SearchProductsComponent={
    template: '#search-products-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            products:[],
            groupsOfProducts:[],
            selectGroupOfProduct:null,
            inputSearch:'',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store=StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
        }
        this.groupsOfProducts= await GroupsOfProductsHelper.findByStoreAlias(this.$route.params.aliasStore);
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html('Buscar empresa - Págia Inicial');
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    methods:{
        async searchProducts(){
            try{
                if(!until.isEmpty(this.selectGroupOfProduct)){
                    this.products=await ProductsHelper.findByStoreAliasGroupDescriptionLocalStorage(this.$route.params.aliasStore,this.selectGroupOfProduct.nome,this.inputSearch);
                    this.$router.push({ name: 'produtos-store-by-group',path: this.storePath+'produtos/'+this.selectGroupOfProduct.nome,params: {groupName:this.selectGroupOfProduct.nome, products: JSON.stringify(this.products)} }); 
                }
                else{
                    this.products=await ProductsHelper.findByStoreAliasGroupDescriptionLocalStorage(this.$route.params.aliasStore,"",this.inputSearch);
                    this.$router.push({ name: 'produtos-store',path: this.storePath+'produtos',params: {products: JSON.stringify(this.products)} }); 
                }
            }catch(e){console.log(e.message);}
        },
        goBack(){
            this.$router.go(-1);
            
        },
        isEmpty(value){
            return until.isEmpty(value);
        },
    }
    
}
