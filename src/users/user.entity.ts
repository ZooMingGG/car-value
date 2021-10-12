import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: false })
  public isAdmin: boolean;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => Report, (report) => report.user)
  public reports: Report[];

  @AfterInsert()
  public logInsert(): void {
    console.log('Inserted user with id: ', this.id);
  }

  @AfterUpdate()
  public logUpdate(): void {
    console.log('Updated user with id: ', this.id);
  }

  @AfterRemove()
  public logRemove(): void {
    console.log('Removed user with id: ', this.id);
  }
}
