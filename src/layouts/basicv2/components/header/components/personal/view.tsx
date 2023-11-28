import { Avatar, CardHeader } from '@progress/kendo-react-layout';
import React from 'react';

import { ButtonRoot } from '@/core2/button';
import { PopupRoot } from '@/core2/popup';
import { EnumPath } from '@/utils/Enums';

interface IListPerson {
  icon: string;
  label: string;
  path: string;
}

const listPerson: IListPerson[] = [
  {
    icon: 'user',
    label: 'Profile',
    path: EnumPath.PROFILE,
  },
  {
    icon: 'toggle-full-screen-mode',
    label: 'Device',
    path: EnumPath.DEVICE,
  },
];

interface IViewPersonal {
  show: boolean;
  onTogglePopup: () => void;
  onRedirect: (path: string) => void;
  onLogout: () => void;
  profile: any;
}
const ViewPersonal: React.FC<IViewPersonal> = ({ onTogglePopup, show, onRedirect, onLogout, profile }) => {
  const anchor = React.useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <button
        ref={anchor}
        className='w-fit p-0 rounded-full cursor-pointer'
        onClick={onTogglePopup}>
        <Avatar type='image'>
          <img
            src={'https://i.pinimg.com/564x/77/d0/46/77d046216aed031dae02543b9ee2ac79.jpg'}
            alt='Avatar user'
          />
        </Avatar>
      </button>
      <PopupRoot
        style={{
          marginTop: '14px',
        }}
        className='ml-4'
        show={show}
        onClose={onTogglePopup}
        anchor={anchor.current}>
        <div className='w-64'>
          <CardHeader>
            <div className='flex flex-column gap-2 justify-center items-center py-3'>
              <Avatar
                size={'large'}
                type='image'>
                <img
                  src={'https://i.pinimg.com/564x/77/d0/46/77d046216aed031dae02543b9ee2ac79.jpg'}
                  alt='Avatar user'
                />
              </Avatar>
              <span className='text-md font-bold'>{profile?.cusName}</span>
            </div>
          </CardHeader>
          <ul className='my-0 list-none p-0'>
            {listPerson.map((item, indx) => (
              <li
                onClick={() => {
                  onRedirect(item.path);
                }}
                key={ViewPersonal.name + indx.toString()}
                className='h-10 flex gap-2 items-center hover:bg-neutral-20 px-4 cursor-pointer'>
                <span className={`k-icon k-i-${item.icon}`} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className='border-t border-neutral-30 border-solid p-4'>
            <ButtonRoot
              onClick={onLogout}
              className='w-full'
              themeColor={'base'}
              size={'small'}
              icon='logout'>
              <span className='px-2'>Sign Out</span>
            </ButtonRoot>
          </div>
        </div>
      </PopupRoot>
    </div>
  );
};

export default ViewPersonal;
