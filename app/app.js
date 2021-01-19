const Router = require('koa-router')
const Koa = require('koa')
const app = new Koa()
const router = new Router()

let total = {}
let start = false

router.get('/updatecount', (ctx) => {
    if (!start) {
        ctx.body = '活动尚未开始'
        return
    }
    const { name, count } = ctx.query
    if (!Number.isNaN(+count)) {
        total[name] = +count
    } else {
        console.log(name, count)
    }
    ctx.body = `${name} : ${count}`
})
router.get('/getcount', (ctx) => {
    ctx.body = total
})
router.get('/start', (ctx) => {
    start = true
    setTimeout(() => {
        start = false
    }, 30 * 1000)
    ctx.body = '活动已启动'
})
app.use(router.routes())
// 监听端口
app.listen(3000, () => {
    console.log('服务器已启动，http://localhost:3000')
})
