const express = require('express');
const mysql = require('mysql');
const bodyparser =require('body-parser');
const cors = require('cors');
const path =require("path");
var app = express();
app.use(cors())
//Configuring express server
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//MYSQl connection and details
var mysqlConnection = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'shova',
    database:'book',
    insecureAuth: true,
    multipleStatements:true

});
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed'+JSON.stringify(err,undefined,2));
});
app.get('/addbooks', (req, res) => {   
    mysqlConnection.query('SELECT * FROM book.addbook;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.post('/addbooks',function (req, res) {

    //console.log(req.body.Bookid);
    console.log(req.body.ISBN);
    console.log(req.body.Title);
    console.log(req.body.Author);
    console.log(req.body.Publication);
    mysqlConnection.connect(function () {
       
        var sql = "INSERT INTO `book`.`addbook` (`ISBN`, `Title`, `Author`, `Publication`,`Quantity`) VALUES ("+ req.body.ISBN+ ",'" + req.body.Title + "', '" + req.body.Author + "','" + req.body.Publication + "',"+ req.body.Quantity+ ")";
        mysqlConnection.query(sql, function (err, results,fields) {
            if (err)
             throw err;
             else{
                 var values =Object.values(results);
                 for (var value of values){
                     console.log(Object.values(values));
                     txt="";
                     numbers=(Object)
                 }
             }
            console.log("1 record inserted");
       
    });
    
});
res.send('Record inserted');
});
app.post('/booklist',function (req, res) {

    //console.log(req.body.Bookid);
    console.log(req.body.ISBN);
    console.log(req.body.Title);
    console.log(req.body.Barcode);
    //console.log(req.body.Publication);
    mysqlConnection.connect(function () {
       
        var list = "INSERT INTO `book`.`booklist` (`ISBN`, `Title`, `Barcode`) VALUES ("+ req.body.ISBN+ ",'" + req.body.Title + "',"+ req.body.Barcode+ " )";
        mysqlConnection.query(list, function (err, result) {
            if (err)
             throw err;
             else
            console.log("1 record inserted");
       
    });
    
});
res.send('Record inserted to booklist');
});
app.get('/', function (req, res) {
    res.send('hello world')
})
const port = 8081;
app.listen(port,()=>console.log(`Listening to the port ${port} ..`));





