import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

// Sub components
import Backdrop from "../../basic/Backdrop/Backdrop";
import {
  MdExpandMore as AngleDown,
  MdExpandLess as AngleUp,
} from "react-icons/md";
import Button from "../../basic/Button/Button";

const MenuList = ({ open, items, onSelect }) => {
  return open ? (
    <ul className="Menu__List">
      {items.map((item, i) => (
        <li
          key={`${item}_${i}`}
          onClick={(evt) => onSelect(evt, item)}
          className="Menu__Item"
        >
          {item}
        </li>
      ))}
    </ul>
  ) : null;
};

const Menu = ({
  className,
  selected,
  onSelect,
  placeholder,
  items,
  noDropIcon,
}) => {
  const [open, setOpen] = useState(false);

  const close = (evt) => {
    evt.preventDefault();
    setOpen(false);
  };

  const toggle = (evt) => {
    evt.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <Backdrop show={open} onClick={close} />
      <div className={`Menu ${className}`}>
        <header className="Menu__Header">
          {noDropIcon ? (
            <Button
              onClick={toggle}
              notCased
              className={selected ? null : "Menu__Placeholder"}
            >
              {selected || placeholder}
            </Button>
          ) : (
            <div
              className={selected ? "Menu__SelectedItem" : "Menu__Placeholder"}
            >
              {selected || placeholder}
            </div>
          )}
          {!noDropIcon && (
            <Button icon={open ? AngleUp : AngleDown} onClick={toggle} />
          )}
        </header>
        <MenuList
          open={open}
          items={items}
          onSelect={(evt, item) => {
            onSelect(item);
            close(evt);
          }}
        />
      </div>
    </div>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  noDropIcon: PropTypes.bool,
};

export default Menu;
