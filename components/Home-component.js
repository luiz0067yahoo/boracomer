import {until} from '../untils/until.js'
import {UsersHelper} from '../helpers/Users-helper.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const HomeComponent={
    template: '#home-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            userName: '',
            userPassword: '',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
            if(!until.isEmpty(this.store.logo_url)){
                $("#tabIcon").href=this.store.logo_url;
            }
            else{
                $("#tabIcon").href=this.emptyPhoto;
            }
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
        async login(){
            let resultLogin;
            try{
                resultLogin=await UsersHelper.login(this.userName,this.userPassword);
                if(!until.isEmpty(resultLogin)){
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
                    localStorage.typeDelivery=null;
                    localStorage.cashback=0;
                    localStorage.addressDelivery=null;
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
            localStorage.name='';
            localStorage.phone='';
            localStorage.note='';
            localStorage.typeDelivery='RETIRAR_BALCAO';
            localStorage.cashback=0;
    
            this.$router.push({ name: 'panel-store',path: this.storePath+'panel', });  
        },
    }

}
