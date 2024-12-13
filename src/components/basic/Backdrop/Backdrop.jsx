import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { CSS_CLASSES } from './constants';

const buildClassNames = (rootClass, classMappings, userClassName) => {
  return [
    rootClass,
    ...Object.keys(classMappings)
      .filter((className) => classMappings[className])
      .concat(userClassName || '')
  ].join(' ');
};

const Backdrop = ({ show, opaque, dark, className, onClick }) => {
  const classNames = buildClassNames(
    CSS_CLASSES.ROOT,
    {
      [CSS_CLASSES.OPAQUE]: opaque,
      [CSS_CLASSES.DARK]: dark,
      [CSS_CLASSES.CLICKABLE]: !!onClick
    },
    className
  );

  return show ? <div className={classNames} onClick={onClick} /> : null;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  opaque: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Backdrop.defaultProps = {
  show: false,
  opaque: false,
  dark: false,
  className: '',
  onClick: undefined
};

export default Backdrop;
