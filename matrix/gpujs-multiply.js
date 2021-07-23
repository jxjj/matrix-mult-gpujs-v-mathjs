import {GPU} from "../_snowpack/pkg/gpujs.js";
const gpu = new GPU();
function gpuMultiplyMatrix(a, b) {
  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;
  if (aCols !== bRows) {
    throw Error(`Invalid dimensions for matrix multiplication. Cols of matrix A must equal rows of matrix B. A is ${aRows}x${aCols} and B is ${bRows}x${bCols}.`);
  }
  const multiplyMatrix = gpu.createKernel(function(a2, b2) {
    const row = this.thread.x;
    const col = this.thread.y;
    let sum = 0;
    for (let i = 0; i < this.constants.size; i++) {
      sum += a2[row][i] * b2[i][col];
    }
    return sum;
  }).setOutput([aRows, bCols]).setConstants({size: aCols});
  return multiplyMatrix(a, b);
}
export default gpuMultiplyMatrix;
