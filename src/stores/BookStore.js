var assign = require('object-assign');
var config=require('../../config');
var EventEmitter = require('events').EventEmitter;
var toastr=require('toastr');
var BookStore = assign({}, EventEmitter.prototype, {

  getBookApiCall:function(callback)
  {
    $.ajax({
        url:config.APIURL+"book/get",
        type: "GET",
        success: function (data, textStatus, jqXHR) {
          callback(data);
        },
        error: function(xhr){
          toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
        }
      });
   },
   getBookById:function(id,callback)
   {
     $.ajax({
         url:config.APIURL+"book/get/"+id,
         type: "GET",
         success: function (data, textStatus, jqXHR) {
           callback(data);
         },
         error: function(xhr){
           toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
         }
       });
   },
   createBook:function(data,callback)
   {
     $.ajax({
         url:config.APIURL+"book/create",
         type: "POST",
         data:data,
         success: function (data, textStatus, jqXHR) {
            toastr.success('book added');
            callback(data);
         },
         error: function(xhr){
           toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
         }
       });
   },
   TotalCounts:function(callback)
   {
     $.ajax({
         url:config.APIURL+"book/totalcount",
         type: "GET",
         success: function (data, textStatus, jqXHR) {
           callback(data);
         },
         error: function(xhr){
           toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
         }
       });
   },

   updateBook:function(data,callback)
   {
       $.ajax({
           url:config.APIURL+"book/update",
           type: "POST",
           data:data,
           success: function (data, textStatus, jqXHR) {
              toastr.success('book updated');
             callback(data);
           },
           error: function(xhr){
             toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
           }
         });
   },
   deleteBook:function(id,callback)
   {
         $.ajax({
             url:config.APIURL+"book/delete/"+id,
             type: "GET",
             success: function (data, textStatus, jqXHR) {
               toastr.success('book deleted');
               callback(data);
             },
             error: function(xhr){
               toastr.error("error",'Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText,"error");
             }
           });
   }

});
module.exports=BookStore;
