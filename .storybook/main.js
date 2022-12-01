module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "webpack5",
    options: {
      lazyCompilation: true,
      fsCache: true,
    },
  },
  features: {
    storyStoreV7: true,
  },
  framework: "@storybook/react",
};
