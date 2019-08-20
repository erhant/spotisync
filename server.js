"use strict"

import { globals } from './config.js'
import { authenticator, tokenRetriever } from './functions/authenticator.js'
import { getUsers, refresh } from './functions/users.js'
import * as manager from './functions/manager.js'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(express.static('public')).use(cors()).use(cookieParser());

// Main Routes
app.get('/login', (req, res) => { console.log('Request to login'); authenticator(req, res) })
app.get('/callback', (req, res) => { console.log('Request to callback'); tokenRetriever(req, res) })
app.get('/users', (req, res) => { console.log(getUsers(req, res)) })
app.get('/startTrack', (req, res) => {
  manager.startTrack(req, res)
})
app.get('/stopTrack', (req, res) => {
  manager.stopTrack(req, res)
})
app.get('/chooseTrack', (req, res) => {
  manager.chooseTrack(req, res)
})

// Debug
app.get('/debug/refreshUsers', (req, res) => { refresh() } )
app.get('/debug/getDevices', (req, res) => { manager.getDevices(req, res) })

app.listen(globals.expressPort, () => console.log(`Express: listening on port ${globals.expressPort}!`))
