export enum VIEW_WITHDRAW_VTM {
  WITHDRAW = 0,
  WITHDRAW_OTP,
}

export interface WithdrawViewVTMProps {
  view: VIEW_WITHDRAW_VTM;
  handleGetResponseSuccess: (dataItem: any) => void;
  handleBack: (step: VIEW_WITHDRAW_VTM) => void;
  responseSuccess: any;
  loading: boolean;
}

export type IRenderViewVTM = Record<VIEW_WITHDRAW_VTM, React.ReactNode>;

export interface IIndexOfViewWithdrawVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_WITHDRAW_VTM) => void;
  loading?: boolean;
}
