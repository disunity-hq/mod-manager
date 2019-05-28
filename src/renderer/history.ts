import { createMemoryHistory, createHashHistory } from "history";

// Might want to change this to a hash history or memory history at some point
const history = process.env.STORYBOOK_ENV ? createMemoryHistory() : createHashHistory();

export default history;
