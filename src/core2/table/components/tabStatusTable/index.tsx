import { Localize } from '@/context/languages';
import { Helper } from '@/utils/Helper';

export interface ITabStatus {
  name: string;
  value: number;
}
export type IListTabStatus = ITabStatus[];
interface ITabStatusTable {
  listTabStatus: ITabStatus[];
  currentStatus?: number | string;
  handleFilterStatus: (filterValue?: number | string) => void;
}
const TabStatusTable = (props: ITabStatusTable) => {
  const { listTabStatus, currentStatus, handleFilterStatus } = props;
  return (
    <div className='flex items-center'>
      <li
        key={Helper.randomKey()}
        className={`px-2 py-4 text-sm text-decoration-none list-none  ${
          !currentStatus ? 'text-neutral-100' : 'text-primary hover:text-blue-900'
        }  cursor-pointer `}
        onClick={() => {
          handleFilterStatus('');
        }}>
        <Localize tid={`all`} />
      </li>
      {listTabStatus.map(tabStatus => {
        return (
          <li
            key={Helper.randomKey()}
            className={`px-2 py-4 text-sm text-decoration-none list-none  ${
              Number(tabStatus.value) === Number(currentStatus)
                ? 'text-neutral-100'
                : 'text-primary hover:text-blue-900'
            }  cursor-pointer `}
            onClick={() => {
              handleFilterStatus(tabStatus.value);
            }}>
            <Localize tid={`${tabStatus.name}`} />
          </li>
        );
      })}
    </div>
  );
};

export { TabStatusTable };
