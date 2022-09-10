import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { UsersHelper } from '../helpers/Users-helper.js'
import { AddressHelper } from '../helpers/Address-helper.js'
export const SelectListAdrressComponent={
    template: '#select-list-address-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            menssageError: '',
            currentUser:{},
            AddressListcurrentUser:{},
        }
    },
    async created(){
        localStorage.typeDelivery="RETIRAR_BALCAO";
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store=StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            if(!until.isEmpty(JSON.parse(localStorage.getItem('user')))){
                this.currentUser=JSON.parse(localStorage.getItem('user'));
                this.AddressListcurrentUser= await AddressHelper.findByStoreAliasUserID(this.currentUser.id);
            }
        }
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
        isEmpty(val){
            return until.isEmpty(val);
        },
        async updateProfile(){
           
        },
        goBack(){
            localStorage.addressDelivery=null;
            localStorage.typeDelivery=localStorage.typeDelivery="RETIRAR_BALCAO";;
            this.$router.go(-1);
        },
        defineAddressDelivery(address){
            localStorage.addressDelivery=JSON.stringify(address);
            localStorage.typeDelivery='ENTREGAR';
            this.$router.go(-1);
        },
    }
    
}
