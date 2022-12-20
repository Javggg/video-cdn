// Types
import { StatusMessage } from '/types/status-messages.d.ts'

const DB_SUCCESSFUL_REQUEST: StatusMessage = {
  message: 'Consulta realizada con exito',
  code: 200
}

const DB_USER_NOT_FOUND: StatusMessage = {
  message: 'El usuario introducido no existe',
  code: 404
}

const DB_INTERNAL_ERROR: StatusMessage = {
  message: 'Hubo un error al consultar con la base de datos',
  code: 500
}

export { DB_INTERNAL_ERROR, DB_SUCCESSFUL_REQUEST, DB_USER_NOT_FOUND }
