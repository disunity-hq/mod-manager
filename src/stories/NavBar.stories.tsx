import * as React from "react";
import NavBar from "../renderer/components/window/NavBar";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Window", module);

stories.add("NavBar", () => <NavBar />);
