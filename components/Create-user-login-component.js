import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {UsersHelper} from '../helpers/Users-helper.js'
export const CreateUserLoginComponent={
    template: '#create-user-login-template',
    data() {
        return {
            store:{nome:'',logo_url:'./assets/img/emptyPhoto.svg'},
            storePath: '',
            emptyPhoto: './assets/img/emptyPhoto.svg',
            store_text1: 'Bora satisfazer',
            store_text2: 'seu apetite!',
            username:'',
            email:'',
            password:'',
            repeatPassword:'',

            errorUsername:'',
            errorEmail:'',
            focusPassword:false,
            messageHintPassword:'Sua senha deve: ',
            checkLowerCaseOneOrMore:false,
            messageCheckLowerCaseOneOrMore:'Conter letras minúsculas',
            checkUpperCaseOneOrMore:false,
            messageCheckUpperCaseOneOrMore:'Conter letras MAIÚSCULAS',
            checkNumberOneOrMore:false,
            messageCheckNumberOneOrMore:'Conter números',
            checkSizeDigits:false,
            messageCheckSizeDigits:'Conter mais de 6 digitos',
            checkRepeatPassword:false,
            messageCheckRepeatPassword:'igual a repetir senha',
            sizeDigits:6,
            menssageError:'',
        }
    },
    async created(){
        if(!until.isEmpty(this.$route.params.aliasStore)){
            this.storePath='/empresa/'+this.$route.params.aliasStore;
            this.store= await StoresHelper.findByAliasLocalStorage(this.$route.params.aliasStore);
            $('title').html(this.store.nome+' - Págia Inicial');
        }
        if(!until.isEmpty(this.store.logo_url)){
            $("#tabIcon").href=this.store.logo_url;
        }
        else{
            $("#tabIcon").href=this.emptyPhoto;
        }

    },
    mounted: function() {
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
        enableFocusPassword(val){
            this.focusPassword=true;
        },
        disableFocusPassword(val){
            this.focusPassword=false;
        },
        isEmpty(val){
            return until.isEmpty(val);
        },
        validUsername(){
            var username=this.username;
            this.errorUsername='';
            if(username.length<4){
                this.errorUsername='tem menos que 4 caracteres';
            }
            else if(username.length>50){
                this.errorUsername='tem mais que 50 caracteres';
            }
            else if(!until.usernameIsValid(username)){
                this.errorUsername='deve começa com letras e pode conter números sem simbolos e espaços';
            }
            return this.errorUsername=='';
        },
        validEmail(){
            var email=this.email;
            this.errorEmail='';
            if(!until.emailIsValid(email)){
                this.errorEmail='não é um e-mail válido exemplo de email: "abc@abc.com"';
            }
            return this.errorEmail=='';
        },        
        setPhone(){
            var phone=$("#phone").val()
            this.errorphone='';
            if(!until.phoneIsValid(phone)){
                this.errorPhone='não é um telefone válido exemplo de telefone: "(999)99999-9999"';
            }
            else{
                this.phone=phone;
            }
            return this.errorphone=='';
        },
        validPassword(){
            this.checkLowerCaseOneOrMore=until.lowerCaseOneOrMore(this.password);
            this.checkUpperCaseOneOrMore=until.upperCaseOneOrMore(this.password);
            this.checkNumberOneOrMore=until.numberOneOrMore(this.password);
            this.checkSizeDigits=this.password.length>=this.sizeDigits;
            this.checkRepeatPassword=!until.isEmpty(this.password)&&(this.password==this.repeatPassword);
            return (
                this.checkLowerCaseOneOrMore 
                && this.checkUpperCaseOneOrMore
                && this.checkNumberOneOrMore
                && this.checkSizeDigits
                && this.checkRepeatPassword
            );
        },
        async createUser(){
            let resultUser;
            try{
                if(
                    this.validUsername()
                    && this.validEmail() 
                    && this.validPassword()
                ){
                    resultUser=await UsersHelper.createNewUser(this.username,this.email,this.password);
                    localStorage.createUser=JSON.stringify(resultUser);
                    if(!until.isEmpty(resultUser)){
                        var resultLogin=await UsersHelper.login(this.username,this.password);
                        if(!until.isEmpty(resultLogin)){
                            this.$router.push({ name: 'items-pedido-store',path:this.storePath+'/items-pedido'});      
                        }
                    }
                    //this.menssageError=e.message;
                }
                else{
                    this.menssageError="Error ao validar campos";
                }
            }
            catch(e){
                this.menssageError=e.message;
            }
        },
    }

}
