import * as actions from "../actions.js";
import createRandomDataSet from "./createRandomDataSet.js";
export default function handleTestWorkerLaunch({
  worker,
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
