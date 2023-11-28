import React from 'react';

import CardPage from '@/core2/card/page';
import { TypeDashboardSale } from '@/utils/Enums';

import CardIChart from './components/cardChart';
import ChartInventory from './components/inventory';
import IndexDashboardSale from './components/sale';

interface IViewDashboard {
  onGetTypeSale: (id: TypeDashboardSale) => void;
  saleActive: any;
}

const ViewDashboard: React.FC<IViewDashboard> = ({ onGetTypeSale, saleActive }) => {
  return (
    <CardPage
      className='px-10 flex flex-column gap-5'
      title='dashboard.ecommerce'>
      <CardIChart
        onChangeDate={() => {}}
        date={{ end: 0, start: 0 }}
        type={TypeDashboardSale.getByDate}
        onChange={() => {}}
        title='Inventory'
        description='Inventory of recent months'>
        <ChartInventory />
      </CardIChart>
      <IndexDashboardSale />
    </CardPage>
  );
};

export default ViewDashboard;
