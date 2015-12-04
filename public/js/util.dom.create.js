var util = (function(w,d,pub){
	pub.getType = function(variable) { 
		var type = typeof variable; 
		type = (type == 'object' && variable instanceof Array) ? 'array' : type;
		return type;  				
	}; 
	return pub; 
})(window,document,util || {}); 

var util = (function(w,d,pub){
	
	var jsonmlProcessor = function(json,base) {
		console.log('processing this json: ', json); 
		base = typeof base == 'undefined' ? d.createDocumentFragment() : base; 
		for(var i=0; i < json.length; ++i) { 
			base.appendChild(createElementsFromJSONML(json[i])); 
		}
		return base; 		
	}; 
	
	var createElementsFromJSONML = function(json) { 
		if(util.getType(json) == 'array') { 
			if(json.length && typeof json[0] == 'string') { 
				var el = createEl(json.shift(), (json.length && util.getType(json[0]) == 'object') ? json.shift() : null);  
				for(var i=0; i < json.length; ++i) { 
					el.appendChild(createElementsFromJSONML(json[i])); 
				}
				return el; 
			}
		} else if(typeof json == 'string') { 
			return d.createTextNode(json); 
		} 
		console.log("SHOULD NOT HAVE GOTTEN HERE"); 
		return d.createTextNode(''); 
	}; 
	
	var createEl = function(type,attrs) { 
		var el = d.createElement(type); 
		if(attrs) { 
			for(var key in attrs) { 
				el.setAttribute(key,attrs[key]); 
			}			
		}
		return el; 
	}; 
	
	pub.dom = pub.dom || { }; 
	pub.dom.create = function(json) {
		return jsonmlProcessor(json);  
	}; 
	
	return pub; 
})(window,document,util || { }); 