import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./AppDark.css";

import AppControls from "./components/structural/AppControls/AppControls";
import Footer from "./components/structural/Footer/Footer";
import AppDrawer from "./components/functional/AppDrawer/AppDrawer";
import SortVisualizer from "./components/functional/SortVisualizer/SortVisualizer";
import TopBar from "./components/functional/TopBar/TopBar";

import BubbleSort, {
  BubbleSortDesc,
  BubbleSortKey,
} from "./algorithms/bubbleSort";
import InsertionSort, {
  InsertionSortDesc,
  InsertionSortKey,
} from "./algorithms/insertionSort";
import MergeSort, { MergeSortDesc, MergeSortKey } from "./algorithms/mergeSort";
import QuickSort, { QuickSortDesc, QuickSortKey } from "./algorithms/QuickSort";
import SelectionSort, {
  SelectionSortDesc,
  SelectionSortKey,
} from "./algorithms/SelectionSort";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [trace, setTrace] = useState([]);
  const [algorithm, setAlgorithm] = useState(null);
  const [appDrawerOpen, setAppDrawerOpen] = useState(false);

  const ALGORITHM = {
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Insertion Sort": InsertionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
  };

  const ALGORITHM_KEY = {
    "Bubble Sort": BubbleSortKey,
    "Selection Sort": SelectionSortKey,
    "Insertion Sort": InsertionSortKey,
    "Merge Sort": MergeSortKey,
    "Quick Sort": QuickSortKey,
  };

  const ALGORITHM_DESC = {
    "Bubble Sort": BubbleSortDesc,
    "Selection Sort": SelectionSortDesc,
    "Insertion Sort": InsertionSortDesc,
    "Merge Sort": MergeSortDesc,
    "Quick Sort": QuickSortDesc,
  };

  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max)) + 1;

  const generateRandomArray = useCallback(() => {
    const newArray = Array(arraySize)
      .fill(0)
      .map(() => getRandomInt(arraySize * 5));
    setArray(newArray);
    setTrace([]);
  }, [arraySize]);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  useEffect(() => {
    if (algorithm) {
      const numbers = [...array];
      const sort = ALGORITHM[algorithm];
      if (sort) {
        const newTrace = sort(numbers);
        setTrace(newTrace);
      }
    }
  }, [algorithm, array]);

  const handleAlgorithmChange = (algorithm) => {
    setAlgorithm(algorithm);
    generateRandomArray();
  };

  const handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 100 ? 100 : size < 0 ? 0 : size;
    setArraySize(size);
    generateRandomArray();
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleAppDrawer = () => {
    setAppDrawerOpen((prevState) => !prevState);
  };

  let theme = `App`;
  if (darkMode) theme += ` App_dark`;
  if (appDrawerOpen) theme += ` App_modal_open`;

  const colorKey = ALGORITHM_KEY[algorithm];
  const desc = ALGORITHM_DESC[algorithm];

  const controls = (
    <AppControls
      onGenerateRandomArray={generateRandomArray}
      algorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
      arraySize={arraySize}
      onArraySizeChange={handleArraySizeChange}
    />
  );

  return (
    <div className={theme}>
      <TopBar
        drawerOpen={appDrawerOpen}
        toggleDrawer={toggleAppDrawer}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      >
        {controls}
      </TopBar>

      <AppDrawer open={appDrawerOpen} closeDrawer={toggleAppDrawer}>
        {controls}
      </AppDrawer>

      <main className="App__Body">
        <SortVisualizer
          array={array}
          trace={trace}
          colorKey={colorKey}
          desc={desc}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
