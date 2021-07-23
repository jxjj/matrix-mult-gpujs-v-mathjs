import * as marky from "marky";
import transpose from "./ops/transpose";
import createBasisMatrix from "./ops/createBasisMatrix";
import gpuMultiply from "./gpujs-multiply";
import { multiply } from "mathjs";
import { TestResults } from "./store";
import { Point } from "./types";

const testRunner = (name: string, fn: Function): Promise<number> =>
  new Promise((resolve, reject) => {
    marky.mark(name);
    fn();
    const { duration } = marky.stop(name);
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    resolve(duration);
  });

export default async function getTestResultsFor(
  data: Point[]
): Promise<TestResults> {
  return new Promise(async (resolve, reject) => {
    const A = createBasisMatrix(data);
    const B = transpose(A);

    const mathjsTime = await testRunner("mathjsTime", () => multiply(A, B));
    const gpujsTime = await testRunner("gpujsTime", () => gpuMultiply(A, B));

    resolve({ size: data.length, mathjsTime, gpujsTime });
  });
}
