import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ nullable: false })
  rol: string;

  @Column()
  abreviatura: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
