var express=require('express');
var app=express();
var bookRoutes=require('./routes/bookRoutes');
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');


///cassenra connection setup using cassie
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'bookmanagement'});
client.connect(function(err,result){
  if(err) console.log(err);
  console.log('cassandra connected');
})





// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/',function(req,res){
  res.send({'info':'server started on 8080'});
});

app.get("/book/totalcount",function(req,res){
  bookRoutes.getTotalCount(client,function(result){
    res.send(result);
  });
});
app.get('/book/get',function(req,res){
  bookRoutes.getBooks(client,function(books){
    res.send(books);
  });
});

app.post('/book/create',function(req,res){
  bookRoutes.insertBook(client,req,function(result){
    res.send(result);
  })
});
app.post('/book/update',function(req,res){
  bookRoutes.updateBook(client,req,function(data){
    res.send(data);
  })
});
app.get('/book/delete/:id',function(req,res){
  bookRoutes.deleteBook(client,req.params.id,function(result){
    res.send(result);
  });
});
app.get('/book/get/:id',function(req,res){
  bookRoutes.getBookById(client,req.params.id,function(result){
    res.send(result);
  });
});
app.listen(8080,function(err,result){
  console.log('server start on 8080');
});
