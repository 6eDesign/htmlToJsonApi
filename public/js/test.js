(function(w,d){
	var initStartTime;	
	var init = function() {
		initStartTime = new Date().getTime(); 
		atomic.get('http://localhost:3003/api/html2json?url=' + d.location.hash.substring(1)).success(buildDOM); 
	}; 
	
	var buildDOM = function(resp) { 
		var startTime = new Date().getTime(); 
		var newDOMFrag = util.dom.create(resp,d.location.hash.substring(1)); 
		d.getElementById('target').appendChild(newDOMFrag);
		var now = new Date().getTime(); 
		console.log("target.appendChild() TOOK " + (now - startTime) + " MILLISECONDS TO COMPLETE");
		console.log("ENTIRE TRANSACTION TOOK " + (now - initStartTime) + " MILLISECONDS TO COMPLETE"); 	
	}; 
	
	d.addEventListener('DOMContentLoaded',init); 

})(window,document); 