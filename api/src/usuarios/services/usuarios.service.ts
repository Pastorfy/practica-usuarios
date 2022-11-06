import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { Usuario } from '../entities/usuario.entity';
import  ApiReponse   from '../../interfaces/ApiResponse';

 
@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario) private usuariosRepo:Repository<Usuario>
    ){}

    get(){
        try {            
            return this.usuariosRepo.find();              
        }catch(err){
            throw err
        }        
    }

    async getOne(id: any){
        try{
            const data= await this.usuariosRepo.find({
                where:{
                    id:id
                }
            });        
            return data.find(x => x.id=id);
        }catch(err){
            throw  err;            
        }        
    }
    create(body:any){
        try{
            const newUsuario= this.usuariosRepo.create(body);        
            return this.usuariosRepo.save(newUsuario);
        }catch(err){
            throw  err;            
        }                
    }

    async update(id: any, body: any){
        try{
            const data= await this.usuariosRepo
                .createQueryBuilder()
                .update(Usuario)
                .set({password: body.password,name:body.name})
                .where("id = :id", { id: id })
                .execute()        
                
            return true;                    
        }catch(err){
            throw  err;            
        }          
    }

    async delete (id: number){
        try{
            const resp= await this.usuariosRepo.delete(id);
            return true
        }catch(err){
            throw  err;            
        }                        
    }

}
