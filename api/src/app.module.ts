import { Module } from '@nestjs/common';

import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type:'postgres',
        host:'localhost',
        port:54320,                
        username:'pastor',
        password:'poJ4J6PeDHPcAZ',
        database:'sistema',
        entities:['dist/**/*.entity{.ts,.js}'],
        synchronize:true,
        retryDelay:3000,
        retryAttempts:10
      }),
      UsuariosModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
