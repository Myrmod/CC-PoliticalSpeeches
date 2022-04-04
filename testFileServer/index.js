import http from 'http'

import nStatic from 'node-static'

const fileServer = new nStatic.Server('./testFileServer/public')

http
  .createServer(function (req, res) {
    fileServer.serve(req, res)
  })
  .listen(4000)
