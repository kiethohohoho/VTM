import { CardPage } from '@/core2/card';
import TabsRoot from '@/core2/tabs/root';
import { type ITabs } from '@/core2/tabs/types';

import OrderLocal from './orderLocal/listOrder';
import OrderO2O from './orderO2O/listOrder';

// import YourProduct from './yourProduct/list';
interface IViewProduct {}

enum OrderTabs {
  local = 0,
  o2o,
}
const ViewProduct = (props: IViewProduct) => {
  const tabs: Array<ITabs<OrderTabs>> = [
    {
      component: <OrderLocal />,
      id: OrderTabs.local,
      title: 'order.local',
      icon: 'tri-state-indeterminate',
    },
    {
      component: <OrderO2O />,
      id: OrderTabs.o2o,
      title: 'orderO2O.title',
      icon: 'tri-state-indeterminate',
    },
  ];
  return (
    <CardPage title='order'>
      <TabsRoot tabs={tabs} />
    </CardPage>
  );
};

export { ViewProduct };
