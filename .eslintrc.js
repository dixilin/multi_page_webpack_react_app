module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "global-require": 0,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ['@', './src/'],
        ]
      }
    }
  }
};
