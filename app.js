const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const static = require('koa-static');

const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(parser())
// 配置静态web服务的中间件chat
app.use(static(__dirname+"/web/dist")); // 前端
app.use(static(__dirname+"/admin/dist")); // 后端
InitManager.initCore(app)

app.listen(3000)
