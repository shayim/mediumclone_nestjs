import { nanoid } from 'nanoid';
import { BeforeInsert, Column, PrimaryColumn } from 'typeorm';

export class EntityBase {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeInsert()
  private generateId() {
    this.id = nanoid();
  }
}
