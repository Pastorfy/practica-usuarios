import { Body, Controller,Delete,Get, Param, Post, Put,UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service'
import ApiReponse from '../interfaces/ApiResponse'
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';


@Controller('api/usuarios')
export class UsuariosController {

    constructor(
          private usuario: UsuariosService
    ){}
   
    @UseGuards(JwtAuthGuard)
    @Get("/")
    async get(){
        const response : ApiReponse= { Code:0, Message:"", Data:[]}        
        try{            
            response.Data=await this.usuario.get();
            response.Message="Petición realizada con éxito";               
            return response;
        }catch(err){
            console.log(err);
            response.Code=-1;
            response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
            return response;
        }        
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id')id:number) {
        const response : ApiReponse= { Code:-1, Message:"", Data: null }                
        try {            
            response.Data=await this.usuario.getOne(id);
            response.Message="Petición realizada con éxito";               
            response.Code=0;            
            return response;
        }catch(err){
            console.log(err);            
            response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
            return response;
        }        
    }

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body:any){
        const response : ApiReponse= { Code:-1, Message:"", Data:false }                
        try{                        
            const hash = await bcrypt.hash(body.password, 10);            
            body.password=hash;            

            const ExistEmail= await this.usuario.getByEmail(body.email);
            if(ExistEmail){
                response.Data=false;
                response.Code=-1;
                response.Message="Este correo ya ha sido dado de alta, favor de ingresar uno diferente.";               
                return response;
            }

            const ExistUsername= await this.usuario.getByUsername(body.username);
            if(ExistUsername){
                response.Data=false;
                response.Code=-1;
                response.Message="Este nombre de usuario se encuentra en uso.";               
                return response;
            }

            console.log(ExistEmail);

            this.usuario.create(body);
            response.Data=true;
            response.Code=0;            
            response.Message="El usuario se ha creado con éxito";               
            return response;
        }catch(err){
            console.log(err);            
            response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
            return response;
        }           
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(@Param('id') id:number,@Body() body:any ){
        const response : ApiReponse= { Code:-1, Message:"", Data:false }                
        try{            
            const hash = await bcrypt.hash(body.password, 10);            
            body.password=hash;            
            this.usuario.update(id,body);        
            response.Data=true;
            response.Code=0;            
            response.Message="El usuario se ha modificado con éxito.";               
            return response;
        }catch(err){
            console.log(err);            
            response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
            return response;
        }  
         
     }
     
     @Delete(':id')
     delete(@Param('id') id:number){
        const response : ApiReponse= { Code:-1, Message:"", Data:false }                
        try{            
            this.usuario.delete(id);        
            response.Data=true;
            response.Code=0;            
            response.Message="El usuario se ha eliminado con éxito.";               
            return response;
        }catch(err){
            console.log(err);            
            response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
            return response;
        }           
     }

}
