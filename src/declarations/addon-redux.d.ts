
declare module 'addon-redux/enhancer' {
  import { StoreEnhancer } from "redux";

  const _default: StoreEnhancer;
  export default _default;
}

declare module 'addon-redux/withRedux' {
  import { StoryDecorator } from "@storybook/react";
  import { AddonStore } from "@storybook/addons";
  import { Store } from "redux";


  export interface WithReduxOptions {
    Provider: React.ComponentType;
    store: Store;
    state?: object;
    actions?: Action[];
  }

  export interface Action {
    name: string;
    action: { type: string };
  }

  const _default: (addons: AddonStore) => (opts: WithReduxOptions) => StoryDecorator;
  export default _default;
}
