var util = (function(w,d,pub){
	pub.getType = function(variable) { 
		var type = typeof variable; 
		type = (type == 'object' && variable instanceof Array) ? 'array' : type;
		return type;  				
	}; 
	return pub; 
})(window,document,util || {}); 

var util = (function(w,d,pub){
	
	var jsonmlProcessor = function(arr,base) {
		var baseLevel = typeof base == 'undefined'; 
		base = baseLevel ? d.createDocumentFragment() : base;  

		if(baseLevel) { 
			for(var i=0; i < arr.length; ++i) {
				var el = processInstruction(arr[i]); 
				if(el) base.appendChild(el);
			}
		} else { 
			var el = processInstruction(arr); 
			if(el) base.appendChild(el);
		}

		return base; 
	}; 
	
	var processInstruction = function(instruction) { 
		if(util.getType(instruction) == 'array') { 
			return createElem(instruction);
		}
		if(util.getType(instruction) == 'string') { 
			return d.createTextNode(instruction); 
		}		
	}; 
	
	var createElem = function(arr) {
		var frag = d.createDocumentFragment(); 
		console.log(arr.length, typeof arr[0], arr[0], arr);
		if(arr.length && typeof arr[0] == 'string') { 
			var el = d.createElement(arr.shift()); 
			if(arr.length) { 
				if(util.getType(arr[0]) == 'object') { 
					var attrs = arr.shift(); 
					for(var key in attrs) { 
						el.setAttribute(key,attrs[key]); 
					}
				}
			} 
			frag.appendChild(el); 
			for(var i=0; i < arr.length; ++i) { 
				frag.appendChild(jsonmlProcessor(arr[i],frag)); 
			}
			console.log("frag", frag);
			return frag;	
		} else { 
			return jsonmlProcessor(arr); 
		}
	}; 
	
	pub.dom = pub.dom || { }; 
	pub.dom.create = function(json) {
		return jsonmlProcessor(json); 
	}; 
	
	return pub; 
})(window,document,util || { }); 