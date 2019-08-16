"use strict"

import { globals } from './config.js'
import { authenticator, tokenRetriever } from './functions/authenticator.js'
import { getUsers, refreshUsers } from './functions/users.js'
import * as manager from './functions/manager.js'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.static('public')).use(cors()).use(cookieParser())

app.get('/login', (req, res) => { authenticator(req, res) })
app.get('/callback', (req, res) => { tokenRetriever(req, res) })
app.get('/users', (req, res) => { getUsers(req, res) } )
app.get('/startTrack', (req, res) => { manager.startTrack(req, res) } )
app.get('/stopTrack', (req, res) => { manager.stopTrack(req, res) } )
app.get('/chooseTrack', (req, res) => { manager.chooseTrack(req, res) } )

// Debug
app.get('/debug/users', (req, res) => {
  let arr = getUsers(req, res)
  console.log(arr);
 })
 app.get('/debug/refreshUsers', (req, res) => { refreshUsers() } )

app.listen(globals.expressPort, () => console.log(`Express: listening on port ${globals.expressPort}!`))
