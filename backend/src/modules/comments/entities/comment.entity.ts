import { BaseEntity } from 'src/common/entities';
import { Post } from 'src/modules/posts/entities';
import { User } from 'src/modules/users/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column('text')
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.comments, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  postId: number;

  @ManyToOne(() => Post, post => post.comments, { eager: true })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
