const keys = require('./keys')

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const { Pool } = require('pg')

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDataBase,
    password: keys.pgPassword
})

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.error(err))

pgClient.on('error', () => console.error('PG Client Connection LOST!'))

const redis = require('redis')
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

const redisPublisher = redisClient.duplicate()

app.get('/', (_, res) => {
    res.send('hello')
})

app.get('/values/all', async (_, res) => {
    const values = await pgClient.query('SELECT * from values')
    res.send(values.rows)
})

app.get('/values/current', async (_, res) => {
    await redisClient.hgetall('values', (err, values) => {
        res.send(values)
    })
})

app.post('/values', async (req, res) => {
    const index = req.body.index
    
    if (+index > 40) return res.status(400).send('index not Supported')

    redisClient.hset('values', index, 'Nothing Yet!')
    redisPublisher.publish('insert', index)
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index])

    res.send({ working: true })
})

app.listen(5000, () => console.log('app running!'))