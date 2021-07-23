import * as marky from "../snowpack/pkg/marky.js";
import transpose from "../matrix/transpose.js";
import createBasisMatrix from "../matrix/createBasisMatrix.js";
import gpuMultiply from "../matrix/gpujs-multiply.js";
import {multiply} from "../snowpack/pkg/mathjs.js";
const testRunner = (name, fn) => new Promise((resolve) => {
  marky.mark(name);
  fn();
  const {duration} = marky.stop(name);
  console.log(`${name} took ${duration.toFixed(2)}ms`);
  resolve(duration);
});
export default function getTestResultsFor(data) {
  return new Promise(async (resolve) => {
    const A = createBasisMatrix(data);
    const B = transpose(A);
    const mathjsTime = await testRunner("mathjsTime", () => multiply(A, B));
    const gpujsTime = await testRunner("gpujsTime", () => gpuMultiply(A, B));
    resolve({size: data.length, mathjsTime, gpujsTime});
  });
}
