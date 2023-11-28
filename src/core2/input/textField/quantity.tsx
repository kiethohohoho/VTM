import React from 'react';

import { ButtonRoot } from '@/core2/button';

import InputRoot from './root';
import { type IInputRoot } from './types';

interface IInputQuantityComponent extends IInputQuantity {
  onChange?: (event: any) => void;
}

interface IStateInputQuantity {
  value: number;
}

const InputQuantityComponent: React.FC<IInputQuantityComponent> = ({ name, defaultValue = 0, onChange, ...other }) => {
  const initialStateInputQuantity: IStateInputQuantity = React.useMemo(() => {
    return {
      value: Number(defaultValue),
    };
  }, []);
  const [state, setState] = React.useState<IStateInputQuantity>(initialStateInputQuantity);

  const handlePlus = () => {
    setState(prev => {
      return {
        value: prev.value + 1,
      };
    });
  };
  const handleSubtraction = () => {
    if (state.value !== 0) {
      setState(prev => {
        return {
          value: prev.value - 1,
        };
      });
    }
  };
  const handleOnChange = (value: any) => {
    onChange &&
      onChange({
        value,
      });
  };

  React.useEffect(() => {
    handleOnChange(state.value);
    return () => {};
  }, [state.value]);

  return (
    <div className='flex items-center'>
      <ButtonRoot
        onClick={handleSubtraction}
        themeColor={'primary'}
        style={{
          paddingInline: '10px',
          paddingBlock: '3px',
          height: 'fit-content',
          borderRadius: '9999px',
        }}>
        -
      </ButtonRoot>
      <div className='px-2'>
        <InputRoot
          value={state.value}
          style={{
            width: '30px',
            background: 'transparent',
            border: '0px',
            color: 'black',
            marginBottom: '4px',
            fontSize: '13px',
          }}
          disabled
          {...other}
          name={name}
        />
      </div>

      <ButtonRoot
        onClick={handlePlus}
        themeColor={'primary'}
        style={{
          paddingInline: '9px',
          paddingBlock: '3px',
          height: 'fit-content',
          borderRadius: '9999px',
        }}>
        +
      </ButtonRoot>
    </div>
  );
};

interface IInputQuantity extends IInputRoot {}
const InputQuantity: React.FC<IInputQuantity> = ({ name, ...other }) => {
  return (
    <InputQuantityComponent
      name={name}
      {...other}
    />
  );
};

export default InputQuantity;
