projectData = {};

const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));
const port = 5500;

// TODO-Spin up the server
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};


app.get('/get',(req,res)=>{

    res.send(projectData);
})

app.post("/add",(req,res)=>{
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feel = req.body.feel;
    console.log(projectData);
    res.end();
});




















