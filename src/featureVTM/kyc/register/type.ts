export enum VIEW_REGISTER_VTM {
  INFO_ACCOUNT = 0,
  REGISTER_OTP,
  REGISTER,
  REGISTER_ACCOUNT,
  REGISTER_SUCCESS,
}

export type IRenderViewVTM = Record<VIEW_REGISTER_VTM, React.ReactNode>;

export interface RegisterViewVTMProps {
  view: VIEW_REGISTER_VTM;
  handleGetResponseSuccess: (dataItem: any) => void;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER_VTM) => void;
  loading: boolean;
}

export interface IIndexOfViewInForVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_REGISTER_VTM) => void;
  loading?: boolean;
}

export interface IIndexOfViewVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack?: (step: VIEW_REGISTER_VTM) => void;
  loading?: boolean;
}

export const lgCol = 12;
export const gutterRow = 8;

export const inputStyle = {
  width: '100%',
};

export const buttonStyle = {
  width: '100%',
  height: '4rem',
  fontSize: '1.5rem',
};

export const labelFormInfor = {
  customerName: 'Họ và tên',
  dod: 'Ngày sinh',
  sex: 'Giới tính',
  license: 'CMNN/CCCC/Hộ chiếu',
  licenseDate: 'Ngày cấp',
  licensePlace: 'Nơi cấp',
  licenseType: 'Loại giấy tờ',
  nationality: 'Quốc tịch',
  permanentAddr: 'Địa chỉ',
  phone: 'Số điện thoại',
  email: 'Email',
  inviteCode: 'Mã giới thiệu',
  isRegCard: 'Chấp nhận điều khoản',
  CCCD: 'Số CCCD',
  CMND: 'Số CMND',
  Passport: 'Số hộ chiếu',
  userName: 'Tên đăng nhập',
  password: 'Mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  exprideDay: 'Ngày hết hạn',
};

export const placeholderFormInfor = {
  customerName: 'Họ và tên',
  dod: 'Ngày sinh',
  sex: 'Giới tính',
  license: 'CMNN/CCCC/Hộ chiếu',
  licenseDate: 'Ngày cấp',
  licensePlace: 'Nơi cấp',
  licenseType: 'Loại giấy tờ',
  nationality: 'Quốc tịch',
  permanentAddr: 'Địa chỉ',
  phone: 'Số điện thoại',
  email: 'Email',
  inviteCode: 'Mã giới thiệu',
  CCCD: 'Số CCCD',
  CMND: 'Số CMND',
  Passport: 'Số hộ chiếu',
  OTP: 'Mã xác thực',
  userName: 'Tên đăng nhập',
  password: 'Mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  expiryDate: 'Ngày hết hạn',
};

export const requiedFormInfor = {
  dod: 'Vui lòng nhập ngày sinh',
  licenseDate: 'Vui lòng nhập ngày cấp',
  licensePlace: 'Vui lòng nhập nơi cấp',
  permanentAddr: 'Vui lòng nhập địa chỉ',
  phone: 'Vui lòng nhập số điện thoại',
  email: 'Vui lòng nhập email',
  phoneWrong: 'Số điện thoại không chính xác',
  emailWrong: 'Email không chính xác',
  isRegCard: 'Vui lòng chấp nhận điều khoản',
  customerName: 'Vui lòng nhập họ và tên',
  license: 'Vui lòng nhập số CMND',
  CCCD: 'Vui lòng nhập số CCCD',
  CMND: 'Vui lòng nhập số  CMND',
  Passport: 'Vui lòng nhập số chiếu',
  OTP: 'Vui lòng nhập mã xác thực',
  userName: 'Vui lòng nhập tên đăng nhập',
  password: 'Vui lòng nhập mật khẩu',
  confirmPassword: 'Vui lòng nhập xác nhận mật khẩu',
  expiryDate: 'Vui lòng chọn ngày hết hạn',
};

export const optionSelect = [
  { key: '0', value: 'Chứng minh nhân dân' },
  { key: '1', value: 'Căn cước công dân' },
  { key: '2', value: 'Hộ chiếu' },
];

