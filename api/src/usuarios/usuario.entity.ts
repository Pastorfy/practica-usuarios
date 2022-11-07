import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Unique} from 'typeorm'

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    username:string;    

    @Column({ unique: true })
    email:string

    @Column()
    password:string;     

    @Column()
    nombreCompleto:string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
    
}