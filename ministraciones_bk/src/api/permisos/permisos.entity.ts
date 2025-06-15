import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permisos {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @PrimaryGeneratedColumn()
  id_opcion: number;

  @Column({ nullable: false, default: false, comment: 'Borrado' })
  esta_borrado: boolean;

}