export const optionCity = [
  {
    value: 'Hồ Chí Minh',
    key: '79',
  },
  {
    value: 'Đà Nẵng',

    key: '48',
  },
  {
    value: 'Hà Nội',

    key: '01',
  },
  {
    value: 'Hà Giang',

    key: '02',
  },
  {
    value: 'Cao Bằng',

    key: '04',
  },
  {
    value: 'Bắc Kạn',

    key: '06',
  },
  {
    value: 'Tuyên Quang',

    key: '08',
  },
  {
    value: 'Lào Cai',

    key: '10',
  },
  {
    value: 'Điện Biên',

    key: '11',
  },
  {
    value: 'Lai Châu',

    key: '12',
  },
  {
    value: 'Sơn La',

    key: '14',
  },
  {
    value: 'Yên Bái',

    key: '15',
  },
  {
    value: 'Hòa Bình',

    key: '17',
  },
  {
    value: 'Thái Nguyên',

    key: '19',
  },
  {
    value: 'Lạng Sơn ',

    key: '20',
  },
  {
    value: 'Quảng Ninh ',

    key: '22',
  },
  {
    value: 'Bắc Giang',

    key: '24',
  },
  {
    value: 'Phú Thọ',

    key: '25',
  },
  {
    value: 'Vĩnh Phúc',

    key: '26',
  },
  {
    value: 'Bắc Ninh',

    key: '27',
  },
  {
    value: 'Hải Dương',

    key: '30',
  },
  {
    value: 'Hải Phòng',

    key: '31',
  },
  {
    value: 'Hưng Yên',

    key: '33',
  },
  {
    value: 'Thái Bình',

    key: '34',
  },
  {
    value: 'Hà Nam',

    key: '35',
  },
  {
    value: 'Nam Định',

    key: '36',
  },
  {
    value: 'Ninh Bình',

    key: '37',
  },
  {
    value: 'Thanh Hóa',

    key: '38',
  },
  {
    value: 'Nghệ An',

    key: '40',
  },
  {
    value: 'Hà Tĩnh',

    key: '42',
  },
  {
    value: 'Quảng Bình',

    key: '44',
  },
  {
    value: 'Quảng Trị',

    key: '45',
  },
  {
    value: 'Thừa Thiên Huế',

    key: '46',
  },
  {
    value: 'Quảng Nam',

    key: '49',
  },
  {
    value: 'Quảng Ngãi',

    key: '51',
  },
  {
    value: 'Bình Định',

    key: '52',
  },
  {
    value: 'Phú Yên',
    key: '54',
  },
  {
    value: 'Khánh Hòa',

    key: '56',
  },
  {
    value: 'Ninh Thuận',

    key: '58',
  },
  {
    value: 'Bình Thuận',

    key: '60',
  },
  {
    value: 'Kontum',

    key: '62',
  },
  {
    value: 'Gia Lai',

    key: '64',
  },
  {
    value: 'Đaklak',

    key: '66',
  },
  {
    value: 'Dak Nông',

    key: '67',
  },
  {
    value: 'Lâm Đồng',

    key: '68',
  },
  {
    value: 'Bình Phước',

    key: '70',
  },
  {
    value: 'Tây Ninh',

    key: '72',
  },
  {
    value: 'Bình Dương',

    key: '74',
  },
  {
    value: 'Đồng Nai',

    key: '75',
  },
  {
    value: 'Bà Rịa – Vũng Tàu ',

    key: '77',
  },
  {
    value: 'Long An',

    key: '80',
  },
  {
    value: 'Tiền Giang',

    key: '82',
  },
  {
    value: 'Bến Tre',

    key: '83',
  },
  {
    value: 'Trà Vinh',

    key: '84',
  },
  {
    value: 'Vĩnh Long',

    key: '86',
  },
  {
    value: 'Đồng Tháp',

    key: '87',
  },
  {
    value: 'An Giang',

    key: '89',
  },
  {
    value: 'Kiên Giang',

    key: '91',
  },
  {
    value: 'Cần Thơ',

    key: '92',
  },
  {
    value: 'Hậu Giang',

    key: '93',
  },
  {
    value: 'Sóc Trăng',

    key: '94',
  },
  {
    value: 'Bạc Liêu',

    key: '95',
  },
  {
    value: 'Cà Mau',

    key: '96',
  },
];
export const optionSelectSex = [
  { key: '1', value: 'Nam' },
  { key: '0', value: 'Nữ' },
];

export const optionSelectNationality = [{ key: '704', value: 'Việt Nam' }];

export interface IRegisterLicenseComponent {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBackRegisterOTP: (step: VIEW_REGISTER_VTM) => void;
  loading?: boolean;
}

export interface IRegisterInformationComponent {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBackRegisterOTP: (step: VIEW_REGISTER_VTM) => void;
  loading?: boolean;
}
