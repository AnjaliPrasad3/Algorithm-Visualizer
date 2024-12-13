import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

import SortChart from '../SortChart/SortChart';
import VisualizerControls from '../../structural/VisualizerControls/VisualizerControls';
import ProgressBar from '../../structural/ProgressBar/ProgressBar';
import ColorKey from '../../structural/ColorKey/ColorKey';
import SortInfo from '../../structural/SortInfo/SortInfo';

const SortVisualizer = ({ array: propArray, trace: propTrace, colorKey, desc }) => {
  const [trace, setTrace] = useState([]);
  const [traceStep, setTraceStep] = useState(-1);

  const [originalArray, setOriginalArray] = useState([]);
  const [array, setArray] = useState([]);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [groupD, setGroupD] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const [timeoutIds, setTimeoutIds] = useState([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (propArray !== array) {
      reset(propArray);
    }
  }, [propArray]);

  useEffect(() => {
    if (propTrace !== trace) {
      clearTimeouts();
      setTrace(propTrace);
    }
  }, [propTrace]);

  const reset = (array) => {
    setArray(array);
    setTrace([]);
    setTraceStep(-1);
    setGroupA([]);
    setGroupB([]);
    setGroupC([]);
    setGroupD([]);
    setSortedIndices([]);
    setOriginalArray([...array]);
  };

  const clearTimeouts = useCallback(() => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    setTimeoutIds([]);
  }, [timeoutIds]);

  const changeVisualState = useCallback((visualState) => {
    setArray(visualState.array);
    setGroupA(visualState.groupA);
    setGroupB(visualState.groupB);
    setGroupC(visualState.groupC);
    setGroupD(visualState.groupD);
    setSortedIndices(visualState.sortedIndices);
  }, []);

  const run = (trace) => {
    const newTimeoutIds = [];
    const timer = 250 / playbackSpeed;

    trace.forEach((item, i) => {
      const timeoutId = setTimeout(() => {
        setTraceStep((prevStep) => {
          changeVisualState(item);
          return prevStep + 1;
        });
      }, i * timer);

      newTimeoutIds.push(timeoutId);
    });

    const finalTimeoutId = setTimeout(clearTimeouts, trace.length * timer);
    newTimeoutIds.push(finalTimeoutId);

    setTimeoutIds(newTimeoutIds);
  };

  const pause = () => {
    clearTimeouts();
  };

  const continueRun = () => {
    const remainingTrace = trace.slice(traceStep);
    run(remainingTrace);
  };

  const stepForward = () => {
    if (traceStep < trace.length - 1) {
      const nextItem = trace[traceStep + 1];
      setTraceStep(traceStep + 1);
      changeVisualState(nextItem);
    }
  };

  const stepBackward = () => {
    if (traceStep > 0) {
      const prevItem = trace[traceStep - 1];
      setTraceStep(traceStep - 1);
      changeVisualState(prevItem);
    }
  };

  const repeat = () => {
    clearTimeouts();
    setArray([...originalArray]);
    setTraceStep(-1);
    run(trace);
  };

  const adjustPlaybackSpeed = (speed) => {
    const speedValue = Number(speed.split('x')[0]);
    const wasPlaying = timeoutIds.length > 0;
    pause();
    setPlaybackSpeed(speedValue);
    if (wasPlaying) continueRun();
  };

  return (
    <div className="SortVisualizer">
      <SortChart
        numbers={array}
        maxNum={Math.max(...array)}
        groupA={groupA}
        groupB={groupB}
        groupC={groupC}
        groupD={groupD}
        sortedIndices={sortedIndices}
      />

      <div className="SortVisualizer__ProgressBar">
        <ProgressBar
          width={
            trace.length > 0
              ? (traceStep / (trace.length - 1)) * 100
              : 0
          }
        />
      </div>

      <VisualizerControls
        onPlay={
          traceStep === -1
            ? () => run(trace)
            : continueRun
        }
        onPause={pause}
        onForward={stepForward}
        onBackward={stepBackward}
        onRepeat={repeat}
        onAdjustSpeed={adjustPlaybackSpeed}
        playing={timeoutIds.length > 0}
        playDisabled={
          (traceStep >= trace.length - 1 && traceStep !== -1) ||
          trace.length <= 0
        }
        forwardDisabled={traceStep >= trace.length - 1}
        backwardDisabled={traceStep <= 0}
        repeatDisabled={traceStep <= 0}
        playbackSpeed={playbackSpeed}
      />

      <ColorKey {...colorKey} />

      <SortInfo {...desc} />
    </div>
  );
};

export default SortVisualizer;
