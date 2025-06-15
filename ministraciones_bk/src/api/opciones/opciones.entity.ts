import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Opciones {
  @PrimaryGeneratedColumn()
  id_opcion: number;

  @Column({ comment: 'sistemas' })
  id_sistema: number;

  @Column({ comment: 'Opción del sistema' })
  opcion: string;

  @Column({ comment: 'Descripción' })
  descripcion: string;

  @Column({ comment: 'Link' })
  link: string;

  @Column({ comment: 'Ícono' })
  icono: string;

  @Column({ comment: 'opciones' })
  id_opcion_padre: number;

  @Column({ comment: 'Orden' })
  orden: number;

  @Column({ nullable: false, default: false, comment: 'Borrado' })
  esta_borrado: boolean;

}
