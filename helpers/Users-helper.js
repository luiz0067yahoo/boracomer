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
        try{
            resultUser = await conect.post(this.url,{"username":username,"email":email,"password":password});
            return resultUser.data;
        }catch(e){
            throw Error("Erro ao salvar Usuário");
        }
    }, 
    async login(username,password){
        return await conect.login(username,password);
    },
    logout(){
        return conect.logout();
    },
    async findUsers(username,email){
        return await conect.get(this.url,{"username":username,"email":email});
    },
}