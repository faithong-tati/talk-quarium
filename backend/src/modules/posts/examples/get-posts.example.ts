import { Topic } from 'src/common/constants';
import { BaseResponseExample } from 'src/common/examples';

export const GetPostsResponseExample = {
  CONTENT: `My cat doesn't even turn her head when I call her :(`,
  TITLE: 'Why does my cat ignore me?',
  TOPIC: Topic.PETS,
  USERNAME: BaseResponseExample.USERNAME,
};

export const GetPostsResponseSuccessExample = {
  items: [
    {
      id: 1,
      content: GetPostsResponseExample.CONTENT,
      createdAt: BaseResponseExample.ISSUED_AT,
      createdBy: BaseResponseExample.USERNAME,
      title: GetPostsResponseExample.TITLE,
      topic: GetPostsResponseExample.TOPIC,
      updatedAt: BaseResponseExample.ISSUED_AT,
      updatedBy: BaseResponseExample.USERNAME,
      userId: 1,
      username: GetPostsResponseExample.USERNAME,
    },
  ],
  totalItems: 1,
};
