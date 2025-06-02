import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductosNoRegistrados {
  @PrimaryGeneratedColumn()
  producto_no_registrado_id: number;

  @Column({ nullable: false })
  producto_no_registrado: string;

  @Column()
  justificacion: string;

  @Column()
  foto_url: string;

  @Column()
  precio: number;

  @Column()
  producto_estatus_id: number;

  @Column()
  unidad_de_medida_id: number;

  @Column()
  categoria_id: number;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;

}
