import * as marky from "marky";
import transpose from "../matrix/transpose";
import createBasisMatrix from "../matrix/createBasisMatrix";
import gpuMultiply from "../matrix/gpujs-multiply";
import { multiply } from "mathjs";
import { Point, TestResults } from "../types";

const testRunner = (name: string, fn: Function): Promise<number> =>
  new Promise((resolve) => {
    marky.mark(name);
    fn();
    const { duration } = marky.stop(name);
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    resolve(duration);
  });

export default async function getTestResultsFor(
  data: Point[]
): Promise<TestResults> {
  return new Promise(async (resolve) => {
    const A = createBasisMatrix(data);
    const B = transpose(A);

    const mathjsTime = await testRunner("mathjsTime", () => multiply(A, B));
    const gpujsTime = await testRunner("gpujsTime", () => gpuMultiply(A, B));

    resolve({ size: data.length, mathjsTime, gpujsTime });
  });
}
