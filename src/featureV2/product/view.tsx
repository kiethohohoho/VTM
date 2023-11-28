import { CardPage } from '@/core2/card';
import TabsRoot from '@/core2/tabs/root';
import { type ITabs } from '@/core2/tabs/types';

import ProductLS from './lsProduct/list';
import YourProduct from './yourProduct/list';
interface IViewProduct {}

enum ProductTabs {
  local = 0,
  ls,
}
const ViewProduct = (props: IViewProduct) => {
  const tabs: Array<ITabs<ProductTabs>> = [
    {
      component: <YourProduct />,
      id: ProductTabs.local,
      title: 'product.your',
      icon: 'tri-state-indeterminate',
    },
    {
      component: <ProductLS />,
      id: ProductTabs.ls,
      title: 'product.ls',
      icon: 'tri-state-indeterminate',
    },
  ];
  return (
    <CardPage title='product'>
      <TabsRoot tabs={tabs} />
    </CardPage>
  );
};

export { ViewProduct };
