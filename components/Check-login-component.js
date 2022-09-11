import {until} from '../untils/until.js'
import {UsersHelper} from '../helpers/Users-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const CheckLoginComponent={
    template: '#check-login-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            userName: '',
            userPassword: '',
            menssageError: '',
        }

    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(' - Login');
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Login');
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
        async login(){
            let resultLogin;
            try{
                resultLogin=await UsersHelper.login(this.userName,this.userPassword);
                if(!until.isEmpty(resultLogin)){
                    this.goBack();          
                }
                else{
                    this.menssageError="Usuário ou senha inválida.";
                }
            }
            catch(e){
                this.menssageError=e.message;
            }
        }
    }
}
