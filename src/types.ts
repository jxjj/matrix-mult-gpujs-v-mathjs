export interface Point {
  x: number;
  y: number;
}

export interface TestResults {
  size: number;
  mathjsTime: number;
  gpujsTime: number;
}

export interface RootState {
  testResults: TestResults[];
}

export interface PayloadAction<T> {
  type: string;
  payload: T;
}
