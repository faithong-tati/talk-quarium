import { Topic } from 'src/common/constants';
import { BaseResponseExample } from 'src/common/examples';

export const CreatePostRequestExample = {
  CONTENT: `My cat doesn't even turn her head when I call her :(`,
  TITLE: 'Why does my cat ignore me?',
  TOPIC: Topic.PETS,
};

export const CreatePostResponseExample = {
  CONTENT: `My cat doesn't even turn her head when I call her :(`,
  TITLE: 'Why does my cat ignore me?',
  TOPIC: Topic.PETS,
};

export const CreatePostResponseSuccessExample = {
  id: 1,
  content: `My cat doesn't even turn her head when I call her :(`,
  createdAt: BaseResponseExample.USERNAME,
  createdBy: BaseResponseExample.ISSUED_AT,
  title: 'Why does my cat ignore me?',
  topic: 'pets',
  updatedAt: BaseResponseExample.USERNAME,
  updatedBy: BaseResponseExample.ISSUED_AT,
  userId: 1,
};
