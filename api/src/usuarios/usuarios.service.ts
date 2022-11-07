import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {FindOneOptions, FindOptionsSelect, Repository} from 'typeorm'
import { Usuario } from './usuario.entity';
import  ApiReponse   from '../interfaces/ApiResponse';

 
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

    async getOne(id: any):Promise<Usuario| undefined>{
        try{            
            const data= await this.usuariosRepo.find({
                where: {
                    id:id                    
                }
            });        
            return data.find(x => x.id=id);
        }catch(err){
            throw  err;            
        }        
    }
    async getByUsername(username: string):Promise<Usuario| undefined>{
        try{                        
            const data:Usuario = await this.usuariosRepo.createQueryBuilder("usuario").
                                where('usuario.username= :username',{username:username}).                                
                                getOne();            
            return Promise.resolve(data);
        }catch(err){
            throw  err;            
        }        
    }
    
    async getByEmail(email: string):Promise<Usuario| undefined>{
        try{                        
            const data:Usuario = await this.usuariosRepo.createQueryBuilder("usuario").
                                where('usuario.email= :email',{email:email}).                                
                                getOne();            
            return Promise.resolve(data);
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
                .set({password: body.password,username:body.username,nombreCompleto:body.nombreCompleto,email:body.email})
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
