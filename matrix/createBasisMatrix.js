const getAllXs = (points) => points.map((p) => p.x);
const pos = (x) => Math.max(x, 0);
const createBasisArray = (x, data) => [
  1,
  x,
  x ** 2,
  x ** 3,
  ...getAllXs(data).map((x_k) => pos(x - x_k) ** 3)
];
const createBasisMatrix = (data) => getAllXs(data).map((x) => createBasisArray(x, data));
export default createBasisMatrix;
