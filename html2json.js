var request 				= 	require('request')
  , db 							=		require('./db')
	, htmlParser 			=		require('json_ml')
	, xmlSanitize 		= 	require('illegal-xml-sanitizer') 
	, htmlSanitize 		= 	require('sanitize-html');
	
module.exports = { }; 

module.exports.checkIfExists = function(req,res,next) { 
	db(function(error,connection){
		if(error) return next(); 
		connection.collection('docs',function(err,collection){
			if(err) return next(); 
			collection.findOne({url: req.query.url},function(err,doc){
				if(err) return next(); 
				if(doc) { 
					req.doc = doc.json; 
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
			// htmlParser(body,function(err,str){
			// 	if(err) console.log("ERROR CONVERTING HTML TO JSON",err);
			// 	if(err) return next(); 
			// 	req.doc = str;
				req.doc = htmlParser.parse(htmlSanitize(xmlSanitize(body),{allowedTags: false, allowedAttributes: false})); 
				if(!req.query.nc) { 
					db(function(error,connection){
						if(error) return next(); 
						connection.collection('docs',function(err,collection){
							if(err) return next();
							collection.insert({url: req.query.url, json: req.doc},function(err,doc){
								next(); 
							}); 
						}); 
					}); 	
				} else { 
					next();
				}
			// }); 
		}); 
	}
}; 

module.exports.deliverDocument = function(req,res,next) { 
	if(!req.doc) return next(); 
	res.json(req.doc); 
};