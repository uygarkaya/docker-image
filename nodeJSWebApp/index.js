const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Code Status: 200 | Server is Running on http://localhost:8080');
});

// app.get('/', (request, response) => {
//     response.send('Hi There');
// });