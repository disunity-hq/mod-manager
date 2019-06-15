import * as path from 'path';
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Spin, Divider, Collapse, Progress, Select } from 'antd';
import { dialog, remote } from '../../../services';
import * as styles from './AddGame.scss';
import { hot } from 'react-hot-loader';
import CollapsibleLog, { StepInfo } from '../../window/CollapisbleLog/CollapsibleLog';
import { TargetInfo } from '../../../../models/TargetInfo';

const { Content } = Layout;

const { Text, Title } = Typography;

const FILE_FILTERS: Electron.FileFilter[] = [
  { extensions: ['exe'], name: 'Executable' },
  { extensions: ['*'], name: 'All Files' },
];

const AddGame = (): React.ReactElement => {
  const [selected, setSelected] = useState<string>(undefined);
  const [steps, setSteps] = useState<StepInfo[]>([]);
  const [targetInfo, setTargetInfo] = useState<TargetInfo>(undefined);

  const addStep = (stepInfo: StepInfo) => {
    setSteps(prevSteps => [...prevSteps, stepInfo]);
  };

  useEffect(() => {
    if (selected) {
      setSteps([{ key: 'hashing', name: 'Calculating Hashes' }]);
      setTargetInfo(undefined);
      setTimeout(() => {
        addStep({ key: 'fetching', name: 'Fetching Game Info' });
      }, 2000);
      setTimeout(() => {
        addStep({ key: 'done', name: 'Done' });
        setTargetInfo({ name: '<Insert Target Name Here>', disunityVersions: ['2', '1'] });
      }, 4000);
    }
  }, [selected]);

  return (
    <Layout>
      <Content className="page-content flex col">
        <Title>Browse For Games</Title>
        <span className="flex row space">
          <Text>Select Game:</Text>
          <Button
            type="primary"
            onClick={() => {
              dialog.showOpenDialog(
                remote.getCurrentWindow(),
                { filters: FILE_FILTERS },
                filePaths => {
                  if (filePaths) {
                    setSelected(filePaths[0]);
                  }
                }
              );
            }}
          >
            Browse
          </Button>
        </span>
        {selected && (
          <React.Fragment>
            <Text>Selected File: {path.basename(selected)}</Text>
            <Text>Parent Directory: {path.dirname(selected)}</Text>
            <Divider />
            <CollapsibleLog steps={steps} done={!!targetInfo} />
            {targetInfo && (
              <React.Fragment>
                <Divider />
                <Title level={3}>{targetInfo.name}</Title>
                <span className="flex">
                  <Text>Available Versions:</Text>
                  <Select style={{ flexGrow: 1 }} defaultValue={targetInfo.disunityVersions[0]}>
                    {targetInfo.disunityVersions.map(ver => (
                      <Select.Option key={ver} value={ver}>
                        {ver}
                      </Select.Option>
                    ))}
                  </Select>
                </span>
                <span>
                  <Button type="primary">Add Target</Button>
                </span>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Content>
    </Layout>
  );
};

export default hot(module)(AddGame);
