var uuid = require('uuid');

function getBooks(client,callback)
{


  var query="select * from book";

  client.execute(query,function(err,books){
    if(err) callback(err);

    callback(returnJsonObject(books.rows));
  });
}
function getTotalCount(client,callback)
{
 var query="select * from book";
 client.execute(query,function(err,count){
   if(err) callback(err);


   callback(returnJsonObject([{"count":count.rows.length}]));
 })
}
function insertBook(client,req,callback)
{
 var query= "insert into book(id,category,name,price) values (?, ?, ?, ?)";
 var params = [uuid.v1(),req.body.category,req.body.name,req.body.price];

 client.execute(query,params,{ prepare: true },function(err,result){
   if(err) callback(err);

   callback({'info':'inserted'});
 });

}
function updateBook(client,req,callback)
{
  var query="update book set name = ?,category = ?,price = ? where id = ? ";
  var params=[req.body.name,req.body.category,req.body.price,req.body.id];
  client.execute(query,params,function(err,result){
    if(err) callback(err);

    callback({'info':'updated'});
  });
}
function deleteBook(client,id,callback)
{
  var query= "delete from book where id = ?";
  client.execute(query,[id],function(err,result){
    if(err) callback(err);

    callback({'info':'deleted'});
  });
}
function getBookById(client,id,callback)
{
  var query="select * from book where id = ?";
  client.execute(query,[id],function(err,book){
    if(err) callback(err);

    callback(returnJsonObject(book.rows));
  })
}
function returnJsonObject(obj)
{
  return (JSON.parse(JSON.stringify(obj)));
}
module.exports={
  getBooks:getBooks,
  insertBook:insertBook,
  deleteBook:deleteBook,
  getBookById:getBookById,
  updateBook:updateBook,
  getTotalCount:getTotalCount
}
