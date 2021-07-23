import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import runAllTests from "./runAllTests";
import { RootState, TestResults } from "./store";

const TableRow = ({ size, mathjsTime, gpujsTime }: TestResults) => {
  console.log("rerendering table row");
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
  console.log({ testResults });
  const dispatch = useDispatch();

  return (
    <main>
      <h1>GPU.js vs Mathjs Tests</h1>
      <button onClick={() => runAllTests({ dispatch })}>Run Tests</button>
      {JSON.stringify(testResults)}
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
