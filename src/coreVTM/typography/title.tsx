import { Typography } from 'antd';

import { type TypographyTitle } from './type';

const { Title } = Typography;
const TitleRootAntD: React.FC<TypographyTitle> = ({ level = 5, content, className, ...props }) => {
  return (
    <Title
      level={level}
      className={className}
      {...props}>
      {content}
    </Title>
  );
};

export default TitleRootAntD;
