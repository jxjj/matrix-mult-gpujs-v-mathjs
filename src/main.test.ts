import gpuMultiply from "./gpujs-multiply";
import { multiply } from "mathjs";
import createBasisMatrix from "./ops/createBasisMatrix";
import transpose from "./ops/transpose";
import data from "./data/data";

describe("multiplication algorithms", () => {
  it("should give the same results", () => {
    const A = createBasisMatrix(data);
    const B = transpose(A);

    const mathjsMatrix = multiply(A, B);
    const gpuMatrix = gpuMultiply(A, B) as number[][];

    const rows = mathjsMatrix.length;
    const cols = mathjsMatrix[0].length;

    const SIG_FIGS = 6;

    expect(mathjsMatrix.length).toBe(gpuMatrix.length);
    expect(mathjsMatrix[0].length).toBe(gpuMatrix[0].length);
    expect(mathjsMatrix[0][0].toPrecision(SIG_FIGS)).toEqual(
      gpuMatrix[0][0].toPrecision(SIG_FIGS)
    );
    expect(mathjsMatrix[rows - 1][cols - 1].toPrecision(SIG_FIGS)).toEqual(
      gpuMatrix[rows - 1][cols - 1].toPrecision(SIG_FIGS)
    );
  });
});
