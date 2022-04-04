import dotenv from 'dotenv'

enum KEYS {
  PORT,
}

export default {
  ...dotenv.config().parsed,
} as {
  [key in keyof typeof KEYS]: string
}
