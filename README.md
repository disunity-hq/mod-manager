# Disunity Mod Manager
Disunity Mod Manager for Unity games

# How to install

  - ```git clone https://github.com/disunity-hq/mod-manager.git```
  - ```npm install```

# How to run
### Development version
- ```npm run dev```
Initiates a local webserver and fires up electron.
### Packaged version
- ```npm run build```
Outputs a build to the projectdir/build/ folder

# Extra Tools
### Storybook
- Run ```npm run storybook``` to launch storybook.

In order to create a new story, simply create a ```*.stories.tsx``` file in the /src/stories/ folder. You can take a look at the ```test.stories.tsx``` file provided and the [storybook docs](https://storybook.js.org/docs/basics/writing-stories/) for more information.