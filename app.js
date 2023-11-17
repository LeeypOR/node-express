const express = require('express');
const app = express();

var bodyParser = require('body-parser');

const cors = require('cors')
app.use(cors);

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


app.listen(3007,() => {
  console.log("连接port1");
})

