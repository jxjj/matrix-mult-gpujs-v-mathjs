import getTestResultsFor from "./getTestResultsFor.js";
import * as actions from "../actions.js";
async function runAllTests(dataSet) {
  for (let n = 50; n <= dataSet.length; n += 50) {
    const payload = await getTestResultsFor(dataSet.slice(0, n));
    postMessage({
      type: "WORKER_RESULTS_COMPLETE",
      payload
    });
  }
}
onmessage = ({data}) => {
  if (data.type === actions.START_ALL_TESTS) {
    console.log("Starting all tests");
    runAllTests(data.payload);
  }
};
