import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type InputChangeEvent } from '@progress/kendo-react-inputs';
import React, { type KeyboardEvent, useEffect, useState } from 'react';

import { Localize } from '@/context/languages';
import { InputRoot } from '@/core2/input';
import { useCountdownSeconds } from '@/hooks/useCountdown';
import { Helper } from '@/utils/Helper';

interface IPropsOPTRoot {
  length: number;
  onChange: (value: string) => void;
  timeResent: number;
  onResent?: () => void;
  numberPhone?: string | number;
  messageError?: string;
  isResend?: boolean;
}

interface IStateOTP {
  indexFocus: number;
}

type IItemHandleOTP = Record<string, string>;

const OPTRoot = ({
  length,
  onChange,
  timeResent,
  onResent,
  numberPhone,
  messageError,
  isResend = true,
}: IPropsOPTRoot) => {
  /* hook */
  const [state, setState] = useState<IStateOTP>({
    indexFocus: 0,
  });
  const { countdown, startCountdown, setCountdown } = useCountdownSeconds(timeResent);
  /* variable */
  const elementInput = Array.from(Array(length + 1));
  const styleInputFinal = {
    opacity: 1,
    left: 0,
    bottom: 0,
    zIndex: '-1',
  };
  /* handle */
  const handleOnChangeInput = React.useCallback(
    (event: InputChangeEvent) => {
      if (event.value && Number(event.target.name) < length) {
        setState({
          ...state,
          indexFocus: Number(event.target.name) + 1,
        });
      }
    },
    [state.indexFocus],
  );
  const handleOnKeyDown = React.useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const BACKSPACE_KEY = 'Backspace';
      const DELETE_KEY = 'Delete';
      if (event.code === BACKSPACE_KEY || event.code === DELETE_KEY) {
        if (state.indexFocus !== 0) {
          setState({
            ...state,
            indexFocus: state.indexFocus - 1,
          });
        }
      }
    },
    [state.indexFocus],
  );
  const handleSubmit = (values: IItemHandleOTP) => {
    let value = '';
    for (const key in values) {
      if (Number(key) < length) {
        value = value + values[key];
      }
    }
    onChange(value);
  };

  useEffect(() => {
    if (Helper.equalTwoNumber(state.indexFocus, length)) {
      document.getElementById('submit')?.click();
    }
  }, [state.indexFocus === length]);

  useEffect(() => {
    startCountdown();
    return () => {};
  }, []);

  return (
    <section>
      <article>
        <Form
          onSubmitClick={(dataItem: any) => {
            handleSubmit(dataItem.values);
          }}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='flex flex-column gap-2 text-lg'>
                  <span
                    className='text-center'
                    style={{
                      color: messageError && '#FF6969',
                    }}>
                    Please enter 6 digital send to {numberPhone}.
                    <br />
                    Don’t forget to check your spam.
                  </span>
                  <div
                    key={`${state.indexFocus}`}
                    className='flex gap-3 relative pt-8'>
                    {elementInput.map((item, index) => {
                      return (
                        <div
                          style={
                            Helper.equalTwoNumber(index, elementInput.length - 1)
                              ? {
                                  ...styleInputFinal,
                                  position: 'absolute',
                                }
                              : {}
                          }
                          key={index.toString() + 'otp'}>
                          <InputRoot
                            style={{
                              textAlign: 'center',
                            }}
                            type='text'
                            className='text-center w-12 border-neutral-60 bg-neutral-30'
                            valid={true}
                            autoFocus={Helper.equalTwoNumber(index, state.indexFocus)}
                            maxLength={1}
                            onKeyDown={handleOnKeyDown}
                            onChange={handleOnChangeInput}
                            name={`${index}`}
                            id={`${index}-input`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex flex-column gap-1 text-center'>
                    <span
                      style={{
                        color: messageError && '#FF6969',
                      }}
                      className='text-sm'>
                      <Localize tid='otp.countdown' />:{` ${countdown}s`}
                    </span>
                    <span
                      className='cursor-pointer'
                      style={{
                        color: messageError && '#FF6969',
                        fontSize: '16px',
                      }}>
                      <Localize tid='otp.did.not.receive' />
                      <ins
                        onClick={() => {
                          onResent && onResent();
                          setCountdown(timeResent);
                        }}>
                        <Localize tid='otp.resendTitle' />
                      </ins>
                    </span>
                    {messageError && (
                      <span
                        style={{
                          color: messageError && '#FF6969',
                        }}>
                        ({messageError})
                      </span>
                    )}
                  </div>
                  <button
                    style={{
                      ...styleInputFinal,
                      position: 'absolute',
                    }}
                    type='submit'
                    id='submit'
                  />
                </div>
              </FormElement>
            );
          }}
        />
      </article>
    </section>
  );
};

export default OPTRoot;
