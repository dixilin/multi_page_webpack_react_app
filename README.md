# multi_page_webpack_react_app

基于webpack4配置的多页面react项目、开箱即用的脚手架。默认配置为react+less，可根据需求自行修改（vue、jq，sass、stylus等），也可自行修改为单页面应用。

## 使用

请使用yarn进行包管理

如果是第一次打包未有根目录未有dll文件夹请先执行yarn dll后再执行build；若使用新增外部资源库，则需重 
新执行yarn dll。如果不想使用dll，请删除webpack相关dll代码(内有注释)，删除后也可正常运行。

```
//安装依赖
yarn install

//开发环境
yarn start

//打包
yarn build

//eslint校验
yarn lint

//eslint校验并修正
yarn lint-fix

//dll打包第三方库
yarn dll
```

## 目录结构

```
.
├── build (webpack配置文件夹)
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   ├── webpack.dll.js
│   └── webpack.prod.js
├── dist (打包输出后的文件夹)
│   ├── lib (dll映射出来的文件夹lib)
│	│	├── react.js
|	|	├── reactDOM.js
│   ├── static (打包后的静态资源文件)
│	│	├── css
|	|	├── js
|	|	├── img
│   ├── index.html (打包后的index页面)
│   └── search.html (打包后的search页面)
├── dll (dll分割出的文件夹)
│   ├── manifest.json
│   ├── react.js
│   └── reactDOM.js
├── src
│   ├── img
│   │   └── demo.jpg
│   ├── utils 
│   │   └── common.js
│   └── views (存放页面的文件夹)
│   │   ├── index (存放首页资源的文件夹)
│   │   │   ├── demo.jsx
│   │   │   ├── demo.less
│   │   │   ├── index.html (首页html)
│   │   │   ├── index.js (首页主入口)
│   │   |   └── lazyload.js
│   │   └── search (存放搜索页面资源的文件夹)
│   │   │   ├── index.html (搜索页html)
│   │   │   └── index.js (搜索页主入口)
│   ├── .babelrc
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   └── README.md
```

### 注意：

1. build打包默认使用了dll打包react和react-dom，若不想使用dll，直接删除dll相关代码即可（内有注释），并不会影响正常运行。若想使用外链cdn，根据webpack的外部扩展externals自行修改本脚手架。

2. 默认在启动开发环境和打包的时候都会进行eslint校验并修正，可根据需求自行选择是否关闭，删除package.json下的scripts中的dev、build的npm run lint-fix &&即可。也可自行配置git提交前进行eslint校验

3. 默认引入了手淘的lib-flexible以及使用了px2rem-loader，可自动设置根标签的font-size以及px自动转rem。若不需要，请自行删除相关代码。

4. 每个页面的模板页面都默认为src/views/*/index.html

   每个页面入口js都默认为src/views/*/index.js

   若需修改目录结构，可自行修改webpack.base.js里的setMPA方法的入口及模板路径。