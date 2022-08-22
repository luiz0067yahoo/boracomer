import {conect} from '../untils/conect.js'
import { until } from '../untils/until.js';

export const ProductsHelper = {
    url:'produtos',
	async findByStoreAlias(storeAlias){
		let resultProducts;
        try{
            resultProducts= await conect.get(this.url,{"empresa.apelido":storeAlias,ativo:true});
            localStorage.products=JSON.stringify(resultProducts.data)
            return resultProducts.data
        }catch(e){throw Error("Erro ao buscar Produtos");}
    }, 
	async findByStoreAliasGroupID(storeAlias,groupID){
		let resultProducts;
        try{
            resultProducts= await conect.get(this.url,{"empresa.apelido":storeAlias,ativo:true,"grupo.id":groupID});
            localStorage.products=JSON.stringify(resultProducts.data)
            return resultProducts.data
        }catch(e){throw Error("Erro ao buscar Produtos");}
    },     
    async findByStoreAliasLocalStorage(storeAlias){
        try{
            if (until.isEmpty(JSON.parse(localStorage.getItem('products')))){
                await this.findByStoreAlias(storeAlias);
            }
            return JSON.parse(localStorage.getItem('products'));
        }catch(e){throw Error("Erro ao buscar Produtos");}
    }, 
    async findByStoreAliasIdLocalStorage(storeAlias,id){
        var accumulatorproduct=null;
        try{
            if(until.isEmpty(JSON.parse(localStorage.getItem('products')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('products')).forEach(element => {
                if(element.id==id){
                    accumulatorproduct=element;
                    return element;
                }
            });
            return accumulatorproduct;
        }
        catch(e){
            throw Error("Erro ao buscar Produtos");
        }
    }, 
    async findByStoreAliasGroupLocalStorage(storeAlias,groupName){
        var accumulatorproducts=[];
        try{
            if (until.isEmpty(groupName)){
                return await this.findByStoreAliasLocalStorage(storeAlias);
            }
            else if(until.isEmpty(JSON.parse(localStorage.getItem('products')))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('products')).forEach(element => {
                if((element.grupo.nome.indexOf(groupName)>=0)){
                    accumulatorproducts.push(element);
                }
            });
            return accumulatorproducts;
        }
        catch(e){
            throw Error("Erro ao buscar Produtos");
        }
    }, 
	
	async findByStoreAliasGroupDescriptionLocalStorage(storeAlias,groupName,search){
        var accumulatorproducts=[];
        try{
            if (until.isEmpty(groupName)){
                return await  this.findByStoreAliasLocalStorage(storeAlias);
            }
            else if (!until.isEmpty(localStorage.getItem('products'))){
                await this.findByStoreAlias(storeAlias);
            } 
            JSON.parse(localStorage.getItem('products')).forEach(element => {
                if(
                    (element.grupo.nome.indexOf(groupName)>=0)
                    &&
                    (
                        (element.descricao.toUpperCase().indexOf(search.toUpperCase())>=0)
                        ||
                        (!until.until.isEmpty(element.descricao_longa)&&(element.descricao_longa.toUpperCase().indexOf(search.toUpperCase())>=0))
                    )
                ){
                    accumulatorproducts.push(element);
                }
            });
            return accumulatorproducts;
        }
        catch(e){
            throw Error("Erro ao buscar Produtos");
        }
        
    },
    async findByStoreAliasDescriptionLocalStorage(storeAlias,search){
        var accumulatorproducts=[];
        try{
            if (until.isEmpty(JSON.parse(localStorage.getItem('products')))){
                await this.findByStoreAlias(storeAlias);
            }
            JSON.parse(localStorage.getItem('products')).forEach(element => {
                if(
                    (
                        (element.descricao.toUpperCase().indexOf(search.toUpperCase())>=0)
                        ||
                       (!until.until.isEmpty(element.descricao_longa)&&(element.descricao_longa.toUpperCase().indexOf(search.toUpperCase())>=0))
                    )
                ){                    
                    accumulatorproducts.push(element);
                }
            });
            return accumulatorproducts;
        }catch(e){
            //console.log(e);
            throw Error("Erro ao buscar Produtos");
        }
    }, 
}