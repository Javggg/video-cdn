import { Router } from 'oak'

const router = new Router()

router.get('/', ({ response }) => {
  response.body = JSON.stringify({
    hello: 'Hello World'
  })
})

export default router
