import * as __SNOWPACK_ENV__ from './_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "./_snowpack/pkg/react.js";
import * as ReactDOM from "./_snowpack/pkg/react-dom.js";
import {useDispatch, useSelector, Provider} from "./_snowpack/pkg/react-redux.js";
import store from "./store.js";
import handleTestWorkerLaunch from "./testWorker/handleTestWorkerLaunch.js";
const workerURL = new URL(`./worker.js`, import.meta.url);
const worker = new Worker(workerURL, {type: "module"});
const TableRow = ({size, mathjsTime, gpujsTime}) => {
  return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, size), /* @__PURE__ */ React.createElement("td", null, mathjsTime.toFixed(2)), /* @__PURE__ */ React.createElement("td", null, gpujsTime.toFixed(2)));
};
const App = () => {
  const testResults = useSelector(({testResults: testResults2}) => testResults2);
  const dispatch = useDispatch();
  return /* @__PURE__ */ React.createElement("div", {
    className: "app"
  }, /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/jxjj/matrix-mult-gpujs-v-mathjs/tree/main"
  }, "Source on Github")), /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("h1", null, "GPU.js vs. Math.js")), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("p", null, "Testing Matrix Multiplication using", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://mathjs.org/docs/index.html"
  }, "Math.js"), " and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://gpu.rocks/"
  }, "GPU.js")), /* @__PURE__ */ React.createElement("p", null, "For n = 100, 200, ..., 1000"), /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", null, "Creates a matrix M of size n^2 using random data, and its transpose M'."), /* @__PURE__ */ React.createElement("li", null, "Times how long M · M' takes.")), /* @__PURE__ */ React.createElement("button", {
    onClick: () => handleTestWorkerLaunch({dispatch, worker})
  }, "Launch Test Worker"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Data Set Size"), /* @__PURE__ */ React.createElement("th", null, "Mathjs Time (ms)"), /* @__PURE__ */ React.createElement("th", null, "GPU.js Time (ms)"))), /* @__PURE__ */ React.createElement("tbody", null, testResults.map((result) => /* @__PURE__ */ React.createElement(TableRow, {
    key: result.size,
    ...result
  }))))));
};
const rootElement = document.getElementById("app");
ReactDOM.render(/* @__PURE__ */ React.createElement(Provider, {
  store
}, /* @__PURE__ */ React.createElement(App, null)), rootElement);
