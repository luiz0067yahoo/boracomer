import {until} from '../untils/until.js'
import {StoresHelper} from '../helpers/Stores-helper.js'
import {UsersHelper} from '../helpers/Users-helper.js'
export const UpdateUserPasswordComponent={
    template: '#update-user-password-template',
    data() {
        return {
            store:{nome:'Bora Comer'},
            storePath: '',
            store_logo: './assets/img/logo.svg',
            store_text1: 'Bora satisfazer',
            store_text2: 'seu apetite!',
            name:'',
            username:'',
            email:'',
            phone:'',
            currentPassword:'',
            password:'',
            repeatPassword:'',

            errorUsername:'',
            errorEmail:'',
            errorPhone:'',
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
            $('title').html(this.store.nome+' - Trocar Senha');
        }
    },
    mounted: function() {
        $(":input").inputmask();
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
        },
        validEmail(){
            var email=this.email;
            this.errorEmail='';
            if(!until.emailIsValid(email)){
                this.errorEmail='não é um e-mail válido exemplo de email: "abc@abc.com"';
            }
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
        },
        
        validPassword(){
            this.checkLowerCaseOneOrMore=until.lowerCaseOneOrMore(this.password);
            this.checkUpperCaseOneOrMore=until.upperCaseOneOrMore(this.password);
            this.checkNumberOneOrMore=until.numberOneOrMore(this.password);
            this.checkSizeDigits=this.password.length>=this.sizeDigits;
            this.checkRepeatPassword=!until.isEmpty(this.password)&&(this.password==this.repeatPassword);
        },
        async changePassword(){
            let resultLogin;
            try{
                resultLogin=await UsersHelper.changePassword(this.username,this.currentPassword,this.password);
                localStorage.createUser=JSON.stringify(resultLogin);
                if(!until.isEmpty(resultLogin)){
                    this.$router.push({ name: 'create-address-store',path:this.storePath+'/create-address'});
                }
            }
            catch(e){
                this.$router.push({ name: 'update-user-password-error',path: this.storePath+'update-user-password-error', params: { menssageError: e.message} });
            }
        },
    }

}
