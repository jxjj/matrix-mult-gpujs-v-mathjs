import { Point } from "./types";
import getTestResultsFor from "./testWorker/getTestResultsFor";
import * as actions from "./actions";

async function runAllTests(dataSet: Point[]) {
  for (let n = 50; n <= dataSet.length; n += 50) {
    // run test on the first n elements
    const payload = await getTestResultsFor(dataSet.slice(0, n));
    postMessage({
      type: "WORKER_RESULTS_COMPLETE",
      payload,
    });
  }
}

// Message Router
onmessage = ({ data }) => {
  if (data.type === actions.START_ALL_TESTS) {
    console.log("Starting all tests");
    runAllTests(data.payload);
  }
};
