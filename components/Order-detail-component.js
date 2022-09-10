import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {OrdersHelper} from '../helpers/Orders-helper.js'
export const OrderDetailComponent={
    template: '#order-detail-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            id:0,
            order:null,
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
        }
        if(!until.isEmpty(this.$route.params.id)){
            this.id= this.$route.params.id;
            var userId=this.getUserID();
            userId=6;//###########
            this.order = await OrdersHelper.OrdeById(this.$route.params.aliasStore,userId,this.id);
        }

        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - detalhes do pedido '+this.id);
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
        getUserID(){
            var user = JSON.parse(localStorage.user);
            var result=null;
            if(!until.isEmpty(user)){
                result=user.id;
            }
            return result;
        },
        getDateOrderFormat(){
            var result="";
            if(!until.isEmpty(this.order) && !until.isEmpty(this.order.created_at)){
                moment.locale('pt-br');
                result=moment(this.order.created_at).format('HH:mm:ss');
            }
            return result
        },
        getHourOrderFormat(){
            var result="";
            if(!until.isEmpty(this.order) && !until.isEmpty(this.order.created_at)){
                moment.locale('pt-br');
                result=moment(this.order.created_at).format('HH:mm:ss');
            }
            return result
        }
    }
}
