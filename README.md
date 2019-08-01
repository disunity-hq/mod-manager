<img src="logo.png" width="256px">

# Disunity Mod Manager
Disunity Mod Manager for Unity games

# How to install

  - ```git clone https://github.com/disunity-hq/mod-manager.git```
  - ```yarn```

# How to run
### Development version
- ```yarn dev```
Initiates a local webserver and fires up electron.
### Packaged version
- ```yarn build```
Outputs a build to the projectdir/build/ folder

# Testing
### Running the Test Suite
- ```yarn test [--collect-coverage]```
Runs all structrual and interaction tests. Optionally accepts the `--collect-coverage` flag to generate code coverage report


# Extra Tools
### Storybook
- Run ```yarn build:style-typings``` optionally with the `--watch` flag to ensure styles load properly
- Run ```yarn storybook``` to launch storybook. (Run in a seperate terminal if using the `--watch` flag above)

In order to create a new story, simply create a ```*.stories.tsx``` file in the /src/stories/ folder. You can take a look at the ```test.stories.tsx``` file provided and the [storybook docs](https://storybook.js.org/docs/basics/writing-stories/) for more information.

### Snapshot Testing
This project is configured with `storyshot` to create jest snapshots for all the stories automatically.
Snapshots are a way to verify the the structure of the rendered components don't change between updating code.
If a change is desired you can simply run ```yarn test -u```. The `-u` flag tells jest to update the snapshots
