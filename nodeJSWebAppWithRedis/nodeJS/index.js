const express = require("express");
const redis = require("redis");
const port = 8081

const app = express();
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});
redisClient.set('visitCount', 0);

app.get('/', (request, response) => {
    redisClient.get('visitCount', (error, visitCount) => {
        if (error) {
            console.error(error);
            return response.status(500).json({error: 'An Error Has Occurred'});  
        }
        response.send('Total Number of Visit: ' + visitCount);
        redisClient.set('visitCount', parseInt(visitCount)+1);
    });
});

app.listen(port, () => {
    console.log('Code Status: 200');
    console.log(`Server is Running on http://localhost:${port}`)
});
