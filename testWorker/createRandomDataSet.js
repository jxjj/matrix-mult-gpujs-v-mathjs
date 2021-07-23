const createRandomDataSet = (size = 50) => {
  const dataSet = [];
  for (let i = 0; i < size; i++) {
    dataSet.push({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    });
  }
  return dataSet;
};
export default createRandomDataSet;
