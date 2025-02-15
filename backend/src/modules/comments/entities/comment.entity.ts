import { BaseEntity } from 'src/common/entities';
import { Post } from 'src/modules/posts/entities';
import { User } from 'src/modules/users/entities';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
