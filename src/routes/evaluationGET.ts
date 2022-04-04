import * as core from 'express-serve-static-core'
import routeErrorBoundary from '../util/routeErrorBoundary.js'
import fetch from 'node-fetch'

type Speech = {
  Speaker: string
  Topic: string
  Date: string
  Words: string
}

export default async function getEvaluationRoute(app: core.Express) {
  try {
    /**
     * @swagger
     * /evalutation:
     *  get:
     *    parameters:
     *      - in: query
     *        name: url
     *        schema:
     *        type: string
     *        description: link to a csv file
     *    description: You can call this route like http://localhost:3000/evalutation?url=http://localhost:4000/testfile.csv&url=http://localhost:4000/testfile2.csv
     *    responses:
     *      200:
     *        description: 200 successfully returned result
     *      400:
     *        description: 400 url parameters might be wrong
     *      500:
     *        description: 500 something went wrong on the server side
     */
    app.get(
      '/evalutation',
      routeErrorBoundary(async (req, res: any) => {
        if (!req.query.url) {
          res
            .status(400)
            .send(JSON.stringify({ message: 'please provide an url parameter to fetch.' }))

          return
        }

        const files =
          typeof req.query.url === 'string' ? [req.query.url] : (req.query.url as Array<string>)

        /**
         * used to store the csv rows that have been read
         */
        let speeches: Array<Speech> = []

        for await (const file of files) {
          const response = await fetch(file)

          if (!response.ok) {
            console.warn(`${file} could not be fetched.`)
          } else {
            speeches = [...speeches, ...csvToArray(await response.text())]
          }
        }

        res.status(200).send(JSON.stringify(evaluateSpeeches(speeches)))
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

function evaluateSpeeches(
  speeches: Array<Speech>,
  filteredYear = '2013',
  filteredTopic = 'Internal Security',
) {
  const result: {
    mostSpeeches: string | null
    mostSecurity: string | null
    leastWordy: string | null
  } = {
    mostSpeeches: null,
    mostSecurity: null,
    leastWordy: null,
  }

  let leastWords = Number.MAX_SAFE_INTEGER
  const speechCounter: Record<string, number> = {}
  const topicCounter: Record<string, number> = {}
  speeches.forEach(speech => {
    try {
      // count speeches of speaker
      if (speech.Date.includes(filteredYear)) {
        // we don't need to convert to a date
        if (speechCounter[speech.Speaker]) {
          speechCounter[speech.Speaker]++
        } else {
          speechCounter[speech.Speaker] = 1
        }
      }

      // filter by topic
      if (speech.Topic.includes(filteredTopic)) {
        // I am strict here
        if (topicCounter[speech.Speaker]) {
          topicCounter[speech.Speaker]++
        } else {
          topicCounter[speech.Speaker] = 1
        }
      }

      // get speaker with fewest words
      if (leastWords > Number(speech.Words)) {
        result.leastWordy = speech.Speaker
        leastWords = Number(speech.Words)
      }
    } catch (error) {
      console.warn(error)
    }
  })

  let currentMostSomething = -1
  Object.entries(speechCounter).forEach(([speaker, speeches]) => {
    if (currentMostSomething < speeches) {
      currentMostSomething = speeches
      result.mostSpeeches = speaker
    }
  })

  Object.entries(topicCounter).forEach(([speaker, speeches]) => {
    if (currentMostSomething < speeches) {
      currentMostSomething = speeches
      result.mostSecurity = speaker
    }
  })

  return result
}

function csvToArray(str: string, delimiter = ','): Array<Speech> {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter) as Array<keyof Speech>
  headers[headers.length - 1] = headers[headers.length - 1].replace(
    /(\r\n|\n|\r)/gm,
    '',
  ) as keyof Speech

  const rows = str.slice(str.indexOf('\n') + 1).split('\n')

  const arr = rows.map(function (row) {
    const values = row.replace(/(\r\n|\n|\r)/gm, '').split(delimiter)
    const item = {} as Speech

    headers.forEach((header, index) => {
      item[header] = values[index]
    })

    return item
  })

  return arr as unknown as Array<Speech>
}
