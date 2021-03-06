import React from "react";
import * as ReactDOM from "react-dom";
import { useDispatch, useSelector, Provider } from "react-redux";
import store from "./store";
import { RootState, TestResults } from "./types";
import handleTestWorkerLaunch from "./testWorker/handleTestWorkerLaunch";

const workerURL = new URL(`./worker.js`, import.meta.url);
const worker = new Worker(workerURL, { type: "module" });

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
    <div className="app">
      <aside>
        <a href="https://github.com/jxjj/matrix-mult-gpujs-v-mathjs/tree/main">
          Source on Github
        </a>
      </aside>
      <header>
        <h1>GPU.js vs. Math.js</h1>
      </header>
      <main>
        <p>
          Testing Matrix Multiplication using{" "}
          <a href="https://mathjs.org/docs/index.html">Math.js</a> and{" "}
          <a href="https://gpu.rocks/">GPU.js</a>
        </p>
        <p>For n = 100, 200, ..., 1000</p>
        <ol>
          <li>
            Creates a matrix M of size n^2 using random data, and its transpose
            M'.
          </li>
          <li>Times how long M · M' takes.</li>
        </ol>
        <button onClick={() => handleTestWorkerLaunch({ dispatch, worker })}>
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
    </div>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
