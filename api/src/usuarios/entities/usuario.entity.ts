import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    password:string; 

}