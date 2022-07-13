const express = require('express');
const fs = require('fs');

const server = express();

server.get('/', express.static('public'));
// Layer of Security
server.use((req, res, next)=>{
    if(req.query.key == "12345"){
        next();
    }
    else{
        res.status(401).send("Unauthorized");
    }
});

server.get('/movie', (req, res)=>{
    fs.readFile('movie.json', 'utf-8', (err, data)=>{
        if(err){
            res.status(500).json({
                message: 'ERROR',
            });
        }
        else{
            res.status(200).json({
                message: 'SUCCESS',
                data: JSON.parse(data),
            });
        }
    });
});
server.post('/movie', (req, res)=>{
    fs.readFile('movie.json', 'utf-8', (err, data) => {
        const parseData = JSON.parse(data); //Beacuse data is a string "JSON"
        parseData.push({
            name: req.query.name,
            year: req.query.year,
        });
        fs.writeFile('movie.json', JSON.stringify(parseData), (err)=> {
            res.status(201).json({
                message: "Your Movie is Added Successfully",
            });
        });
    });
});


// server.get('/', (req, res)=> {
//     fs.readFile('lets.json', 'utf8', (err, data)=>{
//     res.send(data);
// });
// });

// server.post('/', (req, res)=> {
//     fs.writeFile('lets.json', JSON.stringify(req.query), (err)=> {});
//     console.log('File created');
//     res.send(req.query);
// });

server.listen(4000, () =>{
    console.log('Server is running on port 4000');
});

