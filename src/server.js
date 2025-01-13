'use strict';
const express =  require('express');
const app =  express();
const port =  process.env.PORT  ||  8080
const host = '0.0.0.0';
// Route to be tested
app.get('/', (req, res) => {
    return res.status(200).json({ nome:  'Hello World' });
});
// Application running on the door
let server = app.listen(port, host, () => {
    console.log(`Application running on ${port}`);
});
module.exports  = server;
