import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from './entities/usuario.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario])
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController]
})
export class UsuariosModule {}
