import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./style.css";
import { CSS_CLASSES } from "./constants";

const Button = ({
  className,
  raised,
  unelevated,
  outlined,
  dense,
  notCased,
  disabled,
  icon: Icon,
  iconClass,
  href,
  onClick,
  children,
}) => {
  const buttonClassNames = classNames(
    CSS_CLASSES.ROOT,
    {
      [CSS_CLASSES.DENSE]: dense,
      [CSS_CLASSES.RAISED]: raised,
      [CSS_CLASSES.OUTLINED]: outlined,
      [CSS_CLASSES.UNELEVATED]: unelevated,
      [CSS_CLASSES.UPPERCASE]: !notCased,
    },
    className
  );

  const content = (
    <>
      {Icon && <Icon className={`${CSS_CLASSES.ICON} ${iconClass}`} />}
      <span className="Button__Label">{children}</span>
    </>
  );

  return href ? (
    <a href={href} className={buttonClassNames} aria-disabled={disabled}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className={buttonClassNames} disabled={disabled}>
      {content}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  dense: PropTypes.bool,
  notCased: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  iconClass: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
