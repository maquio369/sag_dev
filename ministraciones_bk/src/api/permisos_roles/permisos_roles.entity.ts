import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PermisosRoles {
  @PrimaryColumn()
  rol_id: number;

  @PrimaryColumn()
  permiso_id: number;

  @Column({ nullable: false, default: true })
  esta_activo: boolean;
}