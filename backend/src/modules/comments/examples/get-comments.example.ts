import { BaseResponseExample } from 'src/common/examples';

export const GetCommentsResponseExample = {
  CONTENT: 'Typical orange cat behavior!',
  POST_ID: 1,
  USER_ID: 1,
  USERNAME: BaseResponseExample.USERNAME,
  USER_IMAGE_URL: BaseResponseExample.USER_IMAGE_URL,
};

export const GetCommentsResponseSuccessExample = {
  items: [
    {
      id: 1,
      content: GetCommentsResponseExample.CONTENT,
      createdAt: BaseResponseExample.USERNAME,
      createdBy: BaseResponseExample.ISSUED_AT,
      postId: 1,
      updatedAt: BaseResponseExample.USERNAME,
      updatedBy: BaseResponseExample.ISSUED_AT,
      userId: 1,
      userImageUrl: BaseResponseExample.USER_IMAGE_URL,
      username: BaseResponseExample.USERNAME,
    },
  ],
  totalItems: 1,
};
