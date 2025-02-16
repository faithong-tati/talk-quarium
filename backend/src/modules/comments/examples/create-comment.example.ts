import { BaseResponseExample } from 'src/common/examples';

export const CreateCommentRequestExample = {
  CONTENT: 'Typical orange cat behavior!',
};

export const CreateCommentResponseExample = {
  CONTENT: 'Typical orange cat behavior!',
  USER_ID: 1,
  POST_ID: 1,
};

export const CreateCommentResponseSuccessExample = {
  id: 1,
  content: 'Typical orange cat behavior!',
  createdAt: BaseResponseExample.USERNAME,
  createdBy: BaseResponseExample.ISSUED_AT,
  updatedAt: BaseResponseExample.USERNAME,
  updatedBy: BaseResponseExample.ISSUED_AT,
  userId: 1,
  postId: 1,
};
