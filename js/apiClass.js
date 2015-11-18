function apiClass(conf) {		
	var rootURL = '/', root; //may be overridden
	var	_id = conf._id ? conf._id : "@id";
	var	_type = conf._type ? conf._type : "@type";			
	var byId = {}, byType = {}, curr={};
	var linkTerms = [];
	var get = {};
	var directions={}, inprocess={};
	
	function main() {}
	
	function indexGraph(d) {
		if (d.deprecated) deprecatedSupport(d);
		
		if (d[_type]) curr[d[_type]] = d; //swap current resource by type

		if (d[_id]) {			
			//set root resource-dependent variables
			if (d[_id]==rootURL) {
				root = d;
				if (typeof root.navDirections == 'string') main.loadId(root.navDirections)
				else directions = root.navDirections;
			}
			else if (root && typeof root.navDirections=='string' && d[_id]==root.navDirections) {
				directions = d;
			} 
			
			//as needed, create an items link for a collection-type resource
			if (d.collectionOf && (!d.items || !d.items.length)) d.items = d[d.collectionOf]; 
			
			
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
	
	function deprecatedSupport(d) {
		for(var i=0; i<d.deprecated; i++) {
			var mergePatch = d.deprecation[i]['merge-patch'];
			for(var prop in mergePatch) d[prop] = mergePatch[prop]; 
		}
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
	
	function addListener(audience, term, fxn) {
		if (!(audience in get)) get[audience] = {};
		if (!(term in get[audience])) get[audience][term] = getFxn(term, audience, directions[audience][term]);
		get[audience][term].addListener(fxn); 

		return main;
	}
	
	function getFxn(term, audience, path, headers) {
		//var url='';
		var pathIndex = 0, links, concurrent=0, payload=[];
		var container; //the resource to which the current request is related
		var listeners = [];
		var currData;
		
		function main(resource) {
			if (!arguments.length) resource = root;
			container = resource;
			links = resource[path[pathIndex]]; 
			
			if (!Array.isArray(links)) links = [links];
			payload = links.slice();
			concurrent = 0;
			
			links.map(materializeLink);
		}
		
		function materializeLink(url) {
			if (url && typeof url != 'string') {
				processServerResponse(url);
			}
			else if (!url) {
				render(path[pathIndex], 'fail');  
			}
			else if (url in byId) {
				processServerResponse(byId[url]);				
			}
			else if (inprocess[url]) {
				//do not trigger duplicate requests in cases where the same
				//path segment is used for different terms
				inprocess[url].push(processServerResponse);
			} 
			else { console.log(url);
				inprocess[url] = [];
				
				$.ajax({
					url: url,
					headers: {
						"Authorization": "Basic " + btoa(conf.userid + ":" + conf.pass)
					},
					dataType: 'json',
					success: processServerResponse,
					error: errHandler
				});
			}
		}
	
		function errHandler(xhr, status, text) {
			console.log(status+': '+text);
		}	
		
		function processServerResponse(resp) {
			if (!resp) {console.log('fail'); return;}
			
			if ('@graph' in resp) {
				resp['@graph'].map(indexGraph);
				var resource = resp['@graph'][0];
			}
			else if (Array.isArray(resp)) {
				var resource = resp[0];
			} 
			else {
				var resource = resp;
			}
			
			concurrent++;
			payload[payload.indexOf(resource['@id'])] = resource; //substitute link url with response object
			
			if (concurrent < links.length) {}
			else if (pathIndex < path.length-1) {
				pathIndex++;
				main(payload[0]);
			}
			else {
				var data = Array.isArray(container[path[pathIndex]]) ? payload: resource; if (audience=='teamMember') console.log(data);
				for(var i=0; i<listeners.length; i++) listeners[i](data); 
				
				if (inprocess[resource['@id']]) {
					for(var i=0; i<inprocess[resource['@id']].length; i++) inprocess[resource['@id']][i](data); 
					inprocess[resource['@id']] = null;
				}
				
				pathIndex = 0;
				concurrent = 0;
			}
		}		
		
		main.addListener = function (fxn) {
			if (listeners.indexOf(fxn)==-1) listeners.push(fxn);
		}
		
		main.listeners = listeners;
		
		return main;
	}
	
	main.init = function (url) {
		if (url) rootURL = url;
		return main.loadId(rootURL);
	}
		
	main.loadType = function (type, refresh) {
		if (!byType[type] || refresh) {
			var url = byId[rootURL][type];
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
			url: url.substr(0,1)=='/' ? url : conf.baseURL + url,
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
	
	main.addListener = addListener;
	
	main.byAudience = function (audience, term) {
		get[audience][term]();
		return main;
	}
	
	return main;
}