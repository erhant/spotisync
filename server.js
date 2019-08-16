'use strict'

import { globals } from './config.js'
import { authenticator, tokenRetriever } from './functions/authenticator.js'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.static('public')).use(cors()).use(cookieParser())

app.get('/login', (req, res) => { authenticator(req, res) })
app.get('/callback', (req, res) => { tokenRetriever(req, res) })

app.listen(globals.expressPort, () => console.log(`Express: listening on port ${globals.expressPort}!`))
