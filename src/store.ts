import { createStore } from "redux";
import { RootState, PayloadAction, TestResults } from "./types";
import * as actions from "./actions";

const initialState: RootState = {
  testResults: [],
};

function rootReducer(
  state = initialState,
  action: PayloadAction<TestResults>
): RootState {
  switch (action.type) {
    case actions.TEST_COMPLETE:
      return {
        ...state,
        testResults: [...state.testResults, action.payload],
      };
    case actions.CLEAR_ALL_TEST_RESULTS:
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
