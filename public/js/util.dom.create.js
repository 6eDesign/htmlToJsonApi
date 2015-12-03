var util = (function(w,d,pub){
	var creator = function(obj) { 
			var elem, contains, i, contentsObj, innerElem; 
			obj.contains = (obj.contains == null) ? [] : obj.contains; 
			obj.attributes = (obj.attributes == null) ? {} : obj.attributes; 
			obj.bindings = (obj.bindings == null) ? {} : obj.bindings; 
			obj.type = (obj.type == null) ? 'div' : obj.type; 

			elem = createElem(obj.type, obj.attributes, obj.bindings); 
			contains = obj.contains; 

			if(typeof contains == "string") { 
					elem.appendChild(d.createTextNode(contains)); 
			} else { 
					for(i=0; i < contains.length; ++i) {
							contentsObj = contains[i]; 
							if(typeof contentsObj == 'object') { 
									innerElem = pub.dom.create(contentsObj); 
									elem.appendChild(innerElem); 
							} else { 
									elem.appendChild(d.createTextNode(contentsObj)); 
							}
					}
			}
			return elem; 
	}; 
	var createElem = function(type, attributes, bindings) {
			var elem, key, val;
			elem = d.createElement(type);
			if (typeof attributes !== "undefined") {
					for (key in attributes) {
							val = attributes[key];
							elem.setAttribute(key, val);
					}
			}
			if(typeof bindings !== "undefined") { 
					for(var key in bindings) { 
							if(typeof bindings[key] == 'function') { 
									addEvent(elem,key,bindings[key]); 
							}
					}
			}
			return elem;
	};
	pub.dom = pub.dom || { }; 
	pub.dom.create = function(json) { 
		return creator(json); 
	};  
	return pub; 
})(window,document,util || { }); 