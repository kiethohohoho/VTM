export interface IResetPassword {
  token: string;
  password: string;
}

export interface ResetPasswordProps {}
export interface ResetPasswordState {
  token: string | null;
  view: number | null;
}
export interface ResetPasswordViewProps {
  handleSubmit: (dataItem: any) => void;
  handleRedirectLogin: () => void;
  viewEnum: number | null;
  viewData: string | null;
  loading: boolean;
}
