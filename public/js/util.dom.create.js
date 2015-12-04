var util = (function(w,d,pub){
	pub.getType = function(variable) { 
		var type = typeof variable; 
		type = (type == 'object' && variable instanceof Array) ? 'array' : type;
		return type;  				
	}; 
	return pub; 
})(window,document,util || {}); 

var util = (function(w,d,pub){
	
	var jsonmlProcessor = function(json,linkPrefix,base) {
		console.log('processing this json: ', json); 
		linkPrefix = typeof linkPrefix == 'undefined' ? '' : linkPrefix;
		base = typeof base == 'undefined' ? d.createDocumentFragment() : base; 
		for(var i=0; i < json.length; ++i) { 
			base.appendChild(createElementsFromJSONML(json[i],linkPrefix)); 
		}
		return base; 		
	}; 
	
	var createElementsFromJSONML = function(json,linkPrefix) { 
		if(util.getType(json) == 'array') { 
			if(json.length && typeof json[0] == 'string') { 
				var el = createEl(json.shift(), (json.length && util.getType(json[0]) == 'object') ? json.shift() : null, linkPrefix);  
				if(el) { 
					for(var i=0; i < json.length; ++i) { 
						el.appendChild(createElementsFromJSONML(json[i],linkPrefix)); 
					}
					return el; 					
				}
			}
		} else if(typeof json == 'string') { 
			return d.createTextNode(json); 
		} 
		console.log("SHOULD NOT HAVE GOTTEN HERE"); 
		return d.createElement('div'); 
	}; 
	
	var createEl = function(type,attrs,linkPrefix) { 
		try { 
			var el = d.createElement(type); 
		} catch(error) { 
			console.log("Error creating element of type: ", type); 
			return null; 
		}
		if(attrs) { 
			for(var key in attrs) {
				if(key == 'src' || key == 'href') { 
					if(attrs[key].indexOf('.') == -1 || attrs[key].indexOf('.') > attrs[key].indexOf('/')) { 
						attrs[key] = linkPrefix + attrs[key]; 
					}					
				}
				el.setAttribute(key,attrs[key]); 
			}			
		}
		return el; 
	}; 
	
	pub.dom = pub.dom || { }; 
	pub.dom.create = function(json,linkPrefix) {
		return jsonmlProcessor(json,linkPrefix);  
	}; 
	
	return pub; 
})(window,document,util || { }); 