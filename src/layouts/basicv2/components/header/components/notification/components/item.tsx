import { Avatar, CardBody } from '@progress/kendo-react-layout';
import React from 'react';

import { Helper } from '@/utils/Helper';

import { type IResponseNotification } from '../types';

interface IItemNotification {
  notification: IResponseNotification;
  onToggleNotification: (notificationId: string) => void;
}

const ItemNotification: React.FC<IItemNotification> = ({ notification, onToggleNotification }) => {
  return (
    <div
      onClick={() => {
        onToggleNotification(notification.notificationId);
      }}>
      <CardBody className='flex hover:bg-neutral-30 cursor-pointer'>
        <Avatar type='icon'>
          <span className='k-icon k-i-inbox' />
        </Avatar>
        <div className='flex flex-column gap-3 w-80 pl-5'>
          <div className='flex flex-column'>
            <span className='text-neutral-100'>{notification.title}</span>
            <div
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              className='pr-4 w-64'>
              <span className='text-xs text-neutral-80'>{notification.contentLong}</span>
            </div>
            <span className='text-xs text-neutral-100'>{notification.contentShort}</span>
          </div>
          <div>
            <span className='text-neutral-100 font-medium'>
              {Helper.convertToHourMinusSecond(notification.sendTime)}
            </span>
            <span className='text-xs pl-2'>( {Helper.formatDate(notification.sendTime)} )</span>
          </div>
        </div>
        <div className='flex items-center'>
          <span className='k-icon k-i-more-horizontal' />
        </div>
      </CardBody>
    </div>
  );
};

export default ItemNotification;
