import React, { ReactElement } from 'react';
import { RootState } from '../../store/types';
import { changeTheme } from '../../store/theme-reducer';
import { Switch, Button } from 'antd';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

const mapStateToProps = (state: RootState) => ({
  theme: state.theme,
});

const mapDispatchToProps = {
  changeTheme: changeTheme,
  back: goBack,
};

export type TestPageProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TestPage = ({ theme, changeTheme, back }: TestPageProps): ReactElement => (
  <React.Fragment>
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
    <Switch
      defaultChecked
      checked={theme === 'dark'}
      onChange={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
    />
    <Button
      onClick={(): void => {
        back();
      }}
    >
      Back
    </Button>
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
