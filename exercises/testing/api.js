const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  // should get user by given id in route param
  try {
    const user = await users.findUser(id)
    res.status(200).send(user)
  }
  catch(error) {
    console.log(error.message)
    res.status(400).send({'error': error.message})
  }
})

app.delete('/user/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await users.deleteUser(id)
    res.status(201).send({id})
  }
  catch(error) {
    res.status(400).send({'error': error.message})
  }
})

module.exports = app
