var React=require('react');
var ReactRouter= require('react-router');
var Router=ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute=ReactRouter.IndexRoute;

var App=require('./App');
var HomePage=require('./components/HomePage');
var BookPage=require('./components/BookPage');
var AddEditPage=require('./components/AddEditBook');
var Root=React.createClass({
  render:function(){
    var  history  = this.props.history;
    return (
      <Router history={history}>
        <Route  path='/' component={App}>
          <IndexRoute  component={HomePage} />
          <Route path="book"  component={BookPage} />
            <Route path="bookpage/:id" component={AddEditPage} />
        </Route>
      </Router>
    )
  }
});
module.exports=Root;
