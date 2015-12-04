(function(w,d){
	
	var init = function() {
		atomic.get('http://localhost:3003/api/html2json?nc=true&url=' + d.location.hash.substring(1)).success(buildDOM); 
	}; 
	
	var buildDOM = function(resp) { 
		var newDOMFrag = util.dom.create(resp,d.location.hash.substring(1)); 
		console.log(newDOMFrag); 
		d.getElementById('target').appendChild(newDOMFrag);	
	}; 
	
	d.addEventListener('DOMContentLoaded',init); 

})(window,document); 