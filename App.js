import React from "./snowpack/pkg/react.js";
import * as ReactDOM from "./snowpack/pkg/react-dom.js";
import {useDispatch, useSelector, Provider} from "./snowpack/pkg/react-redux.js";
import store from "./store.js";
import handleTestWorkerLaunch from "./testWorker/handleTestWorkerLaunch.js";
const TableRow = ({size, mathjsTime, gpujsTime}) => {
  return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, size), /* @__PURE__ */ React.createElement("td", null, mathjsTime.toFixed(2)), /* @__PURE__ */ React.createElement("td", null, gpujsTime.toFixed(2)));
};
const App = () => {
  const testResults = useSelector(({testResults: testResults2}) => testResults2);
  const dispatch = useDispatch();
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "GPU.js vs. Math.js"), /* @__PURE__ */ React.createElement("p", null, "Testing Matrix Multiplication using", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://mathjs.org/docs/index.html"
  }, "Math.js"), " and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://gpu.rocks/"
  }, "GPU.js")), /* @__PURE__ */ React.createElement("button", {
    onClick: () => handleTestWorkerLaunch({dispatch})
  }, "Launch Test Worker"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Data Set Size"), /* @__PURE__ */ React.createElement("th", null, "Mathjs Time (ms)"), /* @__PURE__ */ React.createElement("th", null, "GPU.js Time (ms)"))), /* @__PURE__ */ React.createElement("tbody", null, testResults.map((result) => /* @__PURE__ */ React.createElement(TableRow, {
    key: result.size,
    ...result
  })))));
};
const rootElement = document.getElementById("app");
ReactDOM.render(/* @__PURE__ */ React.createElement(Provider, {
  store
}, /* @__PURE__ */ React.createElement(App, null)), rootElement);
