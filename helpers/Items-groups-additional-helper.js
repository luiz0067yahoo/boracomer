import {conect} from '../untils/conect.js'
import { until } from '../untils/until.js';

export const ItemsGroupsAdditionalHelpers = {
    url:'item-grupo-adicionals',
	async findByStoreAlias(storeAlias){
		let resultitemsGroupsAdditional;
        try{
            resultitemsGroupsAdditional= await conect.get(this.url,{"empresa.apelido":storeAlias,ativo:true});
            localStorage.itemsGroupsAdditional=JSON.stringify(resultitemsGroupsAdditional.data)
            return resultitemsGroupsAdditional.data
        }catch(e){throw Error("Erro ao buscar Item adicional");}
    }, 
    
    async findByStoreAliasLocalStorage(storeAlias){
        try{
            if (until.isEmpty(JSON.parse(localStorage.getItem('itemsAdicionals')))){
                await this.findByStoreAlias(storeAlias);
            }
            return JSON.parse(localStorage.getItem('itemsGroupsAdditional'));
        }catch(e){throw Error("Erro ao buscar Item adicional");}
    }, 
    async findByStoreAliasIdLocalStorage(storeAlias,id){
        var accumulatorproduct=null;
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('itemsGroupsAdditional')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('itemsGroupsAdditional')).forEach(element => {
                if(element.id==id){
                    accumulatorproduct=element;
                    return element;
                }
            });
            return accumulatorproduct;
        }
        catch(e){
            throw Error("Erro ao buscar Item adicional");
        }
    }, 
   
    async findByStoreAliastypeWithWithout_C_LocalStorage(storeAlias){
        var accumulatoritemsGroupsAdditional=[];
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('itemsGroupsAdditional')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('itemsGroupsAdditional')).forEach(element => {
                if((element.tipo_com_sem="C")){
                    accumulatoritemsGroupsAdditional.push(element);
                }
            });
            return accumulatoritemsGroupsAdditional;
        }
        catch(e){
            throw Error("Erro ao buscar Item adicional");
        }
    }, 
	
	
    async findByStoreAliasIdsLocalStorage(storeAlias,ids){
        var accumulatorItemGroupsAdditional=[];
        ids.split(",").forEach(id => {
            this.findByStoreAliasIdLocalStorage(storeAlias,id).then((element)=>{
                accumulatorItemGroupsAdditional.push(element);    
            });
        });
        return accumulatorItemGroupsAdditional;
    } 
}