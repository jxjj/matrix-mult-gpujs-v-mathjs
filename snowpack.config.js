// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    src: "/",
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // github doesn't seem to like `_snowpack` dir
    // see: https://github.com/snowpackjs/snowpack/discussions/2419
    metaUrlPath: "snowpack",
    baseUrl: "/matrix-mult-gpujs-v-mathjs",
  },
};
