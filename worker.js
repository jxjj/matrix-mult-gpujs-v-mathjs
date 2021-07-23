import getTestResultsFor from "./testWorker/getTestResultsFor.js";
import * as actions from "./actions.js";
async function runAllTests(dataSet) {
  for (let n = 100; n <= dataSet.length; n += 100) {
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
