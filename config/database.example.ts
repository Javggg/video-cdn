// Delete .example and fill the config

import { Client } from 'pg'

const PG = new Client({
  user: '',
  database: 'video_cdn',
  password: '',
  hostname: 'localhost',
  port: 5432
})

await PG.connect()

export default PG