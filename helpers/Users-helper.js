import {conect} from '../untils/conect.js'
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
        let loginTest= await this.loginTest(username,password);
        if(!until.isEmpty(resultLogin)){
            try{
                resultUser = await conect.post(this.url,{"username":username,"email":email,"password":password});
                return resultUser.data;
            }catch(e){
                throw Error("Erro ao salvar Usuário");
            }
        }
        else{
            throw Error("A senha atual não confere");
        }
    }, 
    async changePassword(id,username,currentPassword,password){
        let resultUser;
        try{
            resultUser = await conect.put(this.url+"/"+id,{"username":username,"password":password,"currentPassword":currentPassword,});
            return resultUser.data;
        }catch(e){
            throw Error("Nãofoi possivel trocar a senha");
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