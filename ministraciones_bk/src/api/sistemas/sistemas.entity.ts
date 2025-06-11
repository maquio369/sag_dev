import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sistemas {
  @PrimaryGeneratedColumn()
  id_sistema: number;

  @Column({ nullable: false, comment: 'Sistema' })
  sistema: string;

  @Column({ comment: 'Grupo' })
  grupo: string;

  @Column({ comment: 'Sist.' })
  abreviatura: string;

  @Column({ comment: 'Objetivo del  sistema' })
  objetivo: string;

  @Column({ comment: 'Id Padre' })
  id_sistema_padre: number;

  @Column({ nullable: false, default: false })
  esta_borrado: boolean;

}
