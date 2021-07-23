import * as marky from "marky";
import dataSet from "./data/data";
import transpose from "./ops/transpose";
import createBasisMatrix from "./ops/createBasisMatrix";
import gpuMultiply from "./gpujs-multiply";
import { multiply } from "mathjs";
import {
  TEST_COMPLETE,
  CLEAR_ALL_TEST_RESULTS,
  TestResults,
  PayloadAction,
} from "./store";
import { Dispatch } from "react";
import { Action } from "redux";

const testRunner = (name: string, fn: Function): Promise<number> =>
  new Promise((resolve, reject) => {
    marky.mark(name);
    fn();
    const { duration } = marky.stop(name);
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    resolve(duration);
  });

interface Point {
  x: number;
  y: number;
}

async function getTestResultsFor(data: Point[]): Promise<TestResults> {
  return new Promise(async (resolve, reject) => {
    const A = createBasisMatrix(data);
    const B = transpose(A);

    const mathjsTime = await testRunner("mathjsTime", () => multiply(A, B));
    const gpujsTime = await testRunner("gpujsTime", () => gpuMultiply(A, B));

    resolve({ size: data.length, mathjsTime, gpujsTime });
  });
}

export default async function runAllTests({
  dispatch,
}: {
  dispatch: Dispatch<Action | PayloadAction<TestResults>>;
}) {
  dispatch({ type: CLEAR_ALL_TEST_RESULTS });
  for (let n = 50; n < dataSet.length; n += 50) {
    // run test on the first n elements
    const payload = await getTestResultsFor(dataSet.slice(0, n));
    dispatch({ type: TEST_COMPLETE, payload });
  }
}
