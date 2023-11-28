import AuthService from '@/utils/Auth';

import { optionwithAddMoney, optionwithCard } from '../options';
import OptionsCommon from '../options/components/view';
const auth = AuthService.getPackageAuth();
export const Itemcontent = [
  {
    key: '1',
    header: 'Rút tiền',
    content: (
      <OptionsCommon
        data={optionwithCard(auth)}
        content='Lựa chọn các phương thức rút tiền sau đây'
      />
    ),
  },
  {
    key: '2',
    header: 'Nộp tiền',
    content: (
      <OptionsCommon
        data={optionwithAddMoney(auth)}
        content='Lựa chọn các phương thức nộp tiền sau đây'
      />
    ),
  },
];
