import React from 'react';
import { storiesOf, Renderable } from '@storybook/react';
import ModInfoPane from './ModInfoPane';
import { withRedux, withRouter } from '../../../../../.storybook/decorators';
import { RootState } from '../../../../shared/store/types';
import { PackageDetails } from '../../../../models';
import { Route } from 'react-router-dom';

const testPackage: PackageDetails = {
  name: 'TestPackage',
  owner: 'scott',
};

storiesOf('Disunity|Pages/ModInfoPane', module)
  .addDecorator(withRouter)
  .addDecorator(
    withRedux<RootState>({
      router: {
        location: {
          pathname: `/games/risk-of-rain-2/${testPackage.owner}/${testPackage.name}/details`,
        },
        action: 'PUSH',
      },
      games: {
        games: {
          'risk-of-rain-2': {
            name: 'Risk of Rain 2',
            id: 'risk-of-rain-2',
          },
        },
      },
    })
  )
  .add(
    'ModInfoPane',
    (): Renderable => <Route path="/games/:game/:owner/:name/:page" component={ModInfoPane} />
  );
