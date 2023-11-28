import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type DataResponse, type State } from './api.interface';

const REQUEST = {
  REQUEST_2000: '200' || '2000',
  LOGIN_2000: '2000',
  SERVER_ERROR: '5000',
  ERROR_500: '500',
  ERROR_4002: '4002',
  LOGIN_4002: 'LOGIN_4002',
  LOGIN_4022: '4022',
  LOGIN_4025: '4025',
  COMMON_4002: 'COMMON_4002',
  OTP_4004: 'OTP_4004',
  OTP_4001: '4032' || 'OTP_4001',
  OTP_4002: 'OTP_4002',
  OTP_4000: '4031' || 'OTP_4000',
  OTP_4003: '4030' || 'OTP_4003',
  COMMON_4001: 'COMMON_4001',
  PHONE_EXISTED_4000: 'PHONE_EXISTED_4000',
  REGISTER_4000: 'REGISTER_4000',
  TOKEN_USED_4000: 'TOKEN_USED_4000',
  NOT_FOUND_RESULT_4001: 'NOT_FOUND_RESULT_4001',
  LICENSE_EXIST_409: '409',
  LICENSE_SUCCESS_4041: '4041',
  LICENSE_DATA_2449: '2449',
  LICENSE_UPDATE_2448: '2448',
  LICENSE_APPROVE_2448: '2029',
  PHONE_EXIST_441: '441',
  EMAIL_EXIST_443: '443',
  PHONE_SUCCESS_2452: '2452',
  EMAIL_SUCCESS_2453: '2453',
  OTP_SUCCESS_2099: '2099',
  USERNAME_SUCCESS_2454: '2454',
  USERNAME_EXIST_445: '445',
  UPDATE_SUCCESS_2457: '2457',
  UPDATE_FAILED_4043: '4043',
  RESENT_OTP_SUCCESS: '2097',
  ACCOUNT_SUCCESS_2051: '2051',
  WITHDRAW_SUCCESS_2098: '2098',
  WITHDRAW_FALSE_4052: '4052',
};
const REQUEST_PARSE = {
  [REQUEST.REQUEST_2000]: 'handleRequestSuccess',
  [REQUEST.LOGIN_2000]: 'handleRequestLoginSuccess',
  [REQUEST.SERVER_ERROR]: 'handleRequestError',
  [REQUEST.ERROR_4002]: 'handleExpireToken',
  [REQUEST.LOGIN_4002]: 'handleRequestAccountLocked',
  [REQUEST.LOGIN_4022]: 'handleRequestWrongUserOrPassword',
  [REQUEST.COMMON_4002]: 'handleRequestAccountExisted',
  [REQUEST.OTP_4004]: 'handleRequestOTPLimited',
  [REQUEST.OTP_4001]: 'handleRequestOTPExpired',
  [REQUEST.OTP_4000]: 'handleRequestOTPNotMatch',
  [REQUEST.OTP_4003]: 'handleRequestOTPWrongManyTime',
  [REQUEST.OTP_4002]: 'handleRequestOTPFailed',
  [REQUEST.COMMON_4001]: 'handleDuplicateName',
  [REQUEST.PHONE_EXISTED_4000]: 'handleRequestPhoneExisted',
  [REQUEST.REGISTER_4000]: 'handleRequestTokenRegisterExpired',
  [REQUEST.TOKEN_USED_4000]: 'handleRequestTokenUsed',
  [REQUEST.ERROR_500]: 'handleExpireTokenLogout',
  [REQUEST.ERROR_4002]: 'handleExpireTokenLogout',
  [REQUEST.SERVER_ERROR]: 'handleRequestTokenRegisterExpired',
  [REQUEST.NOT_FOUND_RESULT_4001]: 'handleNotFoundResult',
  [REQUEST.COMMON_4001]: 'handleNotExistConsumer',
  [REQUEST.LICENSE_EXIST_409]: 'handleLicenseExist',
  [REQUEST.LICENSE_SUCCESS_4041]: 'handleRequestLicenseSuccess',
  [REQUEST.LICENSE_DATA_2449]: 'handleRequestLicenseHaveData',
  [REQUEST.LICENSE_UPDATE_2448]: 'handleRequestLicenseUpdate',
  [REQUEST.LICENSE_APPROVE_2448]: 'handleRequestLicenseApprove',
  [REQUEST.PHONE_EXIST_441]: 'handlePhoneExist',
  [REQUEST.EMAIL_EXIST_443]: 'handleEmailExist',
  [REQUEST.PHONE_SUCCESS_2452]: 'handlePhoneSuccess',
  [REQUEST.EMAIL_SUCCESS_2453]: 'handleEmailSuccess',
  [REQUEST.OTP_SUCCESS_2099]: 'handleOTPSuccess',
  [REQUEST.USERNAME_SUCCESS_2454]: 'handleUserNameSuccess',
  [REQUEST.USERNAME_EXIST_445]: 'handleUserNameExist',
  [REQUEST.UPDATE_FAILED_4043]: 'handleUpdateFailed',
  [REQUEST.UPDATE_SUCCESS_2457]: 'handleUpdateSuccess',
  [REQUEST.RESENT_OTP_SUCCESS]: 'handleResentSuccess',
  [REQUEST.ACCOUNT_SUCCESS_2051]: 'handleGetAccountSuccess',
  [REQUEST.WITHDRAW_SUCCESS_2098]: 'handleWithDrawSuccess',
  [REQUEST.LOGIN_4025]: 'handleUserNotApproved',
  [REQUEST.WITHDRAW_FALSE_4052]: 'handleWithdrawExceedMoney',
};
class ResponseCode {
  static get REQUEST() {
    return REQUEST;
  }

  static get REQUEST_PARSE() {
    return REQUEST_PARSE;
  }

  static find(response: DataResponse, state: State) {
    try {
      const code = { ...REQUEST_PARSE };
      const funcName = code[response?.code];
      LoggerService.debug('ResponseCode execute find receive response', response);
      LoggerService.debug('ResponseCode execute find receive state', state);
      LoggerService.debug('ResponseCode execute find receive funcName', funcName);
      if (Helper.isEmpty(funcName) && response.code !== REQUEST.ERROR_4002) {
        toastDefault(ENUMS_TOAST.ERROR, response?.code);
      }

      if (Helper.isEmpty(state[funcName]) && response.code !== REQUEST.ERROR_4002) {
        toastDefault(ENUMS_TOAST.ERROR, response?.code);
      }
      state[funcName](response?.data);
    } catch (err: any) {
      LoggerService.error('ResponseCode execute find receive error', err.messages);
      throw err;
    }
  }
}

export default ResponseCode;
