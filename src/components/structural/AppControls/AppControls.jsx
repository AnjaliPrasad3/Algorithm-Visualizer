import React from "react";
import PropTypes from "prop-types";
import "./style.css";

import Button from "../../basic/Button/Button";
import Menu from "../Menu/Menu";

const AppControls = ({
  algorithm = "Bubble Sort",
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize = 10,
  onArraySizeChange,
}) => (
  <div className="AppControls">
    <Menu
      placeholder="Sort Algorithm"
      items={[
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
        "Quick Sort",
      ]}
      selected={algorithm}
      onSelect={onAlgorithmChange}
    />

    <div className="AppControls__Size">
      <span>Size</span>
      <Menu
        placeholder="Array Size"
        items={["5", "10", "25", "50", "75", "100"]}
        selected={String(arraySize)}
        onSelect={onArraySizeChange}
      />
    </div>

    <Button className="random" onClick={onGenerateRandomArray}>
      Randomize
    </Button>
  </div>
);

AppControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
};

export default AppControls;
