import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

import { LogoIcon } from '@/core2/icon';
import AuthService from '@/utils/Auth';

import IndexNotification from './components/notification';
import IndexPersonal from './components/personal';

const ViewHeader = () => {
  const auth = AuthService.getPackageAuth();
  return (
    <AppBar
      themeColor='inherit'
      style={{
        padding: '0 24px',
        height: '64px',
      }}>
      <AppBarSection>
        <LogoIcon />
      </AppBarSection>

      <AppBarSpacer />

      <AppBarSection className='flex gap-5'>{auth && <IndexNotification />}</AppBarSection>

      <AppBarSpacer style={{ width: '4px' }} />

      <AppBarSection>
        <span className='k-appbar-separator' />
      </AppBarSection>

      <AppBarSpacer style={{ width: '4px' }} />

      <AppBarSection>
        <IndexPersonal />
      </AppBarSection>
    </AppBar>
  );
};

export default ViewHeader;
