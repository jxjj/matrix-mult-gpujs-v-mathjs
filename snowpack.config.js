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
    // need to include a `.nojekyll` file in build
    // if deploying with gh-pages don't forget the
    // `--dotfiles` option to make sure `.nojekyll`
    // is included in the deploy
  },
};
