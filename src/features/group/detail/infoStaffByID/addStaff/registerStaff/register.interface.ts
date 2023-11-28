import { type IApiRequest } from '@/api/api.interface';

export enum VIEW_REGISTER_STAFF {
  REGISTER_OTP = 0,
  SEND_OTP,
  REGISTER,
  SUCCESS,
}
export type IRenderViewStaff = Record<VIEW_REGISTER_STAFF, React.ReactNode>;
// register OTP
export interface IFormValueRegisterOTPStaff {
  token: string;
}
export interface IRegisterOTPPropsStaff {
  api: IApiRequest;
  apiCheckToken: IApiRequest;
  handleGetResponseSuccess: any;
}
export interface IResponseRegisterOTPStaff {
  otpKey: string;
  length: number;
  timeCodeExpire: number;
  timeKeyExpire: number;
  contact: string;
  via: number;
}
export interface RegisterViewPropsStaff {
  view: VIEW_REGISTER_STAFF;
  handleGetResponseSuccess: (dataItem: any) => void;
  responseSuccess: object;
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
}
export interface IRegisterInformationPropsStaff {
  api: IApiRequest;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
}
export interface ISendOTPPropsStaff {
  apiOtp: IApiRequest;
  apiResendOtp: IApiRequest;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
}
export interface IFormValueRegisterInformationStaff {
  token: string;
  password: string;
}
