import PG from '/config/database.ts'

class User {
  private username: string
  private password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  public save = async (): Promise<boolean> => {
    const query = 'INSERT INTO users (username, password) values ($1, $2)'
    const args: Array<string> = [this.username, this.password]

    try {
      await PG.queryObject(query, args)
      return true
    } catch (_error) {
      throw {
        message: 'Hubo un error al consultar con la base de datos',
        code: 500
      }
    }
  }
}

export default User
