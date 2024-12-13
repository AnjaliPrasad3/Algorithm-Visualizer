import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Bar from '../../basic/Bar/Bar';

const getListOfBars = (
  numbers,
  maxNum,
  groupA,
  groupB,
  groupC,
  groupD,
  sortedIndices
) => {
  return numbers.map((num, i) => {
    const width = 100 / numbers.length;
    const height = (num / maxNum) * 100;
    const stateA = groupA.includes(i);
    const stateB = groupB.includes(i);
    const stateC = groupC.includes(i);
    const stateD = groupD.includes(i);
    const sorted = sortedIndices.includes(i);
    const margin = i === numbers.length ? '0' : width > 3 ? '0.5rem' : '0.125rem';

    return (
      <Bar
        key={`${i}_${num}`}
        width={width}
        height={height}
        val={width > 4 ? num : null}
        stateA={stateA}
        stateB={stateB}
        stateC={stateC}
        stateD={stateD}
        sorted={sorted}
        style={{ marginRight: margin }}
      />
    );
  });
};

const SortChart = ({
  numbers = [],
  maxNum = 1,
  groupA = [],
  groupB = [],
  groupC = [],
  groupD = [],
  sortedIndices = []
}) => (
  <div className="SortChart">
    {getListOfBars(
      numbers,
      maxNum,
      groupA,
      groupB,
      groupC,
      groupD,
      sortedIndices
    )}
  </div>
);

SortChart.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxNum: PropTypes.number.isRequired,
  groupA: PropTypes.arrayOf(PropTypes.number),
  groupB: PropTypes.arrayOf(PropTypes.number),
  groupC: PropTypes.arrayOf(PropTypes.number),
  groupD: PropTypes.arrayOf(PropTypes.number),
  sortedIndices: PropTypes.arrayOf(PropTypes.number),
};

export default SortChart;
