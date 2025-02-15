import { Topic } from 'src/common/constants';
import { BaseEntity } from 'src/common/entities';
import { Comment } from 'src/modules/comments/entities';
import { User } from 'src/modules/users/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column({
    type: 'simple-enum',
    enum: Topic,
    default: Topic.OTHERS,
  })
  topic: Topic;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
