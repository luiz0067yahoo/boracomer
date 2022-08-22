//const serverUrl="http://209.145.62.221:1337/";
const serverUrl="https://edp.whatsmatic.com/api/";
const limityAppTime=10*60*1000;
export const conect = {
	urlAutRequest:serverUrl+"auth/local",
	bodyRequest:{
		"identifier": "food_api@nobresistemas.com",
		"password": "jT4h4MtUqkNjLkG"
	},
	currentUser:null,
	startAppTime:(new Date())-limityAppTime,
	jwt:"",
	async startApp() {
		try {
			const response = await axios.post(this.urlAutRequest,this.bodyRequest,{headers:{"content-type":"application/json",}});
			//this.currentUser=response.data.user;
			//localStorage.user=JSON.stringify(response.data.user);
			this.jwt=response.data.jwt;
			localStorage.token=response.data.jwt;
			this.startAppTime=new Date();
			return response.data;
		} catch (error) {throw Error("Não foi Possível carregar o sistema!");}	
	},
	logout(){
		this.currentUser=null;
		this.jwt=null;
		localStorage.token=null;
		localStorage.user=null;
		this.startAppTime=null;
	},
	async login(userName,password) {
		try {
			var bodyRequest={
				"identifier": userName,
				"password": password
			}
			const response = await axios.post(this.urlAutRequest,bodyRequest,{headers:{"content-type":"application/json",}});
			this.currentUser=response.data.user;
			//this.jwt=response.data.jwt;
			//localStorage.token=this.jwt;
			localStorage.user=JSON.stringify(response.data.user);
			//this.startAppTime=new Date();
			return response.data;
		} catch (error) {throw Error("Usuário ou senha inválido");}	
	},
	async loginTest(userName,password) {
		try {
			var bodyRequest={
				"identifier": userName,
				"password": password
			}
			const response = await axios.post(this.urlAutRequest,bodyRequest,{headers:{"content-type":"application/json",}});
			return response.data;
		} catch (error) {throw Error("Usuário ou senha inválido");}	
	},
	async  get(url,data) {
		var result=null
		if ((!((this.jwt!=null)&&(this.jwt.length>0)))||(((new Date())-this.startAppTime)>limityAppTime)){
			try{
				await this.startApp();
			}
			catch(e){
				throw Error(e.message);
			}
		}
		await axios.get(
			serverUrl+url+"?"+(new URLSearchParams(data)).toString(),
			{
				headers:
				{
					Authorization: ("Bearer "+this.jwt),
					"content-type":"application/json",
				}
			}
		).then(response => {
			result= response;
		}).catch(function (error) {
			if (error.response) {
				// Request made and server responded
				throw Error(
					"data: "+JSON.stringify(error.response.data)+"\n"+
					"status: "+error.response.data+"\n"+
					"headers: "+error.response.headers
				);
			} else if (error.request) {
				// The request was made but no response was received
				throw Error(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				throw Error(error.message);
			}
		});	
		return result;
	},
	async  post(url,data) {
		let result=null;
		if ((!((this.jwt!=null)&&(this.jwt.length>0)))||(((new Date())-this.startAppTime)>limityAppTime)){
			try{
				await this.startApp();
			}
			catch(e){
				throw Error(e.message);
			}
		}
		await axios.post(
			serverUrl+url,
			data,
			{
				headers:
				{
					Authorization: ("Bearer "+this.jwt),
					"content-type":"application/json",
				},
				data:data,
			},
			
		).then(response => {
			result= response
		}).catch(function (error) {
			if (error.response) {
				// Request made and server responded
				throw Error(
					"data: "+JSON.stringify(error.response.data)+"\n"+
					"status: "+error.response.data+"\n"+
					"headers: "+error.response.headers
				);
			} else if (error.request) {
				// The request was made but no response was received
				throw Error(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				throw Error(error.message);
			}
		
		});	
		return result;		
	},
	async  put(url,data) {
		if ((!((this.jwt!=null)&&(this.jwt.length>0)))||(((new Date())-this.startAppTime)>limityAppTime)){
			try{
				await this.startApp();
			}
			catch(e){
				throw Error(e.message);
			}
		}
		axios.put(
			serverUrl+url,data,
			{data:data,
				headers:
				{
					Authorization: ("Bearer "+this.jwt),
					"content-type":"application/json",
				}
			}
		).then(response => {
			return response
		}).catch(function (error) {
			if (error.response) {
				// Request made and server responded
				throw Error(
					"data: "+JSON.stringify(error.response.data)+"\n"+
					"status: "+error.response.data+"\n"+
					"headers: "+error.response.headers
				);
			} else if (error.request) {
				// The request was made but no response was received
				throw Error(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				throw Error(error.message);
			}
		});	
	},
}