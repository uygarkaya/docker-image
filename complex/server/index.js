const config = require('../config/configuration');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: config.pgUser,
    password: config.pgPassword,
    database: config.pgDatabase,
    host: config.pgHost,
    port: config.pgPort
});

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

// Redis (in-memory database) Client Setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express route handlers
app.get('/', (request, response) => {
    response.send('Hello, World!');
});

app.post('/values', async (request, response) => {
    const index = request.body.index;

    if (parseInt(index) > 40) { return response.status(422).send('Index Too High...'); }
    redisClient.hset('values', index, 'Nothing Yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    response.send({ working: true });
});

app.get('/values/all', async (request, response) => {
    const values = await pgClient.query(
        'SELECT * from values'
    );
    response.send(values.rows);
});

app.get('/values/current', async (request, response) => {
    redisClient.hgetall('values', (err, values) => {
        response.send(values);
    });
});

app.listen(5000, err => {
    console.log('Code Status: 200'); 
    console.log(`Server is Running on http://localhost:${5000}`);
})