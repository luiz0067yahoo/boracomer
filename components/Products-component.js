import {until} from '../untils/until.js'
import {ProductsHelper} from '../helpers/Products-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'

export const ProductsComponent={
    template: '#products-template',    
       data() {
            return {
                store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
                storePath: '',
                emptyPhoto: './assets/img/emptyPhoto.svg',
                products:[],
                inputSearch:'',
            }
        },
        async created(){
            if(!until.isEmpty(this.$route.params.aliasStore)){
                this.storePath='/empresa/'+this.$route.params.aliasStore;
                this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            }
            if(!until.isEmpty(this.$route.params.products)){
                this.products= JSON.parse(this.$route.params.products);
            }
            else
            {
                this.products=await ProductsHelper.findByStoreAliasGroupLocalStorage(this.$route.params.aliasStore,this.$route.params.groupName);
            }
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
        },
        mounted: function() {
            $('title').html(this.store.nome+' - Produtos '+this.$route.params.groupName);
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
        },
        methods:{
            isEmpty(value){
                return until.isEmpty(value);
            },
            async searchProducts(){
                this.$router.push({ name: 'buscar-produtos-store',path: this.storePath+'buscar-produtos', });                
            },
            goBack(){
                this.$router.go(-1);
            },
        },
    }