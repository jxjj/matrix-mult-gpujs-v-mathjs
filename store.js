import {createStore} from "./_snowpack/pkg/redux.js";
import * as actions from "./actions.js";
const initialState = {
  testResults: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TEST_COMPLETE:
      return {
        ...state,
        testResults: [...state.testResults, action.payload]
      };
    case actions.CLEAR_ALL_TEST_RESULTS:
      return {
        ...state,
        testResults: []
      };
    default:
      return state;
  }
}
const store = createStore(rootReducer);
export default store;
