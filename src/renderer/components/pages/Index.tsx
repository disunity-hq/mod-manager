import * as React from 'react';
import { Layout, Button } from 'antd';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  push,
};

type Props = typeof mapDispatchToProps;

class Index extends React.Component<Props> {
  public render(): React.ReactElement {
    return (
      <Layout>
        <h1>Index</h1>
        <Button
          type="primary"
          onClick={(): void => {
            this.props.push('/test');
          }}
        >
          Test Page
        </Button>
      </Layout>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Index);
