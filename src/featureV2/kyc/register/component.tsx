import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import DeviceService from '@/utils/Device';
import {
  EnumGender,
  EnumGenderKhmer,
  EnumNationalIDType,
  EnumPath,
  STATUS_YES_NO,
  TYPE_UPLOAD_FILE,
} from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import {
  type IDataOCRBusinessLicense,
  type IDataOCRIdCard,
  type IPayloadRegisterComponent,
  type IResponseUpload,
  SELECT_ROLE,
  VIEW_REGISTER,
} from './type';
import View from './view';
interface IRegisterComponent {
  apiUpload: IApiRequest;
  apiRegister: IApiRequest;
}
enum ACTION_API {
  NULL = 0,
  UPLOAD,
  CREATE,
}
interface IStateRegisterComponent {
  action: ACTION_API;

  fileUpload: {
    photo: any;
    cover: any;
    nationalIDFront: any;
    nationalIDBack: any;
  };

  dataForm: IPayloadRegisterComponent;
  loading: {
    loadingCreate: boolean;
  };
  api: IApiRequest;
}

const RegisterComponent: FC<IRegisterComponent> = ({ apiRegister, apiUpload }) => {
  const initialState: IStateRegisterComponent = {
    action: ACTION_API.NULL,

    dataForm: {
      password: '',
      nationalID: '',
      nationalIDType: EnumNationalIDType.CCCD,
      nationalIDFront: '',
      nationalIDBack: '',
      name: '',
      gender: EnumGender.FEMALE,
      dob: '',
      email: '',
      contactAddress: '',
      token: '',
      device: DeviceService.getDevice(),
      retailer: {
        companyName: '',
        registeredAt: '',
        under: '',
        formOfEnterprise: '',
        mainBusiness: '',
        nationalityLicense: '',
        nameOwner: '',
        taxNumber: '',
        residence: '',
        phone: '',
        classification: '',
        license: '',
        countryCode: '',
        cityCode: '',
        districtCode: '',
        wardCode: '',
        name: '',
        address: '',
        cover: {
          files: [],
          imagesDefault: [],
        },
        photo: {
          files: [],
          imagesDefault: [],
        },
      },
    },
    loading: {
      loadingCreate: false,
    },
    api: apiRegister,
    fileUpload: {
      photo: undefined,
      cover: undefined,
      nationalIDFront: undefined,
      nationalIDBack: undefined,
    },
  };
  const [view, setView] = useState<VIEW_REGISTER>(VIEW_REGISTER.REGISTER_OTP);
  const [responseSuccess, setResponseSuccess] = useState<any>({});
  const [state, setState] = useState<IStateRegisterComponent>(initialState);
  const navigate = useNavigate();
  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('RegisterComponent execute handleGetResponse receive response', response);

      switch (response.view) {
        case VIEW_REGISTER.REGISTER_OTP:
          setView(VIEW_REGISTER.SEND_OTP);
          setResponseSuccess({ ...responseSuccess, responseSuccessRegisterOTP: response.data });

          break;
        case VIEW_REGISTER.SEND_OTP:
          setView(VIEW_REGISTER.REGISTER);
          setResponseSuccess({ ...responseSuccess, responseSuccessSendOTP: response.data });
          setState({
            ...state,
            dataForm: {
              ...state.dataForm,
              token: response.data.token,
            },
          });
          break;
        case VIEW_REGISTER.REGISTER:
          setResponseSuccess({ ...responseSuccess, dataStepRegister: response.data });
          if (responseSuccess.responseSuccessSendOTP.activateAccount === STATUS_YES_NO.NO) {
            setState({
              ...state,
              dataForm: {
                ...state.dataForm,
                password: response.data.password,
                email: response.data.email,
              },
            });
            setView(VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT);
          } else {
            setState({
              ...state,
              dataForm: {
                ...state.dataForm,
                password: response.data.password,
              },

              loading: {
                loadingCreate: true,
              },
              api: apiRegister,
              action: ACTION_API.CREATE,
            });
          }

          break;
        case VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT:
          if (response.data) {
            // eslint-disable-next-line no-case-declarations
            const dataOCR: IDataOCRIdCard = response.data;
            setState({
              ...state,
              dataForm: {
                ...state.dataForm,
                contactAddress: dataOCR.address,
                gender: dataOCR.sex === EnumGenderKhmer.MALE ? EnumGender.MALE : EnumGender.FEMALE,
                name: dataOCR.eng_name,
                nationalID: dataOCR.card_id,
                nationalIDType: EnumNationalIDType.NATIONAL_ID,
                dob: Helper.dateTimeToMillisecondsKhmer(dataOCR.birth_date),
              },
              fileUpload: {
                ...state.fileUpload,
                nationalIDFront: response.data.nationalIDFront,
                nationalIDBack: response.data.nationalIDBack,
              },
            });
          }

          setView(VIEW_REGISTER.INFO_ACCOUNT);
          setResponseSuccess({ ...responseSuccess, dataOCRLicenseAccount: response.data });
          break;
        case VIEW_REGISTER.INFO_ACCOUNT:
          setState({
            ...state,
            dataForm: {
              ...state.dataForm,
              contactAddress: response.data.contactAddress,
              gender: response.data.gender.id,
              name: response.data.name,
              nationalID: response.data.nationalID,
              nationalIDType: response.data.nationalIDType.id,
              dob: Helper.dateTimeToMilliseconds(response.data.dob),
            },
            fileUpload: {
              ...state.fileUpload,
              nationalIDFront: !response.data.nationalIDFront.files[0]
                ? responseSuccess.dataOCRLicenseAccount?.nationalIDFront
                : response.data.nationalIDFront.files[0],
              nationalIDBack: !response.data.nationalIDBack.files[0]
                ? responseSuccess.dataOCRLicenseAccount?.nationalIDBack
                : response.data.nationalIDBack.files[0],
            },
          });
          setResponseSuccess({ ...responseSuccess, dataStepInfoAccount: response.data });

          setView(VIEW_REGISTER.SELECT_ROLE);
          break;
        case VIEW_REGISTER.SELECT_ROLE:
          // eslint-disable-next-line no-case-declarations
          const dataOCRBusiness: IDataOCRBusinessLicense = response.data.dataOCR;
          if (response.data.dataOCR && state.dataForm.retailer) {
            setState({
              ...state,
              dataForm: {
                ...state.dataForm,
                retailer: {
                  ...state.dataForm.retailer,
                  companyName: dataOCRBusiness.COMPANY_NAME[0],
                  registeredAt: dataOCRBusiness.REGISTERED_AT[0],
                  under: dataOCRBusiness.UNDER[0],
                  formOfEnterprise: dataOCRBusiness.NATIONALITY[0],
                  mainBusiness: dataOCRBusiness.MAIN_BUSINESS_ACTIVITY[0],
                  nationalityLicense: dataOCRBusiness.REGISTERED_AT[0],
                  nameOwner: dataOCRBusiness.OWNER_NAME[0],
                  taxNumber: dataOCRBusiness.TAX_NUMBER[0],
                  residence: dataOCRBusiness.REPRESENTED_BY[0],
                  address: dataOCRBusiness.ADDRESS[0],
                },
              },
            });
          }
          setView(VIEW_REGISTER.INFO_BY_ROLE);
          setResponseSuccess({ ...responseSuccess, dataOCRLicenseBusiness: response.data });
          break;
        case VIEW_REGISTER.INFO_BY_ROLE:
          setResponseSuccess({ ...responseSuccess, dataStepInfoByRole: response.data });

          if (responseSuccess.responseSuccessSendOTP.activateAccount === STATUS_YES_NO.NO) {
            if (responseSuccess.dataOCRLicenseBusiness.selectRole === SELECT_ROLE.RETAILER) {
              setState({
                ...state,
                dataForm: {
                  ...state.dataForm,
                  retailer: response.data.retailer,
                  brand: undefined,
                },
                fileUpload: {
                  ...state.fileUpload,
                  cover: response.data.retailer.cover && response.data.retailer.cover,
                  photo: response.data.retailer.cover && response.data.retailer.photo,
                },
                api: apiUpload,
                action: ACTION_API.UPLOAD,
                loading: {
                  loadingCreate: true,
                },
              });
            } else {
              setState({
                ...state,
                dataForm: {
                  ...state.dataForm,
                  retailer: undefined,
                  brand: response.data.brand,
                },

                api: apiUpload,
                action: ACTION_API.UPLOAD,
                loading: {
                  loadingCreate: true,
                },
              });
            }
          } else {
            setState({
              ...state,
              api: apiRegister,
              action: ACTION_API.CREATE,
              loading: {
                loadingCreate: true,
              },
            });
          }

          break;
        default:
          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleGetResponseSuccess receive error', error);
    }
  };

  const funcRequestRegister = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('RetailerCreateComponent execute handleRequestSuccess receive list', data);
        switch (state.action) {
          case ACTION_API.CREATE:
            setState({
              ...state,
              loading: {
                loadingCreate: false,
              },
            });
            toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='account.registerSuccessfully' />);
            navigate(EnumPath.LOGIN);
            break;
          case ACTION_API.UPLOAD: {
            const res: IResponseUpload[] = data.files;
            const nationalIDFront = res.find(item => item.name === 'nationalIDFront');
            const nationalIDBack = res.find(item => item.name === 'nationalIDBack');
            if (nationalIDFront && nationalIDBack) {
              if (responseSuccess.dataOCRLicenseBusiness.selectRole === SELECT_ROLE.RETAILER) {
                const photoLink = res.find(item => item.name === 'photo');
                const coverLink = res.find(item => item.name === 'cover');
                if (photoLink && coverLink && state.dataForm.retailer) {
                  setState({
                    ...state,
                    dataForm: {
                      ...state.dataForm,
                      nationalIDFront: nationalIDFront.link,
                      nationalIDBack: nationalIDBack.link,
                      retailer: {
                        ...state.dataForm.retailer,
                        photo: photoLink?.link,
                        cover: coverLink?.link,
                      },
                    },

                    api: apiRegister,
                    action: ACTION_API.CREATE,
                    loading: {
                      loadingCreate: true,
                    },
                  });
                }
              } else {
                setState({
                  ...state,
                  dataForm: {
                    ...state.dataForm,
                    nationalIDFront: nationalIDFront.link,
                    nationalIDBack: nationalIDBack.link,
                  },
                  api: apiRegister,
                  action: ACTION_API.CREATE,
                  loading: {
                    loadingCreate: true,
                  },
                });
              }
            }

            break;
          }
          default:
            break;
        }
      } catch (error: any) {
        LoggerService.error('RetailerCreateComponent execute handleRequestSuccess receive error', error);
      }
    },
  };
  const { mutate } = useRequest(state.api, funcRequestRegister);
  useEffect(() => {
    switch (state.action) {
      case ACTION_API.CREATE: {
        Helper.hashPassword(state.dataForm.password).then(password => {
          const payload: IPayloadRegisterComponent = state.dataForm;
          payload.password = password;

          const payloadActivate = {
            token: responseSuccess.responseSuccessSendOTP.token,
            device: DeviceService.getDevice(),
            password,
          };
          mutate(
            responseSuccess.responseSuccessSendOTP.activateAccount === STATUS_YES_NO.NO ? payload : payloadActivate,
          );
        });
        break;
      }
      case ACTION_API.UPLOAD: {
        if (state.fileUpload?.nationalIDBack && state.fileUpload.nationalIDFront) {
          const formData = new FormData();

          formData.append('type', `${TYPE_UPLOAD_FILE.LS_ACCOUNT_LICENSE}`);
          for (const [key, value] of Object.entries(state.fileUpload)) {
            formData.append(key, value);
          }
          mutate(formData);
        }
        break;
      }
      default:
        break;
    }
  }, [state.action]);

  const handleBack = (step: VIEW_REGISTER) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleBack receive error', error);
    }
  };
  return (
    <View
      loading={state.loading.loadingCreate}
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
      view={view}
      responseSuccess={responseSuccess}
    />
  );
};

export default RegisterComponent;
