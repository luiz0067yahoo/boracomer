import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
export const UpdateUserPasswordErrorComponent={
    template: '#update-user-password-error-template',
    //props:['menssageError'],
    data() {
        return {
            empresaNome:'Bora Comer',
            storePath: '',
            storeLogo: './assets/img/logo.svg',
            menssageError: '',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
        }
    },
    mounted: function() {
        $('title').html(this.empresaNome+' - Error ao trocar senha');
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
    }
}
