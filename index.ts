import { Oak } from './deps.ts'

import router from './routes.ts'

const app = new Oak.Application()

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 3000 })