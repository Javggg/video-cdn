// Dependencies
import { Application } from 'oak'

import router from '/routes/routes.ts'

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 3000 })
