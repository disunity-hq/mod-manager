import React from 'react';

import { Typography, Progress, Spin } from 'antd';
import { StepInfo } from './CollapsibleLog';

const { Text } = Typography;

export interface LogLineProps {
  data: StepInfo;
  done?: boolean;
  last?: boolean;
}

const LogLine = ({ data, done, last }: LogLineProps) => (
  <span className="flex row space">
    <Text>{data.name || data.key}</Text>
    {typeof data.progress === 'number' ? (
      <Progress type="circle" percent={data.progress} />
    ) : (
      !done && last && <Spin />
    )}
  </span>
);

export default LogLine;
