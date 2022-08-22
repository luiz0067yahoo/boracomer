export const until = {
	uuid() {

		// Retorna um número randômico entre 0 e 15.
		function randomDigit() {
		
			// Se o browser tiver suporte às bibliotecas de criptografia, utilize-as;
			if (crypto && crypto.getRandomValues) {
			
				// Cria um array contendo 1 byte:
				var rands = new Uint8Array(1);
				
				// Popula o array com valores randômicos
				crypto.getRandomValues(rands);
				
				// Retorna o módulo 16 do único valor presente (%16) em formato hexadecimal
				return (rands[0] % 16).toString(16);
			} else {
			// Caso não, utilize random(), que pode ocasionar em colisões (mesmos valores
			// gerados mais frequentemente):
				return ((Math.random() * 16) | 0).toString(16);
			}
		}
		
		// A função pode utilizar a biblioteca de criptografia padrão, ou
		// msCrypto se utilizando um browser da Microsoft anterior à integração.
		var crypto = window.crypto || window.msCrypto;
		
		// para cada caracter [x] na string abaixo um valor hexadecimal é gerado via
		// replace:
		return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
	},
	isInt(val){
		try{
			parseInt(val, 10)
			return true;
		}
		catch(e){
			return false;
		}
	},
	isEmpty(val){
		return (val == '' || val === undefined || val == null || val.length <= 0) ? true : false;
	},
	arrayAllElementsIsEmpy(array){
		var count=0
		array.forEach((element,index) => {
			if(this.isEmpty(element)){
				count=count+1;
			}
		});
		return (count===array.length);
	},
	formatMoney(val){
		return "R$ "+parseFloat(val).toFixed(2).replace('.',',');
	},
	usernameIsValid(userName) {
		/*start whith letter accept only letter and number */
		var re = /[^\s]\w\w[^\s]+/||/[^\s]\w\d[^\s]+/g;
		return re.test(userName);
	},
	lowerCaseOneOrMore(text){
		var re = /[a-z]+/;
        return re.test(text);
	},
	upperCaseOneOrMore(text){
		var re = /[A-Z]+/;
        return re.test(text);
	},
	numberOneOrMore(text){
		var re = /[0-9]+/;
        return re.test(text);
	},
	emailIsValid(email){
		var re = /\S+@\S+\.\S+/;
        return re.test(email);
	},
	phoneIsValid(phone){
		var re = /\([0-9]{2,3}\)\s[0-9]{4,5}-?[0-9]{4}/g;
        return re.test(phone);
	},
	zipCodeBrasilianIsValid(phone){
		var re = /[0-9]{5}-?[0-9]{3}/g;
        return re.test(phone);
	},

	passwordIsValid(password){
		/*one or more number, one or more letter lower case and uppercase with 8 digits or more*/
		var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
        return re.test(password);
	},
	
}