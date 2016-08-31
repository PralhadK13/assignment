var React=require('react');
var DocumentTitle=require('react-document-title');
$=jQuery=require('jquery');
var Header=require('./components/Header');
var App=React.createClass({
 render:function()
 {
   return(
     <DocumentTitle title='Book Management.'>
     <div className='App'>
            <Header />
          <div id="Page" >
           {this.props.children}
          </div>
    </div>
     </DocumentTitle>
   );
 }

});
module.exports=App;
