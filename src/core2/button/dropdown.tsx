import {
  DropDownButton,
  type DropDownButtonItemClickEvent,
  type DropDownButtonProps,
} from '@progress/kendo-react-buttons';
import React from 'react';

import { Localize } from '@/context/languages';

export interface IItemsButtonDropdown {
  label: string;
  value: any;
}

interface IButtonDropDown extends Omit<DropDownButtonProps, 'onItemClick'> {
  items: IItemsButtonDropdown[];
  onItemClick: ({ label, value }: IItemsButtonDropdown) => void;
}
function ButtonDropDown({ items, onItemClick, text, ...rest }: IButtonDropDown) {
  /* component */
  const itemRender = (props: { item: any; itemIndex: number }) => {
    return (
      <div className='ls-py_sm'>
        <span>
          <Localize tid={props.item.label} />
        </span>
      </div>
    );
  };
  /* handle */
  const handleOnClickItems = ({ item }: DropDownButtonItemClickEvent) => {
    if (item) {
      onItemClick(item);
    }
  };
  return (
    <DropDownButton
      text={text}
      itemRender={itemRender}
      {...rest}
      onItemClick={handleOnClickItems}
      items={items}
    />
  );
}

export default ButtonDropDown;
