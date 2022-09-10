import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { AddressHelper } from '../helpers/Address-helper.js';
import { CitiesHelpers } from '../helpers/Cities-helper.js';
export const AddNewAddressComponent={
    template: '#add-mew-address-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',

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
            errorHouseNumber:"",
            addressComplement:"",

            menssageError:"",
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
            this.cities= await CitiesHelpers.findByStoreAlias(this.$route.params.aliasStore);
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }
    },
    mounted: function() {
        $('title').html(this.store.nome+' - Págia Inicial');
        $(":input").inputmask();
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
        async setZipCode(){
            var zipCode=$("#zipCode").val()
            this.errorZipCode='';
            if (!until.isEmpty(zipCode)){
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
            }
        },
        validCity(){
            if(this.city==null){
                this.errorCity="Por Favor selecione a cidade";
                return false;
            }
            this.errorCity="";
            return true;
        },
        validDistrict(){
            if(until.isEmpty(this.district)){
                this.errorDistrict="Por Favor preencha o seu bairro";
                return false;
            }
            this.errorDistrict="";
            return true;
        },
        validStreet(){
            if(until.isEmpty(this.street)){
                this.errorStreet="Por Favor preencha o sua rua";
                return false;
            }
            this.errorStreet="";
            return true;
        },
        validHouseNumber(){
            if(until.isEmpty(this.houseNumber)){
                this.errorHouseNumber="Por Favor preencha o seu número";
                return false;
            }
            this.errorHouseNumber="";
            return true;
        },
        async createAddress(){
            var acc_user=JSON.parse(localStorage.createUser);
            var user={"id":acc_user.id};
            if(!until.isEmpty(this.city)){
                try{
                    if(
                        this.validCity()
                        && this.validDistrict() 
                        && this.validStreet() 
                        && this.validHouseNumber() 
                    ){
                        var houseNumber=null;
                        var address=null
                        if(until.isInt(this.houseNumber)){
                            houseNumber=parseInt(this.houseNumber,10);
                        }
                        address=AddressHelper.create(this.zipCode,this.city.id,this.district,this.street,houseNumber,this.addressComplement,user.id);
                        localStorage.address=JSON.stringify(address);
                        if(!until.isEmpty(address)){
                            this.$router.push({ name: 'update-address-success-store',path: this.storePath+'/update-address-success'});
                        }
                    }
                    else{
                        this.menssageError="Error ao validar campos";
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