import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

const Switch = ({ checked: propChecked, onSwitch, className, label }) => {
  const [checked, setChecked] = useState(propChecked || false);

  useEffect(() => {
    setChecked(propChecked);
  }, [propChecked]);

  const toggleChecked = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleChecked();
    if (onSwitch) {
      onSwitch();
    }
  };

  const switchClassName = `Switch ${checked ? "Switch_checked" : ""} ${
    className || ""
  }`;

  return (
    <div className={switchClassName}>
      <label className="Switch__Label" htmlFor="Switch__Thumb">
        {label}
      </label>

      <div className="Switch__Button">
        <div className="Switch__Track"></div>
        <input
          className="Switch__Thumb"
          onClick={handleClick}
          name="Switch__Thumb"
          id="Switch__Thumb"
          type="button"
        />
      </div>
    </div>
  );
};

Switch.propTypes = {
  onSwitch: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
};

export default Switch;
