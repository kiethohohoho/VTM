import { Image, type ImageProps } from 'antd';

import { type ImageRatio } from '@/core2/common/type';
import mapModifiers from '@/utils/Functions';

type SizeImageType = 'cover' | 'contain' | 'inherit' | 'initial';
interface ImageRootAntDProps extends ImageProps {
  ratio?: ImageRatio;
  src?: string;
  size?: SizeImageType;
}

const ImageRootAntD: React.FC<ImageRootAntDProps> = ({ ratio, preview = false, size, src, alt = '#', ...props }) => {
  return (
    <Image
      rootClassName={mapModifiers('image', ratio, size)}
      src={src}
      preview={preview}
      {...props}
    />
  );
};

export default ImageRootAntD;
