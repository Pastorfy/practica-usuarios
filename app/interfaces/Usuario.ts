import Crud from './util/Crud'

interface Usuario extends Crud {
    id?:number;
    name?:string;
    password?:string;    
}
export default Usuario;