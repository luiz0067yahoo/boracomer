import {conect} from '../untils/conect.js'
import { until } from '../untils/until.js';
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
export const AddressHelper = {
    url:'enderecos',
	
	async findByStoreAliasUserID(UserID){
		let resultAddress;
        try{
            resultAddress= await conect.get(this.url,{"usuario.id":UserID});
            localStorage.address=JSON.stringify(resultAddress.data)
            return resultAddress.data
        }catch(e){throw Error("Erro ao buscar Endereço");}
    }, 
	async loadZipCode(zipCode){
		let resultAddress;
        try{
            var url="https://viacep.com.br/ws/"+zipCode+"/json/";
            resultAddress= await axios.get(url);
            return resultAddress.data
        }catch(e){throw Error("Erro ao buscar Endereço");}
    }, 
    async create(zipCode,cityID,district,street,houseNumber,addressComplement,UserID){
		let resultAddress=null;
        try{
            resultAddress= await conect.post(
                this.url,
                {
                    "uuid":until.uuid(),
                    "cep":zipCode,
                    "municipio":{"id":cityID},
                    "bairro":district,
                    "logradouro":street,
                    "numero":houseNumber.toString(),
                    "complemento":addressComplement,
                    "usuario":{"id":UserID}
                }
            );
            return resultAddress.data
        }catch(e){
            console.log(e);
            throw Error("Erro ao salvar Endereço");
        }
    },    
    async update(UserID){
		let resultAddress;
        try{
            resultAddress= await conect.put(this.url,{"usuario.id":UserID,});
            localStorage.address=JSON.stringify(resultAddress.data)
            return resultAddress.data
        }catch(e){throw Error("Erro ao atualizar Endereço");}
    },    
    
}