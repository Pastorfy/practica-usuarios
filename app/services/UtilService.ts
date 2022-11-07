import { Ref,ref } from "vue";
 class  UtilService  {
        
    constructor(){        
    }    
    
    static async validateToken(token?:string|null): Promise<Boolean> {
        
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,            
            redirect: 'follow'
        };        
        try {
            const d=await fetch(`http://localhost:3001/auth/validate/`, requestOptions);            
            const data = await d.json(); 
            console.log()                                     
            return Promise.resolve(true);
        } catch(err){
            console.log(err);            
            return Promise.reject(false);            
        }        
    }
    
    
}

export default UtilService;