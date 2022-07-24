import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { AddressHelper } from '../helpers/Address-helper.js';
import { CitiesHelpers } from '../helpers/Cities-helper.js';
export const CreateAddressComponent={
    template: '#create-address-template',
    data() {
        return {
            store:{nome:'Bora Comer'},
            storePath: '',
            store_logo: './assets/img/logo.svg',
            store_text1: 'Bora satisfazer',
            store_text2: 'seu apetite!',

            zipCode:"",
            errorZipCode:"",
            state:"",
            errorState:"",
            cities:"",
            city:null,
            errorCity:"",
            district:"",
            errorDistrict:"",
            street:"",
            errorStreet:"",
            houseNumber:"",
            addressComplement:"",
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
            this.cities= await CitiesHelpers.findByStoreAlias(this.$route.params.aliasStore);
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Págia Inicial');
        $(":input").inputmask();
    },
    methods:{
        isEmpty(value){
            return until.isEmpty(value);
        },
        async setZipCode(){
            var zipCode=$("#zipCode").val()
            this.errorZipCode='';
            if(!until.zipCodeBrasilianIsValid(zipCode)){
                this.errorZipCode='não é um cep válido exemplo de cep: "99999-999"';
            }
            else{
                this.zipCode=zipCode;
                let data = await AddressHelper.loadZipCode(zipCode);
                //this.state=data.uf;
                this.district=data.bairro;
                var city=null
                this.cities.forEach(element => {
                    if(
                        (element.nome==data.localidade.toUpperCase())
                        &&
                        (element.uf==data.uf)
                    )
                    {
                        city=element
                    }
                });
                this.city=city;
                this.street=data.logradouro;
            }
        },
        async createAddress(){
            var user=JSON.parse(localStorage.createUser);
            var user={"id":6};
            
            if(!until.isEmpty(this.city)){
                try{
                    var houseNumber=null;
                    var address=null
                    if(until.isInt(this.houseNumber)){
                        houseNumber=parseInt(this.houseNumber,10);
                    }
                    address=AddressHelper.create(this.zipCode,this.city.id,this.district,this.street,houseNumber,this.addressComplement,user.id);
                    localStorage.address=JSON.stringify(address);
                    if(!until.isEmpty(address)){
                        this.$router.push({ name: 'create-user-success-store',path: this.storePath+'/create-user-success'});
                    }
                }
                catch(e){
                    //console.log(e);
                    //this.$router.push({ name: 'login-error-store',path: this.storePath+'login-error', params: { menssageError: e.message} });
                }
            }
        },
    }

}
