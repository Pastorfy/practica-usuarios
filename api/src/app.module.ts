import { Module } from '@nestjs/common';
import ApiReponse from './interfaces/ApiResponse'
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';



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
      UsuariosModule,
      AuthModule,      
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


