import React from 'react';

import { type IIndexOfViewWithdrawVTM } from '../type';
import WithdrawComponent from './component';
//  TODO:DEMO START SESSION
type RevokedestType = 'A' | 'B' | 'C';

interface CreateSessionInput {
  command: 'createsession';
  sessionID: string;
  note: string;
  revokedest: RevokedestType[];
}
interface OutputSession {
  errorcode: number;
  error: string;
  timeout: number;
}
/// use STVTM to conenct this function
/// example
/// <button class="btn btn-stvtm-cmd" onclick="STVTM.createNewSession(param1);">call cmd 1</button>
export const createNewSession = (input: CreateSessionInput) => {
  const result: OutputSession = {
    errorcode: 0,
    error: 'No error',
    timeout: 0,
  };
  return result;
};
// TODO: END SESSION
// USE:
/// <button class="btn btn-stvtm-cmd" onclick="STVTM.endSession(param1);">End session</button>
interface EndsessionInput {
  command: 'endsession';
  note: any;
}
export const endSession = (input: EndsessionInput) => {
  const result: OutputSession = {
    errorcode: 0,
    error: 'No error',
    timeout: 0,
  };
  return result;
};
// TODO: OPEN SHUTTER
interface openShutterProps {
  command: 'openshutter';
  note: any;
}
export const openShutter = (input: openShutterProps) => {
  const result: OutputSession = {
    errorcode: 0,
    error: 'No error',
    timeout: 0,
  };
  return result;
};
// TODO: CLOSE SHUTTER
interface closeShutterProps {
  command: 'closeshutter';
  note: any;
}
export const closeShutter = (input: closeShutterProps) => {
  const result: OutputSession = {
    errorcode: 0,
    error: 'No error',
    timeout: 0,
  };
  return result;
};
// TODO: WITHDRAW
interface withDrawProps {
  command: 'withdraw';
  amount: number;
}
interface outPutWithDraw {
  RC1: number;
  RC2: number;
  RC3: number;
  RC4: number;
  SafeWithrawThreshold: number;
  RcD: string[] | string;
  errorcode: number;
  timeout: number;
  error: string;
}
export const withDraw = (input: withDrawProps) => {
  const result: outPutWithDraw = {
    RC1: 2,
    RC2: 1,
    RC3: 4,
    RC4: 4,
    SafeWithrawThreshold: 10,
    RcD: '50kVND,100kVND,200kVND,500kVND',
    errorcode: 15181,
    timeout: 0,
    error:
      'RC2 cassette designated for dispensing is empty (Report empty RC2, and do not withdraw notes till insertion of notes )',
  };
  return result;
};
// TODO: CHECK MONNEY
interface checkMoneyProps {
  command: 'check';
  amount: number;
}
interface resultcheckMoney {
  RC1: number;
  RC2: number;
  RC3: number;
  RC4: number;
  SafeWithrawThreshold: number;
  RcD: string[] | string;
  errorcode: number;
  error: string;
  timeout: number;
}
export const checkMonney = (input: checkMoneyProps) => {
  const result: resultcheckMoney = {
    RC1: 2,
    RC2: 1,
    RC3: 4,
    RC4: 4,
    SafeWithrawThreshold: 10,
    RcD: '50kVND,100kVND,200kVND,500kVND',
    errorcode: 5,
    error: 'output exeed 200',
    timeout: 0,
  };
  return result;
};
// TODO: COUNT MONNEY
interface CountCommand {
  command: 'count';
  option: {
    OpenShutterOnReject: boolean;
  };
}
interface countResult {
  k10: number;
  k20: number;
  k50: number;
  k100: number;
  k200: number;
  k500: number;
  Reject: number;
  errorcode: number;
  error: string;
  timeout: number;
}
export const countMoney = (input: CountCommand) => {
  const result: countResult = {
    k10: 0,
    k20: 0,
    k50: 0,
    k100: 0,
    k200: 0,
    k500: 0,
    Reject: 0,
    errorcode: 0,
    error: '',
    timeout: 0,
  };
  return result;
};
// TODO: PREPAREDEPOSIT
interface prepareDepositCommand {
  command: 'preparedeposit';
}
interface prepareDepositResult {
  AC_A: number;
  AC_B: number;
  AC_C: number;
  RC1: number;
  RC2: number;
  RC3: number;
  RC4: number;
  SafeWithdrawThreshold: number;
  errorcode: number;
  error: string;
  timeout: number;
}
export const preparedeposit = (input: prepareDepositCommand) => {
  const result: prepareDepositResult = {
    AC_A: 0,
    AC_B: 0,
    AC_C: 0,
    RC1: 0,
    RC2: 0,
    RC3: 0,
    RC4: 0,
    SafeWithdrawThreshold: 0,
    errorcode: 0,
    error: '',
    timeout: 0,
  };
  return result;
};
// TODO: CANCEL DEPOSIT

interface cancelDepositCommand {
  command: 'canceldeposit';
}
interface cancelResult {
  NE: number;
  NF: number;
  errorcode: number;
  error: string;
  timeout: number;
}
export const cancelDeposit = (input: cancelDepositCommand) => {
  const result: cancelResult = {
    NE: 0,
    NF: 0,
    errorcode: 0,
    error: 'No error',
    timeout: 0,
  };
  return result;
};
// TODO: THERMALPRINT

interface thermalPrintProps {
  command: 'thermalprint';
  content: string;
}
export const thermalPrint = (input: thermalPrintProps) => {
  const result: OutputSession = {
    errorcode: 0,
    error: '',
    timeout: 0,
  };
  return result;
};
// TODO: VTMINFO

interface ErrorInfo {
  code: number;
  source: number;
}

interface VtmInfoCommand {
  command: 'vtminfo';
  errors_overridden: ErrorInfo[];
}
interface ErrorInfo {
  code: number;
  source: number;
  active: boolean;
  desc: string;
}

interface DeviceConfig {
  DeviceCode: string;
  BranchCode: string;
  VTMCode: string;
  Terminal_ID: string;
  RCDenoms: string;
  AcceptableDenoms: string;
  errors_overridden: ErrorInfo[];
}

export const getVtmInfo = (input: VtmInfoCommand) => {
  const result: DeviceConfig = {
    DeviceCode: '7c338689-0050-46b8-a0aa-44815d407113',
    BranchCode: '100',
    VTMCode: '100_1_VTM',
    Terminal_ID: '100_1_VTM',
    RCDenoms: '50kVND,100kVND,200kVND,500kVND',
    AcceptableDenoms: '(none),(none),50kVND,100kVND,200kVND,500kVND',
    errors_overridden: [
      {
        code: 16000,
        source: 2,
        active: true,
        desc: 'error description and source',
      },
      {
        code: 15789,
        source: 2,
        active: false,
        desc: 'UNKNOWN_ERROR_OR_SOURCE',
      },
    ],
  };
  return result;
};
function IndexWithdraw({ handleGetResponseSuccess, responseSuccess, handleBack }: IIndexOfViewWithdrawVTM) {
  return (
    <WithdrawComponent
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      handleBack={handleBack}
    />
  );
}
export default IndexWithdraw;
