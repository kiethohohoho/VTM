export interface ForgotViewProps {
  viewRequest: number;
  viewData: any;
  loading: boolean;
  handleSubmit?: (dataItem: any) => void;
  handleSubmitOtp: (code: string) => void;
  handleReSendOtp: () => void;
  handleSubmitNewPassword?: (dataItem: any) => void;
  handleResetView: () => void;
  handleNavigate: (url: string) => void;
  handleBack: () => void;
}
export interface ForgotPasswordProps {}
export interface ForgotPasswordState {
  view: number;
}

export interface IRequestForgotPassword {
  code?: string;
  data?: object;
  messages?: string;
}
export interface IResponseForgotPhone {
  otpKey: string;
  length?: number;
  timeCodeExpire?: number;
  timeKeyExpire?: number;
  contact?: string;
  via?: number;
}

export interface ISubmitOtpPayload {
  otpKey: string;
  code: string;
}

export interface IReSendOtpPayload {
  otpKey: string;
}

export interface INewPasswordPayload {
  token: string;
  password: any;
}

export interface IViewData {
  data: IResponseForgotPhone | undefined;
  phone: string;
}
