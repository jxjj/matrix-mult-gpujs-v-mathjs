export default (matrix) => {
  const result = [];
  const resultRows = matrix[0].length;
  const resultCols = matrix.length;
  for (let row = 0; row < resultRows; row++) {
    result[row] = [];
    for (let col = 0; col < resultCols; col++) {
      result[row][col] = matrix[col][row];
    }
  }
  return result;
};
