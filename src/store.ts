import { createStore } from "redux";

// ACTIONS
export const START_ALL_TESTS = "START_ALL_TESTS";
export const TEST_COMPLETE = "TEST_COMPLETE";
export const CLEAR_ALL_TEST_RESULTS = "TEST_CLEAR";

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

const initialState: RootState = {
  testResults: [],
};

function rootReducer(
  state = initialState,
  action: PayloadAction<TestResults>
): RootState {
  switch (action.type) {
    case TEST_COMPLETE:
      return {
        ...state,
        testResults: [...state.testResults, action.payload],
      };
    case CLEAR_ALL_TEST_RESULTS:
      return {
        ...state,
        testResults: [],
      };
    default:
      return state;
  }
}

// a redux-style store for holding our app data
const store = createStore(rootReducer);

export default store;
