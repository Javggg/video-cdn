// Dependencies
import * as bcrypt from 'bcrypt'
import { Payload, create } from 'djwt'

// Config
import PG, { tables } from '/config/database.ts'
import { config, DotenvConfig } from 'dotenv'
import {
  DB_INTERNAL_ERROR,
  DB_SUCCESSFUL_REQUEST,
  LI_USER_OR_PASSWORD_NOT_FOUND
} from '/config/status-messages.ts'

// Types
import { StatusMessage } from '/types/status-messages.d.ts'
import { QueryObjectResult } from 'pg-query-types'

const env: DotenvConfig = config()

class User {
  private username: string

  constructor(username: string) {
    this.username = username
  }

  // TODO: If user already exists, throw error
  public signup = async (password: string): Promise<StatusMessage> => {
    const query = `INSERT INTO ${tables.USERS} (username, password) values ($1, $2)`
    const args: Array<string> = [this.username, await this.hashPassword(password)]

    try {
      await PG.queryObject(query, args)
      return DB_SUCCESSFUL_REQUEST
    } catch (_) {
      throw DB_INTERNAL_ERROR
    }
  }

  public login = async (password: string): Promise<string> => {
    const query = `SELECT id, password FROM ${tables.USERS} WHERE username = $1`
    const args: Array<string> = [this.username]

    interface Result {
      id: number
      password: string
    }

    try {
      const { rows, rowCount }: QueryObjectResult<Result> = await PG.queryObject(query, args)

      if (rowCount === 0) {
        throw LI_USER_OR_PASSWORD_NOT_FOUND
      }

      if (!(await this.comparePassword(password, rows[0].password))) {
        throw LI_USER_OR_PASSWORD_NOT_FOUND
      }

      return await this.generateJWT({
        id: rows[0].id
      })
    } catch (_) {
      throw DB_INTERNAL_ERROR
    }
  }

  private hashPassword = async (password: string) => {
    const salt: string = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)
  }

  private comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
  }

  private generateJWT = async (payload: Payload): Promise<string> => {
    return await create({ alg: 'HS512', typ: 'JWT' }, payload, env.SECRET_KEY)
  }
}

export default User
