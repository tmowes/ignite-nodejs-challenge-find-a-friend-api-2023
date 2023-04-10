import { host } from '#configs/server'

import { app } from './app'

app.listen(host).then(() => {
  console.log('🚀 HTTP Server Running!')
})
