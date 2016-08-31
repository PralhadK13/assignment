var React=require('react');
var ReactDom=require('react-dom');
var BookStore=require('../stores/BookStore');
var History = require('react-router').History;
function setStatesData()
{
  return{
    book:{}
  }
}
var AddEditBook=React.createClass({
  mixins: [ History ],
  getInitialState:function()
  {
     return setStatesData();
  },
  componentWillMount:function()
   {
     if(this.props.params.id != "0")
     {
       BookStore.getBookById(this.props.params.id,function(data){
        this.setState({book:data[0]});
       }.bind(this));
     }

   },
   onChange:function(event)
     {

       var field=event.target.name;
       var value=event.target.value;
       this.state.book[field]=value;
        return  this.setState({book:this.state.book});

     },
     onSave:function()
     {

       if(this.props.params.id != "0")
       {
         var data={"name":this.state.book.name,"category":this.state.book.category,"price":this.state.book.price,"id":this.props.params.id};

         BookStore.updateBook(data,function(data){
            this.history.pushState(null, "/book");
         }.bind(this));
       }
       else {
         var data={"name":this.state.book.name,"category":this.state.book.category,"price":this.state.book.price};
         BookStore.createBook(data,function(data){
             this.history.pushState(null, "/book");
         }.bind(this));
       }
     },
  render:function()
  {

    return(
      <div>
      <form>
     <h1>Manage Books </h1>
     <label htmlFor="bookname">Book Name</label>
     <input type="text"
        name="name"
        className="form-control"
        placeholder="Book Name"
        ref="name"
        onChange={this.onChange}
        value={this.state.book.name} />
      <br />
      <label htmlFor="category">Category</label>
        <input type="text"
           name="category"
           className="form-control"
           placeholder="Category"
           ref="category"
           onChange={this.onChange}
           value={this.state.book.category} />
         <br />
         <label htmlFor="price">Price</label>
           <input type="text"
              name="price"
              className="form-control"
              placeholder="Price"
              ref="price"
              onChange={this.onChange}
              value={this.state.book.price} />
            <br />
         <input type="button" value="Save" className="btn btn-default" onClick={this.onSave}/>
   </form>
      </div>
    )
  }
});
module.exports=AddEditBook;
