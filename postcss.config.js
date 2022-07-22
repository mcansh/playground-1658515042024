const path = require("node:path");
const fse = require("fs-extra");

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {
      // filter: "**/~@fontsource-*/files/*",
      url: (asset) => {
        let { absolutePath } = asset;
        let basename = path.basename(absolutePath);
        let outDir = path.join(
          __dirname,
          "public",
          "build",
          "_assets",
          "fonts"
        );
        let destpath = path.join(outDir, basename);
        if (!fse.pathExistsSync(destpath)) {
          fse.copySync(absolutePath, destpath);
        }
        return "/" + path.join("build", "_assets", "fonts", basename);
      },
    },
  },
};
