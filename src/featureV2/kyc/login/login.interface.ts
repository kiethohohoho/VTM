import { type IDevicePayload } from '@/utils/Device';

export enum VIEW_LOGIN {
  LOGIN = 0,
  SEND_OTP = 1,
  SELECT_ROLE = 2,
  SELECT_STORE = 3,
}

export interface LoginParams {
  username: string;
  password: string;
  device: IDevicePayload | undefined;
}
export interface IResponseLogin {
  otpKey: string;
  length: number;
  timeCodeExpire: number;
  timeKeyExpire: number;
  contact: string;
  via: number;
}
