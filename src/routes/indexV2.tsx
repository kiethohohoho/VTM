import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import FeatureComponent from '@/features';
import ForgotPasswordComponent from '@/featureV2/kyc/forgotPassword/component';
import LoginComponent from '@/featureV2/kyc/login/component';
import RegisterComponent from '@/featureV2/kyc/register';
import ResetPasswordComponent from '@/featureV2/kyc/resetPassword';
import RegisterStaffIndex from '@/featureV2/staff/invite/registerStaff';
import AuthLayoutComponent from '@/layouts/auth2';
import { EnumPath } from '@/utils/Enums';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
const Dashboard = React.lazy(async () => await import('@/featureV2/dashboard'));
const Profile = React.lazy(async () => await import('@/featureV2/personal/profile'));
const ListConsumerComponent = React.lazy(async () => await import('@/featureV2/customer/consumer/list'));
const CreateConsumerComponent = React.lazy(async () => await import('@/featureV2/customer/consumer/create'));
const DetailConsumerComponent = React.lazy(async () => await import('@/featureV2/customer/consumer/detail'));
const ListDeviceComponent = React.lazy(async () => await import('@/featureV2/personal/device/list'));
const DetailDeviceComponent = React.lazy(async () => await import('@/featureV2/personal/device/detail'));
// const ListOrderComponent = React.lazy(async () => await import('@/featureV2/order/orderO2O/listOrder'));
const DetailOrderComponent = React.lazy(async () => await import('@/featureV2/order/orderO2O/detailOrder'));
const OrderComponent = React.lazy(async () => await import('@/featureV2/order'));

const ProductComponent = React.lazy(async () => await import('@/featureV2/product'));
const CreateYourProductComponent = React.lazy(async () => await import('@/featureV2/product/yourProduct/create'));
const DetailLSProductComponent = React.lazy(async () => await import('@/featureV2/product/lsProduct/detail'));
const ListStaffComponent = React.lazy(async () => await import('@/featureV2/staff'));
const POSComponent = React.lazy(async () => await import('@/featureV2/pos'));

const rootRoutes = createBrowserRouter([
  {
    path: '/',
    element: <FeatureComponent />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute
            role={[]}
            children={<Dashboard />}
          />
        ),
      },
      {
        path: EnumPath.PROFILE,
        element: (
          <PrivateRoute
            role={[]}
            children={<Profile />}
          />
        ),
      },
      {
        path: EnumPath.CONSUMER,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListConsumerComponent />}
          />
        ),
      },
      {
        path: EnumPath.CONSUMER_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateConsumerComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.CONSUMER}/:consumerId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailConsumerComponent />}
          />
        ),
      },
      {
        path: EnumPath.DEVICE,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListDeviceComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.DEVICE}/:deviceId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailDeviceComponent />}
          />
        ),
      },
      {
        path: EnumPath.PRODUCT,
        element: (
          <PrivateRoute
            role={[]}
            children={<ProductComponent />}
          />
        ),
      },
      {
        path: EnumPath.CREATE_YOUR_PRODUCT,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateYourProductComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.PRODUCT}/:productDictionaryId/:storeId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailLSProductComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER,
        element: (
          <PrivateRoute
            role={[]}
            children={<OrderComponent />}
          />
        ),
      },
      {
        path: EnumPath.DETAIL_ORDER,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailOrderComponent />}
          />
        ),
      },

      {
        path: EnumPath.STAFF,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListStaffComponent />}
          />
        ),
      },
      {
        path: EnumPath.GROUP_STAFF_INVITE_STAFF,
        element: (
          <PublicRoute
            isCheckMobile={true}
            role={[]}
            children={<RegisterStaffIndex />}
          />
        ),
      },
      {
        path: EnumPath.POS,
        element: (
          <PublicRoute
            isCheckMobile={true}
            role={[]}
            children={<POSComponent />}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayoutComponent />,
    children: [
      {
        path: EnumPath.LOGIN,
        element: <PublicRoute children={<LoginComponent />} />,
      },
      {
        path: EnumPath.FORGOT_PASSWORD,
        element: <PublicRoute children={<ForgotPasswordComponent />} />,
      },
      {
        path: EnumPath.RESET_PASSWORD,
        element: <PublicRoute children={<ResetPasswordComponent />} />,
      },
      {
        path: EnumPath.REGISTER,
        element: <PublicRoute children={<RegisterComponent />} />,
      },
    ],
  },
  // {
  //   path: '/',
  //   element: <AuthLayoutComponent />,
  //   children: [
  //     {
  //       path: EnumPath.LOGIN,
  //       element: <PublicRoute children={<LoginComponent />} />,
  //     },
  //     {
  //       path: EnumPath.FORGOT_PASSWORD,
  //       element: <PublicRoute children={<ForgotPasswordComponent />} />,
  //     },
  //     {
  //       path: EnumPath.RESET_PASSWORD,
  //       element: <PublicRoute children={<ResetPasswordComponent />} />,
  //     },
  //     {
  //       path: EnumPath.REGISTER,
  //       element: <PublicRoute children={<RegisterComponent />} />,
  //     },
  //   ],
  // },
]);

export { rootRoutes };
