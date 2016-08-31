var React=require('react');
var ReactDom=require('react-dom');
var BookStore=require('../stores/BookStore');
var DataGrid = require('react-datagrid');
var ReactPaginate=require('react-paginate');
var History = require('react-router').History;
var perPage=5;
var total_count=0;
var offset=5;
var pageNum=0;
function setStatesData()
{
  return{
    books:[]
  }
}
var BookPage=React.createClass({
  mixins: [ History ],
  getInitialState:function()
  {
     return setStatesData();
  },
  componentWillMount:function()
   {
     offset=5;
    this.loadBooksFromServer();
   },
   handlePageClick:function(data)
  {
    var selected = data.selected + 1;
    pageNum=data.selected;
    var Current=this;
     offset = Math.ceil(selected * perPage);
    console.log("offset set ");
    console.log(offset);
        this.setState({}, () => {
          Current.loadBooksFromServer();
        });
  },
  loadBooksFromServer:function()
  {
    var Current=this;
    BookStore.TotalCounts(function(data){

      total_count=parseInt(data[0].count);
       pageNum= Math.ceil(total_count / perPage);
      BookStore.getBookApiCall(function(data){
             Current.setState({books:data});
           });
    });

  },
   LoadData:function()
   {

   },
   addBook:function()
   {
     this.history.pushState(null, "/bookpage/0");
   },
   Edit:function(event)
   {
     var id=event.target.id;
     this.history.pushState(null, "/bookpage/"+id);
   },
   Delete:function(event)
   {
     var id=event.target.id;
     BookStore.deleteBook(id,function(data){
          this.loadBooksFromServer();
     }.bind(this));
   },
  render:function()
  {
    var Current=this;

   var columns = [
    { name: 'category'},
    { name: 'name'},
    { name: 'price'},
    {
    name: 'id',
    title:'Action',
    filterable: false,
    render: function(value){
      return <div>
      <button className="btn btn-primary" onClick={Current.Edit} id={value}>
        Edit
      </button>
      <span>&nbsp;</span>
      <button className="btn btn-danger" onClick={Current.Delete} id={value}>
        Delete
      </button>
      </div>
    }
   }
 ];

   var renderdata=[];
   console.log("offset");
   console.log(offset);
    if(offset===5 && this.state.books.length > 0)
    {
      for (var i = 0; i < offset; i++) {
          if(typeof this.state.books[i] != "undefined")
          {
              renderdata.push(this.state.books[i]);
          }

      }
    }
    else {
      var startrecorde=offset - 5;
      if(startrecorde !== 0)
      {
        for (var i = startrecorde; i < offset; i++) {
          if(typeof this.state.books[i] != "undefined")
          {
              renderdata.push(this.state.books[i]);
          }

        }
      }

    }
    console.log("final data");
    console.log(renderdata);
    return(
      <div>
       <div>
       <button className="btn btn-success" onClick={this.addBook}>Add Book</button>
       </div>
        <DataGrid idProperty="id" dataSource={renderdata} columns={columns}  />
        <ReactPaginate previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={<li className="break"><a href="">...</a></li>}
                      pageNum={pageNum}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      clickCallback={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
      </div>
    )
  }
});
module.exports=BookPage;
