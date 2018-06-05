const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('FIRST FUCKING MOTHA FOKA TEST THAT I CAN SEE THAT I CAN LEARN ANYTHING! Im FUCK AWESOME');
})

app.listen(3000);