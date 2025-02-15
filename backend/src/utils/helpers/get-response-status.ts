import { ERROR_CODES } from 'src/common/constants';
import { ResponseDto } from 'src/common/dtos';

export const getResponseStatus = <T = unknown>(
  errorCode: string,
  data: T,
  message: string | string[] = '',
): ResponseDto<T> => {
  const error = ERROR_CODES.find(item => item.errorCode === errorCode);

  return {
    ...error,
    message: message.length ? message : error?.message,
    data,
  } as ResponseDto<T>;
};
