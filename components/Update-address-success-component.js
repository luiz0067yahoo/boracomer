import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const UpdateAddressSuccessComponent={
    template: '#update-address-success-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.empresaNome+' - Págia Inicial');
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
    }

}
