import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  id_rol: number;

  @Column({ nullable: false })
  nombres: string;

  @Column({ nullable: false })
  apellidos: string;

  @Column()
  correo: string;

  @Column({ nullable: false })
  usuario: string;

  @Column({ nullable: false })
  contraseña: string;

  @Column()
  foto: string;

  @Column()
  id_empleado: number;

  @Column({ nullable: false, default: false })
  esta_borrado: boolean;

}
