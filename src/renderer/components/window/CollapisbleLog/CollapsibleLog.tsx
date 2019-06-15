import React from 'react';

import { Layout, Progress, Spin, Typography, Collapse } from 'antd';
import LogLine from './LogLine';

const { Content } = Layout;
const { Text } = Typography;

export interface StepInfo {
  key: string;
  /** Will default to `key` if not provided */
  name?: string;
  /** 0-1 for step progress for unspecified for indeterminate progress */
  progress?: number;
}

export interface CollapsibleLogProps {
  steps: StepInfo[];
  done?: boolean;
}

const CollapsibleLog = ({ steps, done }: CollapsibleLogProps): React.ReactElement => {
  return (
    <Layout style={{ background: 'transparent' }}>
      <Content>
        {steps.length > 0 && <LogLine data={steps[steps.length - 1]} done={done} last />}
        <Collapse accordion activeKey="1">
          <Collapse.Panel header="Log" key="1">
            <Layout style={{ background: 'transparent' }}>
              <Content className="flex col">
                {steps.map((step, index) => (
                  <LogLine data={step} done key={step.key} />
                ))}
              </Content>
            </Layout>
          </Collapse.Panel>
        </Collapse>
      </Content>
    </Layout>
  );
};

export default CollapsibleLog;
