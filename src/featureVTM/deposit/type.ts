export enum VIEW_DEPOSIT_VTM {
  DEPOSIT = 0,
  DEPOSIT_WAIT,
  DEPOSIT_STATISTICS,
  DEPOSIT_RESULT,
}

export interface WithdrawViewVTMProps {
  view: VIEW_DEPOSIT_VTM;
  handleGetResponseSuccess: (dataItem: any) => void;
  handleBack: (step: VIEW_DEPOSIT_VTM) => void;
  responseSuccess: any;
  loading: boolean;
}

export type IRenderViewVTM = Record<VIEW_DEPOSIT_VTM, React.ReactNode>;

export interface IIndexOfViewWithdrawVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_DEPOSIT_VTM) => void;
  loading?: boolean;
}

export interface DepositViewVTMProps {
  view: VIEW_DEPOSIT_VTM;
  handleGetResponseSuccess: (dataItem: any) => void;
  responseSuccess: any;
  handleBack: (step: VIEW_DEPOSIT_VTM) => void;
  loading: boolean;
}

export interface IIndexOfViewDepositVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_DEPOSIT_VTM) => void;
  loading?: boolean;
}
