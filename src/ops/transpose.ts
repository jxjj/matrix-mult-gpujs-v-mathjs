export default (matrix: number[][]): number[][] => {
  const result: number[][] = [];
  const resultRows: number = matrix[0].length;
  const resultCols: number = matrix.length;
  for (let row = 0; row < resultRows; row++) {
    result[row] = [];
    for (let col = 0; col < resultCols; col++) {
      result[row][col] = matrix[col][row];
    }
  }
  return result;
};
