'use-strict'

import globals from './config.js'
import express from 'express'

const app = express()
app.get('/', (req, res) => res.send('Express works'))
app.listen(globals.expressPort, () => console.log(`Express: listening on port ${globals.expressPort}!`))
