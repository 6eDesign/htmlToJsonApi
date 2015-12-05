(function(w,d){
	var initStartTime;	
	var init = function() {
		initStartTime = new Date().getTime(); 
		atomic.get('http://localhost:3003/api/html2json?url=' + d.location.hash.substring(1)).success(buildDOM); 
	}; 
	
	var buildDOM = function(resp) { 
		var startTime = new Date().getTime(); 
		var newDOMFrag = util.dom.create(resp,d.location.hash.substring(1)); 
		var div = document.createElement('div'); 
		div.appendChild(newDOMFrag); 
		d.getElementById('target').innerHTML = div.innerHTML;
		var now = new Date().getTime(); 
		console.log("target.innerHTML TOOK " + (now - startTime) + " MILLISECONDS TO COMPLETE");
		console.log("ENTIRE TRANSACTION TOOK " + (now - initStartTime) + " MILLISECONDS TO COMPLETE"); 	
	}; 
	
	d.addEventListener('DOMContentLoaded',init); 

})(window,document); 