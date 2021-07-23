import * as __SNOWPACK_ENV__ from '../snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import * as actions from "../actions.js";
import createRandomDataSet from "./createRandomDataSet.js";
const workerURL = new URL("./worker.js", import.meta.url);
const worker = new Worker(workerURL, {type: "module"});
export default function handleTestWorkerLaunch({
  dispatch
}) {
  dispatch({type: actions.CLEAR_ALL_TEST_RESULTS});
  worker.postMessage({
    type: actions.START_ALL_TESTS,
    payload: createRandomDataSet(1e3)
  });
  worker.onmessage = (e) => {
    const {payload} = e.data;
    dispatch({type: actions.TEST_COMPLETE, payload});
  };
}
