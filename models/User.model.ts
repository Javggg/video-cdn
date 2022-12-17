// Config
import PG from '/config/database.ts'
import { DB_INTERNAL_ERROR, DB_SUCCESSFUL_REQUEST } from '/config/status-messages.ts'

// Types
import { StatusMessage } from '/types/status-messages.d.ts'

class User {
  private username: string
  private password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  public save = async (): Promise<StatusMessage> => {
    const query = 'INSERT INTO users (username, password) values ($1, $2)'
    const args: Array<string> = [this.username, this.password]

    try {
      await PG.queryObject(query, args)
      return DB_SUCCESSFUL_REQUEST
    } catch (_error) {
      throw DB_INTERNAL_ERROR
    }
  }
}

export default User
