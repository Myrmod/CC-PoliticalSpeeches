import { NextFunction, Request } from 'express'
import * as http from 'http'

const routeErrorBoundary =
  (fn: (req: Request, res: http.ServerResponse, next: NextFunction) => Promise<void>) =>
  (req: Request, res: http.ServerResponse, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      console.error(error)
      next('Unknown Server Error')
    })
  }

export default routeErrorBoundary
