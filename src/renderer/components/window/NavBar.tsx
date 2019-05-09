import * as React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faWindowMinimize,faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { ipcRenderer} from "electron";
import "./NavBar.scss";

class NavBar extends React.Component<{}, {}> {
  render() {
    return (
      <div className="navbar">
        <div className="left-side">
          <Button type="primary">Index</Button>
        </div>
        <div className="right-side">
          <Button type="link" className="app-button clickable" onClick={() => ipcRenderer.send("app-minimize")}>
            <FontAwesomeIcon icon={faWindowMinimize} size="2x" color="grey" />
          </Button>
          <Button type="link" className="app-button clickable" onClick={() => ipcRenderer.send("app-maximize")}>
            <FontAwesomeIcon icon={faWindowMaximize} size="2x" color="grey" />
          </Button>
          <Button type="link" className="app-button clickable" onClick={() => ipcRenderer.send("app-close")}>
            <FontAwesomeIcon icon={faWindowClose} size="2x" color="red" />
          </Button>
        </div>
      </div>
    );
  }
}

export default NavBar;
