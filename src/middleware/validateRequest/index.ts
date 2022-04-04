import { NextFunction, Request } from 'express'
import * as http from 'http'

export default async function (_req: Request, _res: http.ServerResponse, next: NextFunction) {
  next()
}
