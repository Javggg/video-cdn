import { Oak } from './deps.ts'

const router = new Oak.Router()

router.get('/', ({ response }) => {
  response.body = JSON.stringify({
    hello: 'Hello World'
  })
})

export default router