import { type MouseEventHandler } from 'react';

import BrandImg from '@/assets/images/kyc/brand.png';
import RetailerImg from '@/assets/images/kyc/retailer.png';
import { Localize } from '@/context/languages';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { type IProfile } from '@/utils/Auth';
import { EnumUserRole } from '@/utils/Enums';

interface ISelectRoleView {
  loading: boolean;
  profileDetails: IProfile;
  handleSelectRole: (role: number) => void;
}

const SelectRoleView = (props: ISelectRoleView) => {
  const { profileDetails, handleSelectRole } = props;
  const SelectRouteOption = (params: {
    name?: string;
    image?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
  }) => {
    const { name = '', image = '', onClick = () => null, disabled = false } = params;
    return (
      <div
        className={`border border-solid border-primary-border rounded-2xl flex items-center gap-6 px-7 py-3 cursor-pointer hover:bg-primary-border`}
        style={{
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        onClick={onClick}>
        <div className='w-20 h-20'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-covers'
          />
        </div>
        <span className='font-medium text-2xl'>
          <Localize tid={name} />
        </span>
      </div>
    );
  };
  return (
    <div className='flex flex-column gap-4 h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='selectRole' />
      </div>
      <div
        className='pb-28 flex flex-column gap-5'
        style={{
          width: 320,
        }}>
        <SelectRouteOption
          name='brand'
          image={BrandImg}
          onClick={() => {
            handleSelectRole(EnumUserRole.BRAND);
          }}
          // disabled={!profileDetails.isBrand}
          // open when has flow for role brand;
          disabled={true}
        />
        <SelectRouteOption
          name='retailer'
          image={RetailerImg}
          onClick={() => {
            handleSelectRole(EnumUserRole.RETAILER);
          }}
          disabled={!profileDetails.isRetailer}
        />
      </div>
    </div>
  );
};
export { SelectRoleView };
