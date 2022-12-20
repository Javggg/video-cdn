// Types
import { StatusMessage } from '/types/status-messages.d.ts'

// Database
const DB_SUCCESSFUL_REQUEST: StatusMessage = {
  message: 'Consulta realizada con exito',
  code: 200
}

const DB_INTERNAL_ERROR: StatusMessage = {
  message: 'Hubo un error al consultar con la base de datos',
  code: 500
}

// Login
const LI_USER_OR_PASSWORD_NOT_FOUND: StatusMessage = {
  message: 'El usuario o contraseña son incorrectos',
  code: 404
}

export { DB_INTERNAL_ERROR, DB_SUCCESSFUL_REQUEST, LI_USER_OR_PASSWORD_NOT_FOUND }
