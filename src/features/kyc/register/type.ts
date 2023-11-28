import { type IApiRequest } from '@/api/api.interface';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { type IDevicePayload } from '@/utils/Device';
import { type ENUM_COUNTRY, type EnumGender, type EnumGenderKhmer, type EnumNationalIDType } from '@/utils/Enums';

export enum VIEW_REGISTER {
  REGISTER_OTP = 0,
  SEND_OTP,
  REGISTER,
  UPLOAD_LICENSE_ACCOUNT,
  INFO_ACCOUNT,
  SELECT_ROLE,
  INFO_BY_ROLE,
}
export type IRenderView = Record<VIEW_REGISTER, React.ReactNode>;
// register OTP
export interface IFormValueRegisterOTP {
  phone: string;
}
export interface IRegisterOTPProps {
  api: IApiRequest;
  handleGetResponseSuccess: any;
}
export interface IResponseRegisterOTP {
  otpKey: string;
  length: number;
  timeCodeExpire: number;
  timeKeyExpire: number;
  contact: string;
  via: number;
}
export interface RegisterViewProps {
  view: VIEW_REGISTER;
  handleGetResponseSuccess: (dataItem: any) => void;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER) => void;
  loading: boolean;
}
export interface IRegisterInformationComponent {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBackRegisterOTP: (step: VIEW_REGISTER) => void;
  loading?: boolean;
}
export interface ISendOTPRegisterProps {
  apiOtp: IApiRequest;
  apiResendOtp: IApiRequest;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER) => void;
}
export interface IFormValueFormAccountRetailer {
  companyName: string;
  registeredAt: string;
  under: string;
  formOfEnterprise: string;
  mainBusiness: string;
  nationalityLicense: string;
  nameOwner: string;
  taxNumber: string;
  residence: string;
  phone: string;
  classification: string;
  license: string;
  countryCode: ENUM_COUNTRY | string | number;
  cityCode: string | number;
  districtCode: string | number;
  wardCode: string | number;
  name: string;
  address: string;
  cover: any;
  photo: any;
}
export interface IFormValueFormAccountBrand {
  brandName: string;
  productType: string;
  headOffice: string;
}
export interface IFormValueRegisterInformationComponent {
  password: string;
  confirmPassword: string;
  email: string;
}
export interface IFormValueInfoAccountComponent {
  name: string;
  nationalIDType: IItemDataDropDown;
  nationalID: string;
  gender: IItemDataDropDown;
  dob: any;
  contactAddress: string;
  nationalIDFront: {
    files: File[];
    imagesDefault: string[];
  };
  nationalIDBack: {
    files: File[];
    imagesDefault: string[];
  };
}
export interface IResponseUpload {
  ext: string;
  link: string;
  name: string;
}
export interface IIndexOfView {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER) => void;
  loading?: boolean;
}
export enum SELECT_ROLE {
  RETAILER = 0,
  BRAND = 1,
}
export interface IPayloadRegisterComponent {
  token: string;
  password: string;
  email: string;
  name: string;
  nationalIDType: EnumNationalIDType;
  nationalID: string;
  gender: EnumGender;
  dob: any;
  contactAddress: string;
  nationalIDFront: string;
  nationalIDBack: string;
  brand?: IFormValueFormAccountBrand;
  retailer: IFormValueFormAccountRetailer | undefined;
  device: IDevicePayload | undefined;
}
export interface IDataOCRIdCard {
  khm_name: string;
  height: string;
  place_of_birth: string;
  address: string;
  identifying_characteristics: string;
  card_id: string;
  eng_name: string;
  birth_date: string;
  resign_date: string;
  expiry_date: string;
  sex: EnumGenderKhmer;
}
export interface IResponseComponentInfoAccount extends IDataOCRIdCard {
  nationalIDFront: any;
  nationalIDBack: any;
}
export interface IDataOCRBusinessLicense {
  COMPANY_NAME: string[];
  REGISTERED_AT: string[];
  MAIN_BUSINESS_ACTIVITY: string[];
  FORM_OF_BUSINESS: string[];
  OWNER_NAME: string[];
  NATIONALITY: string[];
  TAX_NUMBER: string[];
  HEADER: string[];
  UNDER: string[];
  REPRESENTED_BY: string[];
  ADDRESS: string[];
}
export interface IResponseComponentInfoByRole extends IDataOCRBusinessLicense {
  selectRole: SELECT_ROLE;
}
