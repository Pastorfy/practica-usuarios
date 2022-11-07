import Crud from './util/Crud'

interface Usuario extends Crud {
    id?:number;
    username?:string;
    password?:string;
    email?: string;
    nombreCompleto?:string;        
}
export default Usuario;