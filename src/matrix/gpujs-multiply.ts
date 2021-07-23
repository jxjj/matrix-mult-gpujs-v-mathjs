import { GPU } from "gpu.js";
const gpu = new GPU();

// Any loops defined inside the kernel must have a
// maximum iteration count defined by the loopMaxIterations setting.

function gpuMultiplyMatrix(a: number[][], b: number[][]): number[][] {
  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;

  if (aCols !== bRows) {
    throw Error(
      `Invalid dimensions for matrix multiplication. Cols of matrix A must equal rows of matrix B. A is ${aRows}x${aCols} and B is ${bRows}x${bCols}.`
    );
  }

  // final matrix size will be aRows * bCols
  const multiplyMatrix = gpu
    .createKernel(function (a: number[][], b: number[][]) {
      // calculate the value for a given row and column
      // value(m,n) = row of m dot product with col n
      // row m and col n must be the same length
      const row = this.thread.x;
      const col = this.thread.y;
      let sum = 0;
      for (let i = 0; i < this.constants.size; i++) {
        sum += a[row][i] * b[i][col];
      }
      return sum;
    })
    .setOutput([aRows, bCols])
    .setConstants({ size: aCols });

  return multiplyMatrix(a, b) as number[][];
}

export default gpuMultiplyMatrix;
