import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Opciones {
  @PrimaryGeneratedColumn()
  id_opciones: number;

  @Column()
  id_sistema: number;

  @Column()
  id_sistema_padre: number;

  @Column()
  link: string;

  @Column()
  orden: number;

  @Column()
  icono: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
