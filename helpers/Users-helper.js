import {conect} from '../untils/conect.js'
import {until} from '../untils/until.js'

export const UsersHelper= {
    url:'users',
    async findAll(){
        let resultUser;
        try{
            resultUser = await conect.get(this.url,{});
            return resultUser.data;
        }catch(e){throw Error("Erro ao buscar Usuários");}
    },  
    async createNewUser(username,email,password){
        let resultUser;
        try{
            let loginTest= await this.loginTest(username,password);
            throw Error("usuário já exite");
        }catch(erro){
            try{
                resultUser = await conect.post(this.url,{"username":username,"email":email,"password":password});
                return resultUser.data;
            }catch(e){
                throw Error("Erro ao salvar usuário! "+erro.message);
            }
        }
    }, 
    async changePassword(id,username,currentPassword,password){
        let resultUser;
        try{
            resultUser = await conect.put(this.url+"/"+id,{"username":username,"password":password,"currentPassword":currentPassword,});
            return resultUser.data;
        }catch(e){
            throw Error("Não foi possivel trocar a senha");
        }
    }, 
    async login(username,password){
        return await conect.login(username,password);
    },
    async loginTest(username,password){
        return await conect.loginTest(username,password);
    },
    logout(){
        return conect.logout();
    },
    async findUsers(username,email){
        return await conect.get(this.url,{"username":username,"email":email});
    },
}