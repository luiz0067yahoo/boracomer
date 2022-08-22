import {conect} from '../untils/conect.js'
import { until } from '../untils/until.js';
export const BordersPizzaSizeHelper = {
    url:'bordatamanhos',
    async findByStoreAlias(storeAlias){
		let resultBordersPizzaSize;
        try{
            resultBordersPizzaSize= await conect.get(this.url,{"empresa.apelido":storeAlias,ativo:true});
            localStorage.bordersPizzaSize=JSON.stringify(resultBordersPizzaSize.data);
            return resultBordersPizzaSize.data
        }catch(e){throw Error("Erro ao buscar borda da PizzaSize");}
    },
    async findByStoreAliasLocalStorage(storeAlias){
		if (!until.isEmpty(JSON.parse(localStorage.getItem('bordersPizzaSize')))){
            return JSON.parse(localStorage.getItem('bordersPizzaSize'));
        }
        return this.findByStoreAlias(storeAlias);
    }, 
    async findByStoreAliasIdLocalStorage(storeAlias,id){
        var accumulatorBorderPizzaSize=null;
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('bordersPizzaSize')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('bordersPizzaSize')).forEach(element => {
                if(element.id==id){
                    accumulatorBorderPizzaSize=element;
                    return element;
                }
            });
            return accumulatorBorderPizzaSize;
        }
        catch(e){
            throw Error("Erro ao buscar borda da PizzaSize");
        }
    },
    async findByStoreAliasIdSizeLocalStorage(storeAlias,idSize){
        var accumulatorBorderPizzaSize=null;
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('bordersPizzaSize')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('bordersPizzaSize')).forEach(element => {
                if(element.tamanho.id==idSize){
                    accumulatorBorderPizzaSize=element;
                    return element;
                }
            });
            return accumulatorBorderPizzaSize;
        }
        catch(e){
            throw Error("Erro ao buscar borda da PizzaSize");
        }
    },
    async findByStoreAliasIdBorderIdSizeLocalStorage(storeAlias,idBorder,idSize){
        var accumulatorBorderPizzaSize=null;
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('bordersPizzaSize')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('bordersPizzaSize')).forEach(element => {
                if(
                    element.tamanho.id==idSize
                    &&
                    element.borda.id==idBorder
                ){
                    accumulatorBorderPizzaSize=element;
                    return element;
                }
            });
            return accumulatorBorderPizzaSize;
        }
        catch(e){
            throw Error("Erro ao buscar borda da PizzaSize");
        }
    },
}