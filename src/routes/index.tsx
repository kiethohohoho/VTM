/** * @author: Thuy Phan */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import FeatureComponent from '@/features';
import ForgotPasswordComponent from '@/features/kyc/forgotPassword';
import LoginComponent from '@/features/kyc/login';
import RegisterComponent from '@/features/kyc/register';
import ResetPasswordComponent from '@/features/kyc/resetPassword';
import AuthLayout from '@/layouts/auth2';
import { EnumPath } from '@/utils/Enums';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
const NoPermission = React.lazy(async () => await import('@/core2/notfound'));
const Notfound = React.lazy(async () => await import('@/core2/notfound'));
const CreateCategoryComponent = React.lazy(async () => await import('@/features/category/create'));
const DetailCategoryComponent = React.lazy(async () => await import('@/features/category/detail'));
const ListCategoryInStoreComponent = React.lazy(async () => await import('@/features/category/listCategoryInStore'));
const ListCategoryO2OComponent = React.lazy(async () => await import('@/features/category/listCategoryO2O'));
const CreateConsumerComponent = React.lazy(async () => await import('@/features/consumer/create'));
const DetailConsumerComponent = React.lazy(async () => await import('@/features/consumer/detail'));
const ListConsumerComponent = React.lazy(async () => await import('@/features/consumer/list'));
const Dashboard = React.lazy(async () => await import('@/features/dashboard'));
const DetailDeviceComponent = React.lazy(async () => await import('@/features/device/detail'));
const ListDeviceComponent = React.lazy(async () => await import('@/features/device/list'));
const CreateGroupStaffComponent = React.lazy(async () => await import('@/features/group/create'));
const DetailGroupStaffComponent = React.lazy(async () => await import('@/features/group/detail'));
const InviteStaff = React.lazy(async () => await import('@/features/group/detail/infoStaffByID/addStaff/inviteStaff'));
const RegisterStaff = React.lazy(
  async () => await import('@/features/group/detail/infoStaffByID/addStaff/registerStaff'),
);
const ListGroupStaffComponent = React.lazy(async () => await import('@/features/group/list'));
const CreateOrderComponent = React.lazy(async () => await import('@/features/order/create'));
const DetailOrderO2OComponent = React.lazy(async () => await import('@/features/order/detailOrderO2O'));
const ListOrderComponent = React.lazy(async () => await import('@/features/order/list'));
const ListOrderO2OComponent = React.lazy(async () => await import('@/features/order/listOrderFromO2O'));
const OrderPaymentComponent = React.lazy(async () => await import('@/features/order/payment'));
const DetailProductInventoryComponent = React.lazy(async () => await import('@/features/productInventory/detail'));
const ListProductInventoryComponent = React.lazy(async () => await import('@/features/productInventory/list'));
const ListProductToO2OComponent = React.lazy(async () => await import('@/features/productInventory/publishO2O'));
const Profile = React.lazy(async () => await import('@/features/profile'));
const CreateStoreComponent = React.lazy(async () => await import('@/features/store/create'));
const DetailStoreComponent = React.lazy(async () => await import('@/features/store/detail'));
const ListRetailerComponent = React.lazy(async () => await import('@/features/store/list'));
const UpdateStoreComponent = React.lazy(async () => await import('@/features/store/update'));
const CreateWarehouseComponent = React.lazy(async () => await import('@/features/warehouse/create'));
const DetailWarehouseComponent = React.lazy(async () => await import('@/features/warehouse/detail'));
const ListWarehouseComponent = React.lazy(async () => await import('@/features/warehouse/list'));

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
        path: EnumPath.STORE,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListRetailerComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.STORE_DETAIL}/:storeId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailStoreComponent />}
          />
        ),
      },
      {
        path: EnumPath.STORE_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateStoreComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.STORE_UPDATE}/:storeId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<UpdateStoreComponent />}
          />
        ),
      },
      {
        path: EnumPath.GROUP_STAFF,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListGroupStaffComponent />}
          />
        ),
      },
      {
        path: EnumPath.GROUP_STAFF_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateGroupStaffComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.GROUP_STAFF_DETAIL}/:groupStaffId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailGroupStaffComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.GROUP_STAFF_INVITE_STAFF}/:groupStaffId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<InviteStaff />}
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
        path: EnumPath.WAREHOUSE,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListWarehouseComponent />}
          />
        ),
      },
      {
        path: EnumPath.WAREHOUSE_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateWarehouseComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.WAREHOUSE}/:warehouseId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailWarehouseComponent />}
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
        path: EnumPath.PRODUCT_INVENTORY,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListProductInventoryComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.PRODUCT_INVENTORY}/:productDictionaryId/:storeId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailProductInventoryComponent />}
          />
        ),
      },
      {
        path: EnumPath.PRODUCT_INVENTORY_O2O,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListProductToO2OComponent />}
          />
        ),
      },
      {
        path: EnumPath.CATEGORY_O2O,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListCategoryO2OComponent />}
          />
        ),
      },
      {
        path: EnumPath.CATEGORY_IN_STORE,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListCategoryInStoreComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.CATEGORY_IN_STORE}/:categoryInStoreId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailCategoryComponent />}
          />
        ),
      },
      {
        path: `${EnumPath.CATEGORY_O2O}/:categoryId/:storeId`,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailCategoryComponent />}
          />
        ),
      },
      {
        path: EnumPath.CATEGORY_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateCategoryComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListOrderComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER_CREATE,
        element: (
          <PrivateRoute
            role={[]}
            children={<CreateOrderComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER_PAYMENT,
        element: (
          <PrivateRoute
            role={[]}
            children={<OrderPaymentComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER_O2O,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListOrderO2OComponent />}
          />
        ),
      },
      {
        path: EnumPath.ORDER_O2O_DETAIL,
        element: (
          <PrivateRoute
            role={[]}
            children={<DetailOrderO2OComponent />}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
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
  {
    path: EnumPath.GROUP_STAFF_INVITE_STAFF,
    element: (
      <PublicRoute
        isCheckMobile={true}
        role={[]}
        children={<RegisterStaff />}
      />
    ),
  },
  {
    path: '*',
    element: <Notfound />,
  },
  {
    path: '/no-permission',
    element: (
      <PrivateRoute
        role={[]}
        children={<NoPermission />}
      />
    ),
  },
]);

export { rootRoutes };
