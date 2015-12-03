var fs            =   require('fs')
  , path          =   require('path')
  , http          =   require('http')
  , express       =   require('express')
  , bodyParser    =   require('body-parser')
  , errorHandler  =   require('errorhandler')
  , config        =   require('./config')
  , html2json     =   require('./html2json'); 

var app, bodyParser, data = { }; 
app = module.exports = express(); 

// configure app: 
app.set('port', 3003); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade');

// configure express 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 

app.use(function (error, req, res, next) {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.send(500);
  }
});

app.get(config.root, html2json.checkIfExists, html2json.retrieveIfDoesNotExist, html2json.deliverDocument); 
app.get('/:pageName',function(req,res,next){
  res.render(req.params.pageName); 
}); 

app.server = http.createServer(app).listen(app.get('port'),function(){
  console.log("EXPRESS LISTENING ON PORT #" + app.get('port')); 
});