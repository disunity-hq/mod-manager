import React from 'react';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TestPage from '../../src/renderer/components/pages/TestPage';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('TestPage Component', (): void => {
  let testPage: ShallowWrapper;

  beforeEach(
    (): void => {
      testPage = shallow(<TestPage />);
    }
  );

  it('renders', (): void => {
    expect(testPage).toBeTruthy();
  });
});
