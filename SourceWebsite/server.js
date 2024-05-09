
var mysql = require('mysql2');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/home'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AnGaRu",
    database: "products_db"
});
var crawData = [];

app.listen(8080,function(){
  console.log('Node server running @ http://localhost:8080');
});


app.post('/update', (req, res) => {
    var query = 'SELECT * FROM ';
    let category = req.body.category;
    
    query += category + ' ';
    var condition = 0;
    for (let prop in req.body) {
      if (prop === 'category' || prop === 'minVal' || prop === 'maxVal') continue;
      if (prop === 'name' && req.body['name'] === 'ALL' ) continue;
      
      condition++;
      if (condition === 1) query += 'WHERE ';
      else query += 'AND ';
      var A;
      if (prop !== 'ram') A = ' LIKE N\'%' + req.body[[prop]]+ '%\'';
      else A = ' LIKE N\'' + req.body[[prop]]+ '%\'';
      A = A.replace(/(\r\n|\n|\r)/gm, "");
      query += prop + A;
    }
    if (req.body['minVal']){
        condition++;
        if (condition === 1) query += 'WHERE ';
        else query += 'AND ';
        query += 'price >= ' + req.body['minVal'] + ' ';
    }
    if (req.body['maxVal']) {
        condition++;
        if (condition === 1) query += 'WHERE ';
        else query += 'AND ';
        query += 'price <= ' + req.body['maxVal'] + ' ';
        query+=';';
    } 


    con.query(query, function (error, results, fields) {
        if (error) throw error;
        //console.log(query);
        res.send(results);
    });

    
});


// app.get('/crawData', function (req, res) {
//     res.send(crawData);
// });
app.get('', function (req, res) {
  res.sendFile(__dirname + '/home/index.html');
});
app.get('/laptop', function (req, res) {
  res.sendFile(__dirname + '/home/laptop.html');
});
app.get('/phone', function (req, res) {
  res.sendFile(__dirname + '/home/phone.html');
});
app.get('/accessories', function (req, res) {
  res.sendFile(__dirname + '/home/accessories.html');
});
app.get('/mouse', function (req, res) {
  res.sendFile(__dirname + '/home/mouse.html');
});
app.get('/keyboard', function (req, res) {
  res.sendFile(__dirname + '/home/keyboard.html');
});
app.get('/screen', function (req, res) {
  res.sendFile(__dirname + '/home/screen.html');
});
