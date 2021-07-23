import { Action, Dispatch } from "redux";
import * as actions from "../actions";
import { PayloadAction, TestResults } from "../types";
import createRandomDataSet from "./createRandomDataSet";

const workerURL = new URL("./worker.js", import.meta.url);
const worker = new Worker(workerURL, { type: "module" });

interface handleTestWorkerLaunchParams {
  dispatch: Dispatch<Action | PayloadAction<TestResults>>;
}

export default function handleTestWorkerLaunch({
  dispatch,
}: handleTestWorkerLaunchParams): void {
  dispatch({ type: actions.CLEAR_ALL_TEST_RESULTS });

  worker.postMessage({
    type: actions.START_ALL_TESTS,
    payload: createRandomDataSet(1000),
  });

  worker.onmessage = (e) => {
    const { payload } = e.data;
    dispatch({ type: actions.TEST_COMPLETE, payload });
  };
}
