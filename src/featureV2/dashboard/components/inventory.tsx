import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  type ChartSeriesItemProps,
  ChartTitle,
} from '@progress/kendo-react-charts';
const categories = ['2022', 'Feb 22', 'Mar 22', 'Apr 22', 'May 22', 'Jun 22', 'Jul 22', 'Aug 22', 'Sep 22'];
const seriesDesktop: ChartSeriesItemProps = {
  data: [23, 11, 22, 27, 13, 22, 37, 21, 44],
};
const ChartInventory = () => {
  return (
    <>
      <Chart>
        <ChartTitle text='Inventory Of Store' />
        <ChartLegend
          position='bottom'
          orientation='horizontal'
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={categories}
            startAngle={45}
          />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            type='column'
            tooltip={{
              visible: true,
            }}
            data={seriesDesktop.data}
            name={seriesDesktop.name}
            color={'#1d5349'}
          />
        </ChartSeries>
      </Chart>
    </>
  );
};

export default ChartInventory;
