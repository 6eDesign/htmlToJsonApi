var request 		= 	require('request')
  , db 					=		require('./db')
	, translator 	= 	require('./translator'); 
	
module.exports = { }; 

module.exports.checkIfExists = function(req,res,next) { 
	db(function(err,connection){
		if(err) return next(); 
		connection.collection('docs',function(err,collection){
			if(err) return next(); 
			collection.findOne({url: req.query.url},function(err,doc){
				if(err) return next(); 
				if(doc) { 
					req.doc = doc; 
				} else { 
					req.doc = null; 
				}
				next(); 
			}); 
		}); 
	}); 	
}; 

module.exports.retrieveIfDoesNotExist = function(req,res,next) {
	if(req.doc) { 
		next(); 
	} else { 
		request.get(req.query.url,function(err,resp,body){
			if(err) return next(); 
			req.doc = translator.html2json(body); 
			next();
		}); 
	}
}; 

module.exports.deliverDocument = function(req,res,next) { 
	res.json(req.doc); 
};