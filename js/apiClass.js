function apiClass(conf) {		
	var root = '/'; //may be overridden
	var	_id = conf._id ? conf._id : "@id";
	var	_type = conf._type ? conf._type : "@type";			
	var byId = {}, byType = {}, curr={};
	
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
	}
	
	main.init = function (url) {
		if (url) root = url;
		return main.loadId(root);
	}
		
	main.loadType = function (type) {		
		if (!byType[type]) {
			var url = byId[root][type];
			return main.loadId(url);
		}
		else { //console.log("          (cache:"+type+")");
			var deferred = Q.defer();
			deferred.resolve(byType[type]);
			return deferred.promise;
		}
	}	
	
	main.loadId = function (url, refresh) {
		var deferred = Q.defer();
		
		if (!url) deferred.reject(new Error('Blank url.'));
		else if (byId[url] && !refresh) {deferred.resolve(byId[url]);} // console.log("          (cache:"+url+")");}
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
					deferred.resolve(res['@graph'][0]);
				}
			},
			error: function (xhr, status, text) {
				deferred.reject(new Error(text));
			}
		});
		
		return deferred.promise;
	}
	
	main.loadRel = function (resource, rel) {
		if (resource[rel]) return resource.rel;
		if (resource.links && resource.links[rel]) {
			var link = {}; 
			link[rel] = resource.links[rel];			
			return main.deref(link);
		}
	}
	
	main.deref = function (links, refresh) {
		var promises = [];
		if (!refresh) refresh=null;
		
		for(var rel in links) {
			if (typeof links[rel]=='string') promises.push(main.loadId(links[rel], refresh));
			else {				
				for(var i=0; i<links[rel].length; i++) {promises.push(main.loadId(links[rel][i], refresh));}
			}
		}
		
		return Q.all(promises);
	}
	
	main.request = function (action) {
		var deferred = Q.defer();
		var cred = action.auth ? action.auth : conf;
		
		action.method = action.method.toLowerCase();
		
		if (!action) deferred.resolve(null) 
		else {
			$.ajax({
				url: conf.baseURL + action.target,
				type: action.method,
				headers: {
					"Authorization": "Basic " + btoa(conf.userid + ":" + conf.pass)
				},
				dataType: 'json',
				contentType: 'json',
				data: JSON.stringify(action.inputs),
				success: function (res) { 
					if (!res || !res.body) deferred.reject(new Error('No response body.'));
					else {
						if (!res.body['@graph']) res.body = {'@graph': [res.body]};									
						res.body['@graph'].map(indexGraph);
						deferred.resolve(res);
					}
				},
				error: function (xhr, status, text) {
					deferred.reject(new Error(text));
				}
			})
		}
				
		return deferred.promise;
	}	
	
	main.byId = byId
	main.byType = byType;	
	main.curr = curr
	
	return main;
}