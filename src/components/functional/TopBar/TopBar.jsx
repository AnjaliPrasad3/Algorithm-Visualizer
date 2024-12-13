import PropTypes from "prop-types";
import React from "react";
import "./style.css";

import { MdClose as Close, MdMenu as Hamburger } from "react-icons/md";
import Button from "../../basic/Button/Button";
import Switch from "../../basic/Switch/Switch";

const TopBar = ({
  drawerOpen,
  toggleDrawer,
  darkMode,
  onToggleDarkMode,
  children,
}) => {
  return (
    <header className="TopBar">
      <div className="TopBar__Row TopBar__Row_main">
        <section className="TopBar__Section">
          <Button
            icon={drawerOpen ? Close : Hamburger}
            className="TopBar__MenuButton"
            iconClass="TopBar__Icon"
            onClick={toggleDrawer}
          />
          <span className="TopBar__Title">Sort Visualizer</span>
        </section>
        <section className="TopBar__Section TopBar__Section_align_end">
          <Switch
            label="Dark Mode"
            onSwitch={onToggleDarkMode}
            checked={darkMode}
          />
        </section>
      </div>
      <div className="TopBar__Row TopBar__Row_controls">{children}</div>
    </header>
  );
};

TopBar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TopBar;
