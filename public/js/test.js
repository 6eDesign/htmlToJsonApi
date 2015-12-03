(function(w,d){
	
	var init = function() {
		atomic.get('http://localhost:3003/api/html2json?nc=true&url=' + d.location.hash.substring(1)).success(buildDOM); 
	}; 
	
	var buildDOM = function(resp) { 
		d.getElementById('target').appendChild(util.dom.create(resp));	
	}; 
	
	d.addEventListener('DOMContentLoaded',init); 

})(window,document); 