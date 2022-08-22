import {until} from '../untils/until.js'
import {UsersHelper} from '../helpers/Users-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const HomeComponent={
    template: '#home-template',
    data() {
        return {
            store:{nome:'Bora Comer'},
            storePath: '',
            storeLogo: './assets/img/logo.svg',
            storeText1: 'Bora satisfazer',
            storeText2: 'seu apetite!',
            userName: '',
            userPassword: '',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Págia Inicial');
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        async login(){
            let resultLogin;
            try{
                resultLogin=await UsersHelper.login(this.userName,this.userPassword);
                if(!until.isEmpty(resultLogin)){
                    localStorage.token=null;
                    localStorage.user=null;
                    localStorage.createUser=null;
                    localStorage.createAddress=null;
                    localStorage.addressDelivery=null;
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

                    this.$router.push({ name: 'panel-store',path: this.storePath+'panel', });          
                }
                else{
                    this.$router.push({ name: 'login-error-store',path: this.storePath+'login-error', params: { menssageError: e.message} });    
                }
            }
            catch(e){
                this.$router.push({ name: 'login-error-store',path: this.storePath+'login-error', params: { menssageError: e.message} });
            }
        },
        anonymous(){
            localStorage.token=null;
            localStorage.user=null;
            localStorage.createUser=null;
            localStorage.createAddress=null;
            localStorage.addressDelivery=null;
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
            this.$router.push({ name: 'panel-store',path: this.storePath+'panel', });  
        },
    }

}
