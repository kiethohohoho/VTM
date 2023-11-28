import { Typography } from 'antd';

import { type TypographyText } from './type';

const { Text } = Typography;
const TextRootAntD: React.FC<TypographyText> = ({ content, className, ...props }) => {
  return (
    <Text
      className={className}
      {...props}>
      {content}
    </Text>
  );
};

export default TextRootAntD;
