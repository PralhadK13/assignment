
var React = require('react');
var Router=require('react-router');
var Link=Router.Link;
var Header=React.createClass({

  render:function()
  {
    return(
      <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="#" className="navbar-brand">React With Cassendra</a>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
               <li><Link to="book" >Book</Link></li>
            </ul>
          </div>
        </nav>
   );
  }
});
module.exports=Header;
