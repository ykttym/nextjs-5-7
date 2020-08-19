const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

// Next请求处理函数
const handle = app.getRequestHandler()

// ssr缓存
const ssrCache = cacheableResponse({
  // 缓存保持时间，过时刷新
  ttl: 1000 * 10, // 10s
  // 创建当前路由的缓存
  get: async ({ req, res }) => {
    // 渲染页面
    const data = await app.renderToHTML(req, res, req.path, {
      ...req.query,
      ...req.params,
    })

    // 如果404就不需要缓存了，直接返回
    if (res.statusCode === 404) {
      res.end(data)
      return
    }

    // 输出data看下是什么
    console.log('cache data: ', data)
    return { data }
  },
  // 响应
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  // 创建服务
  const server = express()
  
  // /book 使用ssr缓存
  server.get('/book', (req, res) => {
    return ssrCache({ req, res })
  })
  // 让Next来处理路由
  server.get('*', (req, res) => handle(req, res))

  // 启动服务
  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${3000}`)
  })
})