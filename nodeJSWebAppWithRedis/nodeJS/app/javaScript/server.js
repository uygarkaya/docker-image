require("dotenv").config();

const express = require("express");
const redis = require("redis");
const app = express();
const routes = require("./routes");

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
redisClient.set('visitCount', 0);


app.use(express.static(__dirname + '/app'));
app.use("/api", routes);

app.get('/', (request, response) => {
    redisClient.get('visitCount', (error, visitCount) => {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: 'An Error Has Occurred' });
        }
        response.send('Total Number of Visit: ' + visitCount);
        redisClient.set('visitCount', parseInt(visitCount) + 1);
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log('Code Status: 200');
    console.log(`Server is Running on http://localhost:${process.env.SERVER_PORT}`)
});
