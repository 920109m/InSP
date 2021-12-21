const { override, addWebpackAlias } = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");
const path = require("path");

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          /**
           * add to antd custom theme / ant 디자인 테마 커스텀
           */
          //color
          "@green-base": "#45C295",
          "@primary-color": "@green-6",
          // "@link-color": "@green-6",
          // "@success-color": "#52c41a", // success state color
          // "@warning-color": "#faad14", // warning state color
          // "@error-color": "#f5222d", // error state color
          // "@font-size-base": "14px;", // major text font size
          // "@heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
          // "@text-color": "rgba(0, 0, 0, 0.65)", // major text color
          // "@text-color-secondary": " rgba(0, 0, 0, 0.45)", // secondary text color
          // "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
          // "@border-radius-base": "2px", // major border radius
          // "@border-color-base": "#d9d9d9", // major border color
          // "@box-shadow-base": `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)`, // major shadow for layers
        },
      },
    },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  })
);

/**
 * 웹팩 구성 요소 확인용
 *  */
// const { override, addWebpackPlugin } = require("customize-cra");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// module.exports = override(addWebpackPlugin(new BundleAnalyzerPlugin()));
