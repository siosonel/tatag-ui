function apiClass(conf) {		
	var root = '/'; //may be overridden
	var	_id = conf._id ? conf._id : "@id";
	var	_type = conf._type ? conf._type : "@type";			
	var byId = {}, byType = {}, curr={};
	var linkTerms = []
	
	function main() {}
	
	function indexGraph(d) {
		if (d[_type]) curr[d[_type]] = d; //swap current resource by type

		if (d[_id]) {	
			//save typed resources in an array
			if (d[_type] && !byId[_id]) {
				if (!byType[d[_type]]) byType[d[_type]] = []
				byType[d[_type]] = d;
			}
			
			//index by self-url, will swap any existing values at the same url
			byId[d[_id]] = d; 
		}
		
		if (d.linkTerms) linkTerms = linkTerms.concat(d.linkTerms);
	}
	
	function linkToCachedInstance(resource) {
		for(var term in resource) {
			if (linkTerms.indexOf(term) != -1) {
				if (typeof resource[term] == 'string' && resource[term] in byId) resource[term] = byId[resource[term]];
				else if (Array.isArray(resource[term])) {
					for(var i=0; i< resource[term].length; i++) {
						if (typeof resource[term][i] == 'string' && resource[term][i] in byId) resource[term][i] = byId[resource[term][i]];
					}
				}
			}
		}
	}
	
	main.init = function (url) {
		if (url) root = url;
		return main.loadId(root);
	}
		
	main.loadType = function (type, refresh) {
		if (!byType[type] || refresh) {
			var url = byId[root][type];
			return main.loadId(url, true);
		}
		else { //console.log("          (cache:"+type+")");
			var deferred = Q.defer();
			deferred.resolve(byType[type]);
			return deferred.promise;
		}
	}	
	
	main.loadId = function (url, refresh) {
		var deferred = Q.defer();
		
		if (typeof url!='string') {
			if (url['@id']) url = url['@id'];
			else {
				console.log("Invalid url, must be a string or an object with an @id property.");
				return;
			}
		}
		
		if (!url) deferred.reject(new Error('Blank url.'));
		else if (url in byId && !refresh) deferred.resolve(byId[url]); // console.log("          (cache:"+url+")");}
		else $.ajax({
			url: conf.baseURL + url,
			headers: {
				"Authorization": "Basic " + btoa(conf.userid + ":" + conf.pass)
			},
			dataType: 'json',
			success: function (res) {
				if (!res) deferred.reject(new Error('No response body.'));
				else {
					if (!res['@graph']) { //console.log('type '+type+' '+res.body[_type])
						res = {'@graph': [res]}; //coerce to graph layout
					}
										
					res['@graph'].map(indexGraph);
					for(var id in byId) linkToCachedInstance(byId[id]);
					deferred.resolve(res['@graph'][0]);
				}
			},
			error: function (xhr, status, text) { console.log(xhr.responseText);
				var mssg = JSON.parse(xhr.responseText).error;
				deferred.reject(new Error(text +': '+ mssg));
			}
		});
		
		return deferred.promise;
	}
	
	main.deref = function (link, refresh) {
		var promises = [];
		if (!refresh) refresh=null;
		
		if (typeof link=='string') promises.push(main.loadId(link, refresh));
		else {				
			for(var i=0; i<link.length; i++) {promises.push(main.loadId(link[i], refresh));}
		}
		
		return Q.all(promises);
	}
	
	main.request = function (action) {
		var deferred = Q.defer();
		var cred = action.auth ? action.auth : conf;
		
		action.method = action.method.toLowerCase();
		
		if (!action) deferred.resolve(null) 
		else {			
			var params = action.query ? $.param(action.query) : '';
			if (action.target.search(/\?/)==-1) params = '?'+ params;
			else params = '&'+params;
			
			$.ajax({
				url: conf.baseURL + action.target + params,
				type: action.method,
				headers: {
					"Authorization": "Basic " + btoa(conf.userid + ":" + conf.pass)
				},
				dataType: 'json',
				contentType: 'json',
				data: JSON.stringify(action.inputs),
				success: function (res) { 
					if (!res) deferred.reject(new Error('No response body.'));
					else {
						if (!res['@graph']) res = {'@graph': [res]};									
						res['@graph'].map(indexGraph);
						for(var id in byId) linkToCachedInstance(byId[id]);
						deferred.resolve(res);
					}
				},
				error: function (xhr, status, text) { console.log(xhr.responseText);
					var mssg = JSON.parse(xhr.responseText).error;
					deferred.reject(new Error(text +': '+ mssg));
				}
			})
		}
				
		return deferred.promise;
	}	
	
	main.baseURL = conf.baseURL;
	main.byId = byId;
	main.byType = byType;	
	main.curr = curr;
	
	return main;
}