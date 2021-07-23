import { Point } from "../types";

const getAllXs = (points: Point[]) => points.map((p) => p.x);
const pos = (x: number) => Math.max(x, 0);

const createBasisArray = (x: number, data: Point[]): number[] => [
  1,
  x,
  x ** 2,
  x ** 3,
  ...getAllXs(data).map((x_k) => pos(x - x_k) ** 3),
];

/**
 * creates a matrix, X, of basis functions
 * using x values from our data set.
 * We'll need this when solving for betas.
 */
const createBasisMatrix = (data: Point[]): number[][] =>
  getAllXs(data).map((x) => createBasisArray(x, data));

export default createBasisMatrix;
