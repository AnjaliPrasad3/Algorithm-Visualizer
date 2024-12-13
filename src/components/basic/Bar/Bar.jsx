import React from 'react';
import './style.css';

const Bar = ({
  width,
  height,
  val,
  stateA,
  stateB,
  stateC,
  stateD,
  sorted,
  style
}) => {
  const getClassNames = () => {
    const classes = ['Bar'];
    if (sorted) classes.push('Bar_sorted');
    if (stateD) classes.push('Bar_stateD');
    else if (stateC) classes.push('Bar_stateC');
    else if (stateB) classes.push('Bar_stateB');
    else if (stateA) classes.push('Bar_stateA');
    return classes.join(' ');
  };

  const getBarStyle = () => {
    const baseStyle = { ...style, width: `${width}%`, height: `${height}%` };
    if (stateA || stateB || stateC || stateD) {
      baseStyle.marginRight = `${0.3 * width}%`;
      baseStyle.marginLeft = `${0.3 * width}%`;
    }
    return baseStyle;
  };

  return (
    <div style={getBarStyle()} className={getClassNames()}>
      <span className="Bar__Text">{val}</span>
    </div>
  );
};

export default Bar;
