var React=require('react');
var ReactDom=require('react-dom');
var Router=require('react-router');
var Link=Router.Link;
var HomePage=React.createClass({

  render:function()
  {
    return(
      <div className="jumbotron">
        <h1>Manage Books Home Page</h1>
      </div>
    )
  }
});

module.exports=HomePage;
