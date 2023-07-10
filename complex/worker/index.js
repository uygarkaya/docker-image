const config = require('../config/configuration');
const redis = require('redis');

const redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

redisPublisher.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});
redisPublisher.subscribe('insert');