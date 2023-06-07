const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use(express.static(path.join(__dirname, 'app')));

app.listen(port, () => {
    console.log('Code Status: 200'); 
    console.log(`Server is Running on http://localhost:${port}`);
});

// app.get('/', (request, response) => {
//     response.send('Hi There');
// });