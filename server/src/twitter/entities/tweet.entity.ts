import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tweets')
export class Tweet {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'day_number' })
  dayNumber: number;

  @Column({ type: 'json', nullable: true })
  publicMetrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };

  @Column({ nullable: true })
  conversationId: string;

  @Column({ nullable: true })
  authorId: string;

  @CreateDateColumn({ name: 'db_created_at' })
  dbCreatedAt: Date;

  @UpdateDateColumn({ name: 'db_updated_at' })
  dbUpdatedAt: Date;
}
