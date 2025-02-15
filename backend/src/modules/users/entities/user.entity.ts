import { BaseEntity } from 'src/common/entities';
import { Comment } from 'src/modules/comments/entities';
import { Post } from 'src/modules/posts/entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
