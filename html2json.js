var request 				= 	require('request')
  , db 							=		require('./db')
	// , htmlParser 			=		require('json_ml')
	, htmlParser 			=		require('jsonml-parse')
	, xmlSanitize 		= 	require('illegal-xml-sanitizer') 
	, htmlCommentAxe 	=		require('remove-html-comments')
	, htmlMinify 			= 	require('html-minifier').minify
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
		request({
			url: req.query.url, 
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
			}
		},function(err,resp,body){
			if(err) return next(); 
			var minified = htmlMinify(body,{
				collapseWhitespace: true, 
				minifyJS: true, 
				minifyCSS: true
			}); 
			htmlParser(htmlSanitize(xmlSanitize(minified),{allowedTags: false, allowedAttributes: false}),function(err,str){
				if(err) console.log("ERROR CONVERTING HTML TO JSON",err);
				if(err) return next(); 
				req.doc = str;
				// req.doc = htmlParser.parse(htmlSanitize(xmlSanitize(body),{allowedTags: false, allowedAttributes: false})); 
				console.log(!req.query.nc);
				if(!req.query.nc) { 
					db(function(error,connection){
						console.log('error',error);
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
			}); 
		}); 
	}
}; 

module.exports.deliverDocument = function(req,res,next) { 
	if(!req.doc) return next(); 
	res.json(req.doc); 
};