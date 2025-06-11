import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UnidadesDeMedida {
  @PrimaryGeneratedColumn()
  unidad_de_medida_id: number;

  @Column({ nullable: false })
  unidad_de_medida: string;

  @Column()
  abreviatura: string;

  @Column({ nullable: false, default: true })
  esta_borrado: boolean;

}
