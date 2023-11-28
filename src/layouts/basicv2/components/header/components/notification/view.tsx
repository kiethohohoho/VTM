import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { CardHeader } from '@progress/kendo-react-layout';
import React from 'react';

import { PopupRoot } from '@/core2/popup';

import ItemNotification from './components/item';
import SkeletonNotification from './components/skeleton';
import { type IResponseNotification } from './types';

interface IViewNotification {
  show: boolean;
  isShowSeeMore: boolean;
  onTogglePopup: () => void;
  onToggleNotification: (notificationId: string) => void;
  onToggleSeeMore: () => void;
  listNotification: IResponseNotification[];
  totalUnread: number;
  loading: boolean;
}

const ViewNotification: React.FC<IViewNotification> = ({
  onTogglePopup,
  show,
  isShowSeeMore,
  listNotification,
  totalUnread,
  loading,
  onToggleSeeMore,
  onToggleNotification,
}) => {
  const anchor = React.useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <button
        ref={anchor}
        onClick={onTogglePopup}
        className='bg-transparent border-none cursor-pointer hover:bg-neutral-40 h-6 w-6 rounded-full flex justify-center items-center'>
        <BadgeContainer>
          <span className='k-icon k-i-notification '>
            <Badge
              themeColor={'warning'}
              shape='dot'>
              {totalUnread}
            </Badge>
          </span>
        </BadgeContainer>
      </button>
      <PopupRoot
        onClose={onTogglePopup}
        className={'mt-5 ml-10'}
        show={show}
        anchor={anchor.current}>
        <div className='w-96'>
          <CardHeader className='flex justify-between'>
            <div className='font-bold'>Notification</div>
            {isShowSeeMore && (
              <div
                className='text-xs'
                onClick={onToggleSeeMore}>
                See more
              </div>
            )}
          </CardHeader>
          <div
            className='overflow-y-auto scroll'
            style={{
              maxHeight: '480px',
            }}>
            {loading ? (
              <SkeletonNotification />
            ) : (
              listNotification.map((notification, idx) => (
                <ItemNotification
                  onToggleNotification={onToggleNotification}
                  notification={notification}
                  key={idx.toString() + 'Popup'}
                />
              ))
            )}
          </div>
        </div>
      </PopupRoot>
    </div>
  );
};

export default ViewNotification;
