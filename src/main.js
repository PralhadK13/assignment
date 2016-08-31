
var React=require('react');
var ReactDom=require('react-dom');
var Root=require('./Root');
var createHistory=require('history').createHistory;

var history =createHistory();
ReactDom.render(<Root history={history} />, document.getElementById('app'));
