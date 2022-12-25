// Dependencies
import { Router } from 'oak'
import { PARAMETERS_MISSING } from '../config/status-messages.ts'

// Models
import User from '/models/User.model.ts'

const router = new Router()

router.post('/signup', async ({ request, response }) => {
  const { username, password } = await request.body().value

  if (!username || !password) {
    response.body = PARAMETERS_MISSING.message
    response.status = PARAMETERS_MISSING.code

    return
  }

  try {
    const user = new User(username)
    const token: string = await user.signup(password)

    response.body = { token }
    response.status = 200
  } catch (e) {
    response.body = e.message
    response.status = e.code
  }
})

export default router
