import { Body, Controller,Delete,Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service'
import ApiReponse from '../../interfaces/ApiResponse'

@Controller('api/usuarios')
export class UsuariosController {

   constructor(
      private usuario: UsuariosService
   ){}
   
    @Get("/")
    async get(){
        const response : ApiReponse= {
            Code:0,
            Message:"",
            Data:[]
        }        
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

    @Get(':id')
    async getOne(@Param('id')id:number) {

        const response : ApiReponse= {
            Code:-1,
            Message:"",
            Data: null
        }                
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

     @Post()
     create(@Body() body:any){
        const response : ApiReponse= {
            Code:-1,
            Message:"",
            Data:false
        }                
        try{            
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

     @Put(":id")
     update(@Param('id') id:number,@Body() body:any ){
        const response : ApiReponse= {
            Code:-1,
            Message:"",
            Data:false
        }                
        try{            
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
        const response : ApiReponse= {
            Code:-1,
            Message:"",
            Data:false
        }                
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
