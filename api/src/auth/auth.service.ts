import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';   
import { Usuario } from 'src/usuarios/usuario.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const hash = await bcrypt.hash(pass, 10);             
    const user :Usuario= await this.usersService.getByUsername(username);
    if(bcrypt.compare(hash,user.password)){
        const { username,password,email,nombreCompleto ,id} = user;
        return {username,email,nombreCompleto,id};  
    }    
    return null;
  }

  async login(user: any) {
    
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      username:user.username,
      nombreCompleto:user.nombreCompleto      
    };
  }
}

/*
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}*/