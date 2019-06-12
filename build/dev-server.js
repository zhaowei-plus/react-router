const opn = require('opn'); // 返回生成的子进程的promise
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const debug = require('debug')('config:dev-server')

const express = require('express');

debug('设置server启动配置');
const port = 8000;

const app = express();

debug('编译webpack配置');
const compiler = webpack(webpackConfig);
debug('webpack编译完成');

debug('将编译流通过webpack-dev-middleware');
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  lazy: false,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
debug('将编译流通过webpack-hot-middleware');
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000,
});

debug('监听HTML文件改变事件')
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
});

debug('设置静态文件托管目录');
app.use('/dist', express.static('public'));

debug('设置代理信息');
require('./dev-proxy')(app);

// console.info('添加history-fallback中间件');
// app.use(require('connect-history-api-fallback')());

debug('添加webpack-dev-middleware中间件');
app.use(devMiddleware);

debug('添加webpack-hot-middleware中间件');
app.use(hotMiddleware);

const uri = `http://localhost:${port}`;

debug('> Starting dev server...');
debug('设置webpack-dev-middleware中间件编译后的回调');

devMiddleware.waitUntilValid(() => {
  debug(`> Listening at ${uri}\n`);
  opn(uri);
});

debug(`server 开始监听端口${port}`);
const server = app.listen(port);
