import transpose from "./transpose";

describe("transpose", () => {
  it("transposes a vector", () => {
    const a = [[1, 2, 3, 4, 5]];
    const b = transpose(a);
    expect(b).toEqual([[1], [2], [3], [4], [5]]);
  });

  it("transposes a matrix", () => {
    const M = [
      [1, 2, 3, 4, 5],
      [4, 5, 6, 7, 8],
      [7, 8, 9, 10, 11],
    ];
    const N = transpose(M);
    expect(N).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [4, 7, 10],
      [5, 8, 11],
    ]);
  });
});
