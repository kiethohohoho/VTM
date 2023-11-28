import React, { useEffect } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet, useRequest } from '@/api/api.middleware';
import { type IFilter } from '@/core2/table/request';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import Firebase from '@/firebase/index';
import DeviceService from '@/utils/Device';
import { From, Limit, Order, OrderBy, TYPE_NOTIFICATION } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IResponseNotification } from './types';
import ViewNotification from './view';

interface IStateNotification {
  payload: IFilter;
  res: { list: IResponseNotification[]; total: number };
  totalUnread: number;
  loading: boolean;
}
const initialState: IStateNotification = {
  payload: {
    order: Order.CREATED_AT,
    by: OrderBy.DESC,
    from: From.DEFAULT,
    limit: 0,
    filter: 'notification.type',
    filterValue: TYPE_NOTIFICATION.ORDER.toString(),
  },
  res: { list: [], total: 0 },
  totalUnread: 0,
  loading: false,
};
interface IStatePopupNotification {
  show: boolean;
}
const initialStatePopup: IStatePopupNotification = {
  show: false,
};

interface IComponentNotification {
  apiNotification: IApiRequest;
  apiSeen: IApiRequest;
  apiPushKey: IApiRequest;
}
const ComponentNotification: React.FC<IComponentNotification> = ({ apiNotification, apiPushKey, apiSeen }) => {
  const [state, setState] = React.useState<IStateNotification>(initialState);
  const [statePopup, setStatePopup] = React.useState<IStatePopupNotification>(initialStatePopup);

  const funcRequest = {
    handleRequestSuccess: (data: { queryResponse: { list: any[]; total: number }; totalUnread: number }) => {
      try {
        let { res, totalUnread, payload } = state;
        res = data.queryResponse || initialState.res;
        totalUnread = data.totalUnread;
        payload.limit += Limit.DEFAULT;
        setState(s => ({ ...s, res, totalUnread, payload, loading: false }));
      } catch (error: any) {
        LoggerService.error('HeaderNotificationComponent execute handleRequestSuccess', error);
      }
    },
  };
  const callbackFunc = {
    handleRequestSuccess: () => {
      try {
        refetch();
      } catch (error: any) {
        LoggerService.error('HeaderNotificationComponent execute handleRequestSuccess', error);
      }
    },
  };
  const { refetch } = useGet(
    {
      ...apiNotification,
      ...{ payload: { ...state.payload, limit: state.payload.limit + Limit.DEFAULT } },
    },
    funcRequest,
  );
  useEffect(() => {
    refetch();
  }, [state.payload.filterValue]);
  const handleLoadMore = () => {
    const { payload, res } = state;
    setState(prev => {
      return {
        ...prev,
        loading: true,
      };
    });
    if (res.total > payload.limit) {
      refetch();
    }
  };
  useEffect(() => {
    Firebase.onMessageListener()
      .then(payload => {
        refetch();
        if (Notification.permission === 'granted') {
          toastDefault(ENUMS_TOAST.SUCCESS, payload);
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);
  const funcPushKey = {
    handleRequestSuccess: () => {
      LoggerService.info('Push key successfully');
    },
  };
  const { mutate: mutatePushKey } = useRequest(apiPushKey, funcPushKey);
  const handlePushKey = async () => {
    const deviceKey = DeviceService.getDeviceKey();
    const pushKey = DeviceService.getPushKey() || '-';
    mutatePushKey({ deviceKey, pushKey });
  };
  useEffect(() => {
    handlePushKey();
  }, []);

  useEffect(() => {
    let pushKey = DeviceService.getPushKey();
    const notification = async () => {
      await Notification.requestPermission()
        .then(async permission => {
          if (permission === 'granted') {
            pushKey = await Firebase.getPushKey();
            DeviceService.setPushKey(pushKey);
            handlePushKey();
          }
        })
        .catch((error: any) => {
          LoggerService.error(`Notification.requestPermission`, error.toString());
        });
    };
    if (Helper.isEmpty(pushKey) && Helper.getMobileOperatingSystem() === 'unknown') {
      notification();
    }
  }, []);

  const { mutate } = useRequest(apiSeen, callbackFunc);

  const handleReadNotification = (notificationId: string) => {
    mutate({ notificationId });
    setState(prev => {
      return {
        ...prev,
        loading: true,
      };
    });
  };
  const handleTogglePopup = () => {
    setStatePopup(prev => {
      return {
        show: !prev?.show,
      };
    });
  };

  return (
    <ViewNotification
      loading={state.loading}
      isShowSeeMore={state.res.total > state.payload.limit}
      onToggleSeeMore={handleLoadMore}
      onToggleNotification={handleReadNotification}
      totalUnread={state.totalUnread}
      listNotification={state.res.list}
      onTogglePopup={handleTogglePopup}
      show={statePopup?.show}
    />
  );
};

export default ComponentNotification;
