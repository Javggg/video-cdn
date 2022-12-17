// Dependencies
import { Router } from 'oak'

// Types
import { StatusMessage } from '/types/status-messages.d.ts'

// Models
import User from '/models/User.model.ts'

const router = new Router()

router.get('/', async ({ response }) => {
  const user = new User('test', 'mypassword')

  try {
    const result: StatusMessage = await user.save()

    response.body = JSON.stringify({
      result
    })
  } catch (error) {
    response.body = error.message
    response.status = error.code
  }
})

export default router
