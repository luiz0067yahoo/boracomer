import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import { AddressHelper } from '../helpers/Address-helper.js';
import { CitiesHelpers } from '../helpers/Cities-helper.js';
export const UpdateAddressComponent={
    template: '#update-address-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            uuid:"",
            id:null,
            zipCode:"",
            errorZipCode:"",
            state:"",
            errorState:"",
            cities:null,
            city:null,
            errorCity:"",
            district:"",
            errorDistrict:"",
            street:"",
            errorStreet:"",
            houseNumber:"",
            addressComplement:"",
            currentUser:{},
            currentAddress:{},
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
            this.cities= await CitiesHelpers.findByStoreAlias(this.$route.params.aliasStore);
            this.id=this.$route.params.id;
            if(!until.isEmpty(JSON.parse(localStorage.getItem('user')))){
                this.currentUser=JSON.parse(localStorage.getItem('user'));
                this.currentAddress= await AddressHelper.findByStoreAliasIDUserID(this.currentUser.id,this.$route.params.id);

                this.uuid=this.currentAddress.uuid;
                this.zipCode=this.currentAddress.cep;
                var city=null
                var idCity=this.currentAddress.municipio.id;
                this.cities.forEach(element => {
                    if(
                        (element.id==idCity)
                    )
                    {
                        city=element
                    }
                });
                this.city=city;
                this.district=this.currentAddress.bairro;
                this.street=this.currentAddress.logradouro;
                this.houseNumber=this.currentAddress.numero;
                this.addressComplement=this.currentAddress.complemento;
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
            if(!until.zipCodeBrasilianIsValid(zipCode)){
                this.errorZipCode='não é um cep válido exemplo de cep: "99999-999"';
            }
            else{
                this.zipCode=zipCode;
                let data = await AddressHelper.loadZipCode(zipCode);
                if (!until.isEmpty(data) && !until.isEmpty(data.localidade)){
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
        async updateAddress(){
            var user={"id":this.currentUser.id};
            if(!until.isEmpty(this.city)){
                try{
                    var houseNumber=null;
                    var address=null
                    if(until.isInt(this.houseNumber)){
                        houseNumber=parseInt(this.houseNumber,10);
                    }
                    address=AddressHelper.update(this.id,this.uuid,this.zipCode,this.city.id,this.district,this.street,houseNumber,this.addressComplement,user.id);
                    localStorage.address=JSON.stringify(address);
                    if(!until.isEmpty(address)){
                        this.$router.push({ name: 'update-address-success-store',path: this.storePath+'/update-address-success'});
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
