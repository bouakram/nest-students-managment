import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    userUUID: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    role: string
}