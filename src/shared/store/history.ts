import { createMemoryHistory, createHashHistory } from 'history';
import { isRenderer } from '../helpers';

// Might want to change this to a hash history or memory history at some point
const history =
  process.env.STORYBOOK_ENV || !isRenderer ? createMemoryHistory() : createHashHistory();

export default history;
