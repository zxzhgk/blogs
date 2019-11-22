const Koa = require('koa')
var compress = require('koa-compress')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const static = require('koa-static');
require('./app/lib/soket.js')
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(compress({
    filter: function (content_type) {
        // console.log(content_type)
        return /text|javascript|json/i.test(content_type)
    },
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH
  }))
app.use(cors())
app.use(catchError)
app.use(parser())
// 配置静态web服务的中间件chat
app.use(static(__dirname+"/web/")); // 前端
app.use(static(__dirname+"/blog/")); // 前端 vue-cli 3.0
app.use(static(__dirname+"/admin/")); // 后端
InitManager.initCore(app)

app.listen(3000)
