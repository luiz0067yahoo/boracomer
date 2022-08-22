import {StoresHelper} from '../helpers/Stores-helper.js'
import {until} from '../untils/until.js'

export const SearchStoresComponent={
    template: '#search-stores-template',
    data() {
        return {
            stores:[],
            storePath: '',
            storeLogo: './assets/img/logo.svg',
            inputSearch:'',
        }
    },
    async created(){
        let resultStores=await StoresHelper.all();
        this.stores=JSON.parse(localStorage.getItem('stores'));
    },
    mounted: function() {
        $('title').html('Buscar empresa - Págia Inicial');
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        async searchStores(){
            this.stores=await StoresHelper.findByNameStorage(this.inputSearch);
        },
    }

}
