import { Field, type FieldProps } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import React, { useEffect, useState } from 'react';

import upload from '@/assets/images/icon/cloud-upload-outline.svg';
import { Localize } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import RenderImages from './renderImages';
import { type ICreateBaseULR, type IReturnOnChange, type IUploadComponent, type IUploadRoot } from './types';

interface IStateUploadRootComponent {
  returnOnChange: IReturnOnChange[];
  createBaseULR: ICreateBaseULR[];
  defaultValue: ICreateBaseULR[];
  open: boolean;
}

const UploadRootComponent: React.FC<IUploadComponent & Omit<FieldProps, 'component'>> = ({
  name,
  multi,
  isFile,
  onChange,
  value,
  disable,
  type,
  defaultList,
  label,
  controlled,
  ...other
}) => {
  const initialState: IStateUploadRootComponent = React.useMemo(() => {
    return {
      returnOnChange: [],
      createBaseULR: [],
      open: false,
      defaultValue: [],
    };
  }, []);
  const [state, setState] = useState<IStateUploadRootComponent>(initialState);
  useEffect(() => {
    if (value) {
      setState({
        ...state,
        createBaseULR: isFile
          ? Helper.createObjectForImagesDefaultNotGeneralSrcImage(value)
          : Helper.createObjectForImagesDefault(value),
        defaultValue: Helper.createObjectForImagesDefaultNotGeneralSrcImage(value),
      });
    }
  }, []);
  useEffect(() => {
    if (Helper.isArrayEmpty(state.returnOnChange)) {
      Helper.removeObjectEmpty(state.createBaseULR);
    }
    const returnImagesDefault = Helper.returnImagesDefault(state.defaultValue, state.createBaseULR).map(
      item => item.src,
    );
    if (!Helper.isArrayEmpty(state.createBaseULR) || !Helper.isArrayEmpty(state.returnOnChange)) {
      handleOnChange({
        files: state.returnOnChange.map(item => item.file),
        imagesDefault: returnImagesDefault,
      });
      if (controlled) {
        setState(initialState);
      }
    } else {
      handleOnChange(undefined);
    }
  }, [state.createBaseULR, state.returnOnChange]);

  const handleOnChange = (value: any) => {
    onChange &&
      onChange({
        value,
      });
  };
  const handleShowImageModal = () => {
    setState({
      ...state,
      open: !state.open,
    });
  };
  const handleGetImageForInputElementSingleFile = (files: FileList) => {
    const convertObjectToArray = Helper.convertObjectToArray(Array.from(files));
    const createObjectURLForImages = Helper.createObjectURLForImages(convertObjectToArray);
    return {
      returnOnChange: convertObjectToArray,
      createBaseULR: createObjectURLForImages,
    };
  };
  const handleGetImageForInputElementMultiFile = (files: FileList) => {
    const lengthDefaultCreateBaseULR = state.createBaseULR.length;
    const convertObjectToArray = Helper.convertObjectToArrayMulti(Array.from(files), lengthDefaultCreateBaseULR);
    const createObjectURLForImages = Helper.createObjectURLForImages(convertObjectToArray);
    return {
      returnOnChange: state.returnOnChange.concat(convertObjectToArray),
      createBaseULR: state.createBaseULR.concat(createObjectURLForImages),
    };
  };

  const handleGetImageForInputElement = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length !== 0 && files) {
        if (multi) {
          setState({
            ...state,
            ...handleGetImageForInputElementMultiFile(files),
            open: true,
          });
        } else {
          setState({
            ...state,
            ...handleGetImageForInputElementSingleFile(files),
            open: true,
          });
        }
      }
    },
    [state.createBaseULR],
  );
  return (
    <div
      style={{
        maxHeight: '300px',
      }}
      className={`relative ${disable && 'bg-neutral-20'}`}>
      <Label className={`text-lg text-neutral-100 pb-1`}>
        <Localize tid={label || ''} />
      </Label>
      <input
        onChange={event => {
          handleGetImageForInputElement(event);
        }}
        style={{
          opacity: 0,
        }}
        disabled={disable}
        className='absolute w-full bg-red-300 h-full z-10'
        multiple={multi}
        id={name}
        type='file'
      />
      <label
        htmlFor={name}
        className='cursor-pointer'>
        <div
          style={{
            maxHeight: '300px',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: type === 'CCCD' ? '256px' : '100%',
          }}
          className={`flex flex-column items-center gap-2 w-52 text-center border-2 border-dashed border-neutral-60 rounded-lg p-4 ${
            disable ? 'bg-neutral-60' : 'bg-white'
          }`}>
          {Helper.isArrayEmpty(state.createBaseULR) ? (
            <React.Fragment>
              <img
                className='h-10 w-10'
                src={upload}
              />
              <div className='flex flex-column gap-2'>
                <div className='text-base text-neutral-80'>
                  <Localize tid={'core.upload.title'} />
                </div>
                <div className='text-xs text-neutral-60'>
                  <Localize tid={'core.upload.description'} />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <RenderImages
              type={type}
              images={state.createBaseULR.map(itm => itm.src)}
              onShowModal={handleShowImageModal}
            />
          )}
        </div>
      </label>
      {multi && <div>{''}</div>}
    </div>
  );
};

const UploadRoot: React.FC<IUploadRoot> = ({ name, isForm, label, controlled, ...other }) => {
  if (isForm) {
    return (
      <Field
        label={label}
        name={name}
        component={UploadRootComponent}
        {...other}
      />
    );
  }
  return (
    <UploadRootComponent
      label={label}
      name={name}
      controlled={controlled}
      {...other}
    />
  );
};
export default UploadRoot;
