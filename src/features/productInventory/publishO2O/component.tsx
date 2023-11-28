import { type FunctionComponent, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface ListProductToO2OComponentProps {
  api: IApiRequest;
}

export enum ENUM_STATE_UPDATE_O2O {
  UPDATE_O2O = 0,
  NORMAL,
}

const ListProductToO2OComponent: FunctionComponent<ListProductToO2OComponentProps> = props => {
  const { api } = props;
  const navigate = useNavigate();
  const { status } = useContext(ContextModal);
  const onClickRedirect = (url: string) => {
    navigate(url);
  };
  const [stateO2OFilter, setStateO2OFilter] = useState<number>(ENUM_STATE_UPDATE_O2O.NORMAL);
  const [listGoodsUpdateStateO2O, setListGoodsUpdateStateO2O] = useState<string[]>([]);
  const handleChangeMode = useCallback((mode: number) => {
    try {
      LoggerService.info('ListProductToO2OComponent execute handleChangeMode');
      setStateO2OFilter(mode);
    } catch (error: any) {
      LoggerService.error('ListProductToO2OComponent execute handleChangeMode error', error);
    }
  }, []);
  const handleAddToListGoodsUpdateO2O = (goodId: string) => {
    try {
      LoggerService.info('ListProductToO2OComponent execute handleAddToListGoodsUpdateO2O');
      const newListGoodsUpdateO2O = [...listGoodsUpdateStateO2O, goodId];
      setListGoodsUpdateStateO2O(newListGoodsUpdateO2O);
    } catch (error: any) {
      LoggerService.error('ListProductToO2OComponent execute handleAddToListGoodsUpdateO2O error', error);
    }
  };
  const handleRemoveFromListGoodsUpdateO2O = (goodId: string) => {
    try {
      LoggerService.info('ListProductToO2OComponent execute handleRemoveFromListGoodsUpdateO2O');
      const newListGoodsUpdateO2O = listGoodsUpdateStateO2O.filter(goodsUpdateId => goodsUpdateId !== goodId);
      setListGoodsUpdateStateO2O(newListGoodsUpdateO2O);
    } catch (error: any) {
      LoggerService.error('ListProductToO2OComponent execute handleRemoveFromListGoodsUpdateO2O error', error);
    }
  };
  const handleResetListGoodsUpdateO2O = () => {
    try {
      LoggerService.info('ListProductToO2OComponent execute handleResetListGoodsUpdateO2O');
      setListGoodsUpdateStateO2O([]);
    } catch (error: any) {
      LoggerService.error('ListProductToO2OComponent execute handleResetListGoodsUpdateO2O error', error);
    }
  };
  return (
    <View
      key={status}
      onClickRedirect={onClickRedirect}
      apiList={api}
      stateO2OFilter={stateO2OFilter}
      handleChangeMode={handleChangeMode}
      handleAddToListGoodsUpdateO2O={handleAddToListGoodsUpdateO2O}
      handleRemoveFromListGoodsUpdateO2O={handleRemoveFromListGoodsUpdateO2O}
      handleResetListGoodsUpdateO2O={handleResetListGoodsUpdateO2O}
      listGoodsUpdateStateO2O={listGoodsUpdateStateO2O}
    />
  );
};

export default ListProductToO2OComponent;
