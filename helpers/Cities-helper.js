import {conect} from '../untils/conect.js'
export const CitiesHelpers = {
    url:'municipios',
    async findByStoreAlias(storeAlias){
        let resultCities;
        try{
            resultCities = await conect.get(this.url,{"empresa.apelido":storeAlias,ativo:true});
            return resultCities.data;
        }catch(e){throw Error("Erro ao buscar Cidades");}
    }, 
    async findAll(){
        let resultCities;
        try{
            resultCities = await conect.get(this.url,{});
            return resultCities.data;
        }catch(e){throw Error("Erro ao buscar Cidades");}
    },  
}