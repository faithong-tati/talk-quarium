import { BaseResponseExample } from 'src/common/examples';

import { GetPostsResponseExample } from './get-posts.example';

export const GetPostByIdResponseSuccessExample = {
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
};
