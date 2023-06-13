require("dotenv").config();

const express = require("express");
const redis = require("redis");

const router = express.Router();
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

router.get('/api/visitCount', (request, response) => {
    redisClient.get('visitCount', (error, visitCount) => {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: 'An Error Has Occurred' });
        }
        response.send('Total Number of Visit: ' + visitCount);
        redisClient.set('visitCount', parseInt(visitCount) + 1);
    });
});

module.exports = router;
