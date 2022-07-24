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
        async login(){
            let resultLogin;
            try{
                resultLogin=await UsersHelper.login(this.userName,this.userPassword);
                if(!until.isEmpty(resultLogin)){
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
            this.$router.push({ name: 'panel-store',path: this.storePath+'panel', });  
        },
    }

}
