"use strict"

import { globals } from './config.js'
import { authenticator } from './functions/authenticator.js'
import express from 'express'

const app = express()

app.use(express.static('public'))
app.get('/login', (req, res) => { authenticator() })

app.listen(globals.expressPort, () => console.log(`Express: listening on port ${globals.expressPort}!`))
