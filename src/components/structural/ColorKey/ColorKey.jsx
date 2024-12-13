import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ColorKey = ({ groupA, groupB, groupC, groupD }) => {
  const renderKeyItem = (className, label) => (
    <div className="ColorKey__Item">
      <div className={`ColorKey__Box ${className}`}></div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="ColorKey">
      {groupA || groupB || groupC || groupD
        ? renderKeyItem('ColorKey__Sorted', 'Sorted')
        : renderKeyItem('ColorKey__Unsorted', 'Unsorted')}
      {groupA && renderKeyItem('ColorKey__GroupA', groupA)}
      {groupB && renderKeyItem('ColorKey__GroupB', groupB)}
      {groupC && renderKeyItem('ColorKey__GroupC', groupC)}
      {groupD && renderKeyItem('ColorKey__GroupD', groupD)}
    </div>
  );
};

ColorKey.propTypes = {
  groupA: PropTypes.string,
  groupB: PropTypes.string,
  groupC: PropTypes.string,
  groupD: PropTypes.string
};

export default ColorKey;
