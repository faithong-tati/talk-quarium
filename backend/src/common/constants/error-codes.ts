import { ResponseDto } from 'src/common/dtos';

import { ErrorCode } from '../constants';

export const ERROR_CODES: ResponseDto[] = [
  {
    errorCode: ErrorCode.SUCCESS,
    message: 'Success',
    successful: true,
    display: 'ทำรายการสำเร็จ',
    httpStatus: 200,
  },
  {
    errorCode: ErrorCode.SERVER_ERROR,
    message: 'Server error',
    successful: false,
    display: 'พบข้อผิดพลาดการเชื่อมต่อเซิร์ฟเวอร์! กรุณาลองอีกครั้ง',
    httpStatus: 500,
  },
  {
    errorCode: ErrorCode.INVALID_DATA,
    message: 'Invalid Data',
    successful: false,
    display: 'ข้อมูลไม่ถูกต้อง กรุณากรอกใหม่',
    httpStatus: 400,
  },
  {
    errorCode: ErrorCode.UNAUTHORIZED,
    message: 'Unauthorized',
    successful: false,
    display: 'พบข้อผิดพลาดในการตรวจสอบสิทธิ์ในการเข้าถึงข้อมูล',
    httpStatus: 401,
  },
  {
    errorCode: ErrorCode.FORBIDDEN,
    message: 'Forbidden',
    successful: false,
    display: 'ไม่ได้รับสิทธิ์ในการเข้าถึงข้อมูล',
    httpStatus: 403,
  },
  {
    errorCode: ErrorCode.TOKEN_EXPIRED,
    message: 'Token expired',
    successful: false,
    display: 'Token หมดอายุ',
    httpStatus: 401,
  },
  {
    errorCode: ErrorCode.JWT_INVALID_SIGNATURE,
    message: 'JsonWebTokenError: invalid signature',
    successful: false,
    display: 'JsonWebTokenError: invalid signature',
    httpStatus: 401,
  },
];
