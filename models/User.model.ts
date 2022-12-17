// Dependencies
import * as bcrypt from 'bcrypt'

// Config
import PG from '/config/database.ts'
import { DB_INTERNAL_ERROR, DB_SUCCESSFUL_REQUEST } from '/config/status-messages.ts'

// Types
import { StatusMessage } from '/types/status-messages.d.ts'

class User {
  private username: string

  constructor(username: string) {
    this.username = username
  }

  public save = async (password: string): Promise<StatusMessage> => {
    const query = 'INSERT INTO users (username, password) values ($1, $2)'
    const args: Array<string> = [this.username, await this.hashPassword(password)]

    try {
      await PG.queryObject(query, args)
      return DB_SUCCESSFUL_REQUEST
    } catch (_error) {
      throw DB_INTERNAL_ERROR
    }
  }

  private hashPassword = async (password: string) => {
    const salt: string = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)
  }
}

export default User
