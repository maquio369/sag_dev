import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sistemas {
  @PrimaryGeneratedColumn()
  sistema_id: number;

  @Column({ nullable: false, comment: 'Sistema' })
  sistema: string;

  @Column({ comment: 'Grupo' })
  grupo: string;

  @Column({ comment: 'Sist.' })
  abreviatura: string;

  @Column({ comment: 'Objetivo del  sistema' })
  objetivo: string;

  @Column({ comment: 'Id Padre' })
  sistema_padre_id: number;

  @Column({ nullable: false, default: false })
  esta_activo: boolean;

}
