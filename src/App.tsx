import React from "react";
import Worker from "web-worker";
import { useDispatch, useSelector } from "react-redux";
import dataSet from "./data/data.js";
import {
  RootState,
  START_ALL_TESTS,
  TestResults,
  TEST_COMPLETE,
} from "./store";

function handleTestLaunch({ dispatch }) {
  const worker = new Worker("./worker.js", { type: "module" });

  worker.postMessage({
    type: START_ALL_TESTS,
    payload: dataSet,
  });

  worker.onmessage = (e) => {
    const { payload } = e.data;
    dispatch({ type: TEST_COMPLETE, payload });
  };
}

const TableRow = ({ size, mathjsTime, gpujsTime }: TestResults) => {
  return (
    <tr>
      <td>{size}</td>
      <td>{mathjsTime.toFixed(2)}</td>
      <td>{gpujsTime.toFixed(2)}</td>
    </tr>
  );
};

const App = () => {
  const testResults = useSelector(({ testResults }: RootState) => testResults);
  const dispatch = useDispatch();

  return (
    <main>
      {/* <h1>GPU.js vs Mathjs Tests</h1>
      <button onClick={() => runAllTests({ dispatch })}>Run Tests</button> */}
      <button onClick={() => handleTestLaunch({ dispatch })}>
        Launch Test Worker
      </button>
      <table>
        <thead>
          <tr>
            <th>Data Set Size</th>
            <th>Mathjs Time (ms)</th>
            <th>GPU.js Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((result) => (
            <TableRow key={result.size} {...result} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default App;
