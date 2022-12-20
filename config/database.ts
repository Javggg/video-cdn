import { Client } from 'pg'
import { config, DotenvConfig } from 'dotenv'

const env: DotenvConfig = config()

const PG = new Client({
  user: env.PG_USER,
  database: env.PG_DATABASE,
  password: env.PG_PASSWORD,
  hostname: env.PG_HOSTNAME,
  port: env.PG_PORT
})

const tables = {
  USERS: 'users'
}

await PG.connect()

export default PG
export { tables }