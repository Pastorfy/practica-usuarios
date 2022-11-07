import { Ref,ref } from "vue";
import Usuario from "~/interfaces/Usuario";
import Info from '~/interfaces/util/Info'

class UsuarioService implements Usuario {
        
    constructor(public id:number=0,public username:string='',public password:string='',public email:string='', public nombreCompleto:string=''){
        this.id=id;
        this.username=username;
        this.password=password;
        this.email=email;
        this.nombreCompleto=nombreCompleto;
    }    
    toJSON(keyStep:string []=[]):string{
        const item :any= {...this}
        const obj:any={};
        
        Object.keys(item).forEach( (key:string)=>{            
            if(!keyStep.includes(key)){                
                obj[key]=item[key];
            }
        });                                
        return  JSON.stringify(obj);
    }

    async create(): Promise<Info> {
        const resp :Info = { data:'', successful:false, message:''};
        let myHeaders = new Headers();        
        myHeaders.append("Content-Type", "application/json");                        
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: this.toJSON(["id"]),
            redirect: 'follow'
        };
        try {
            const d=await fetch(`http://localhost:3001/api/usuarios/`, requestOptions);            
            const data = await d.json();                          
            if(data.Code===0){
                resp.message=data.Message;            
                resp.successful=true;            
            }else{
                resp.message=data.Message;            
                resp.successful=false;
            }
            return Promise.resolve(resp);
        } catch(err){
            console.log(err);
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }        
    }

    async delete(): Promise<Info> {
        const resp :Info = { data:'', successful:false, message:''};
        try {
            
            const token=localStorage.getItem("token");            
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");        
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions: RequestInit = {
                method: 'DELETE',
                headers: myHeaders,                
                redirect: 'follow'
            };

            const d=await fetch(`http://localhost:3001/api/usuarios/${this.id}`, requestOptions);            
            const data = await d.json();                                      
            resp.message=data.Message;              
            resp.successful=true;            
            return Promise.resolve(resp);
        } catch(err){
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }
    }
    async logIn():Promise<Info> {
        const resp :Info = { data:'', successful:false, message:''};        
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");        
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: myHeaders,
                body: this.toJSON(["id","email","nombreCompleto"]),
                redirect: 'follow'
            };            
            const d=await fetch(`http://localhost:3001/auth/login`,  requestOptions);             
            const data:any = await d.json();                                                  
            if(data.Code===0)            
            {                                                
                resp.data=data.Data;
                resp.message=data.Message;            
                resp.successful=true;            
            }else{
                resp.message=data.Message;            
                resp.successful=false;            
            }                   
            return Promise.resolve(resp);
        } catch(err){
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }    
    }
    async update(): Promise<Info> {
        const resp :Info = { data:'', successful:false, message:''};        
        try {

            const token=localStorage.getItem("token");            
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");        
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions: RequestInit = {
                method: 'PUT',
                headers: myHeaders,
                body: this.toJSON(["id"]),
                redirect: 'follow'
            };
            const d=await fetch(`http://localhost:3001/api/usuarios/${this.id}`, requestOptions);            
            const data = await d.json();                          
            resp.message=data.Message;            
            resp.successful=true;            
            return Promise.resolve(resp);
        } catch(err){
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }           
    }
    save():Promise<Info>{
        
        if(this.id){
          return this.update();
        }else{
            return this.create()
        }
    }
    async get(): Promise<Info> {
        const resp :Info = { data:[], successful:false, message:''};
        try {

            const token=localStorage.getItem("token");
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");        
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,                
                redirect: 'follow'
            };

            const d=await fetch(`http://localhost:3001/api/usuarios/`, requestOptions);             
            const data:any = await d.json();                                      
            if(data.Code===0)            
            {                                
                const itemsUsuarios: UsuarioService[]=(data.Data as []).map(x => {
                    const item=new UsuarioService();
                    Object.assign(item,x);                    
                    return item;
                });                                                
                resp.data=itemsUsuarios;
                resp.message=data.Message;            
                resp.successful=true;            
            }else{
                resp.message=data.Message;            
                resp.successful=false;            
            }                        
            return Promise.resolve(resp);
        } catch(err){
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }
    }

    async getOne(): Promise<Info> {
        const resp :Info = { data:'', successful:false, message:''};
        try {
            const d=await fetch(`http://localhost:3001/api/usuarios/${this.id}`, {
              method: 'GET',
              redirect: 'follow'
            });            
            const data = await d.json();                                      
            resp.successful=true;            
            return Promise.resolve(resp);
        } catch(err){
            resp.successful=false;
            resp.message='Ha ocurrido un error no controlado.'
            resp.data=err;
            return Promise.reject(resp);            
        }
    }     
}

export default UsuarioService;