// import AuthService from '@/utils/Auth';
// const auth = AuthService.getPackageAuth();
// console.log('aaa', auth);
import { EnumPathVTM } from '@/utils/Enums';

export const optionwithCard = (auth: any) => {
  return [
    {
      title: 'Tài khoản thanh toán/Thẻ ngân hàng',
      optionname: [
        {
          type: 1,
          option: 'Rút tiền mặt chính chủ tài khoản',
          // linkTo: auth ? EnumPathVTM.WITHDRAW : EnumPathVTM.LOGIN,
          redirectUrl: EnumPathVTM.WITHDRAW,
        },
        {
          type: 2,
          option: 'Rút tiền mặt khác chủ tài khoản',
          linkTo: '',
        },
        {
          type: 3,
          option: 'Thẻ ATM',
          linkTo: '',
        },
      ],
    },
    {
      title: 'Tài khoản/Thẻ liên ngân hàng',
      optionname: [
        {
          type: 1,
          option: 'Tài khoản thanh toán ngoài hệ thống',
          linkTo: '',
        },
      ],
    },
  ];
};
export const optionwithAddMoney = (auth: any) => {
  return [
    {
      title: 'Tài khoản/Thẻ ngân hàng',
      optionname: [
        {
          type: 1,
          option: 'Nộp tiền mặt chính chủ tài khoản',
          // linkTo: auth ? EnumPathVTM.DEPOSIT : EnumPathVTM.LOGIN,
          redirectUrl: EnumPathVTM.DEPOSIT,
        },
        {
          type: 2,
          option: 'Nộp tiền mặt khác chủ tài khoản',
          linkTo: '',
        },
      ],
    },
    {
      title: 'Tài khoản/Thẻ liên ngân hàng',
      optionname: [
        {
          type: 1,
          option: 'Tài khoản thanh toán ngoài hệ thống',
          linkTo: '',
        },
        {
          type: 2,
          option: 'Tài khoản thanh toán ngoài hệ thống',
          linkTo: '',
        },
      ],
    },
  ];
};
