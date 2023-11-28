/** * @author: Thuy Phan */

import { Navigate } from 'react-router-dom';

import AuthService from '@/utils/Auth';
import { Helper } from '@/utils/Helper';

function PublicRoute(props: any) {
  const { isCheckMobile } = props;
  const auth = AuthService.getPackageAuth();
  console.log('check auth', auth);
  return !Helper.isEmpty(auth) && !isCheckMobile ? (
    <Navigate
      to={'/'}
      replace
    />
  ) : (
    props.children
  );
}

export default PublicRoute;
