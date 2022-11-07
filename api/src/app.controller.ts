import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import ApiReponse from './interfaces/ApiResponse'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    
    const response : ApiReponse= {
        Code:-1,
        Message:"",
        Data:''
    }                
    try {                                
        console.log(req.user);
        response.Data=await this.authService.login(req.user);
        response.Code=0;            
        response.Message="Usuario autenticado con éxito.";               
        return response;
    }catch(err){
        console.log(err);            
        response.Message='Ha ocurrido un error inesperado, intente mas tarde';                        
        return response;
    }    
    
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/validate')
  async validate(@Request() req) {        
    try {                                
        return true;                        
    }catch(err){
        return false;
    }      
  }

  
  @Get('auth/create_admin')
  async create_admin(@Request() req) {
    return this.authService.login(req.user);
  }
  
}