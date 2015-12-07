function phlatDriver(api, term, audience, path) {
	//var url='';
	var pathIndex = 0, links, concurrent=0, payload=[];
	var container; //the resource to which the current request is related
	var listeners = [];
	var currData;
	var deferred, match;
	
	function main(resource) {
		if (!arguments.length) resource = api.root();
		container = resource;
		links = resource[path[pathIndex]]; 
		
		if (!Array.isArray(links)) links = [links];
		payload = links.slice();
		concurrent = 0;
		
		links.map(materializeLink);
	}
	
	function materializeLink(url) {		
		var alt = api.applyHints(url), origURL = url;
		if (alt) url = alt;
		
		if (url && typeof url != 'string') {
			processServerResponse(url);
		}
		else if (!url) {  if (alt) console.log(['null url', url]);
			var mssg = "Invalid url encountered for "+audience+" "+term+", "+path[pathIndex]+".";
			if (deferred) deferred.reject(new Error(mssg));
			else console.log(mssg);  
		}
		else if (url in api.byId && !alt && pathIndex < path.length-1) {
			refresh = 0;
			processServerResponse(api.byId[url]);				
		}
		else if (api.inprocess[url]) {
			//do not trigger duplicate requests in cases where the same
			//path segment is used for different terms
			api.inprocess[url].push(processServerResponse);
		} 
		else {
			api.inprocess[alt ? origURL : url] = [];
			
			$.ajax({
				url: url,
				headers: api.headers,
				dataType: 'json',
				success: processServerResponse,
				error: errHandler
			});
		}
	}

	function errHandler(xhr, status, text) { console.log(status+': '+text);
		var mssg = JSON.parse(xhr.responseText).error;
		deferred.reject(new Error(text +': '+ mssg));
	}	
	
	function processServerResponse(resp) {
		if (!resp) {console.log('fail'); return;}
		
		if ('@graph' in resp) {
			resp['@graph'].map(api.indexGraph);
			var resource = resp['@graph'][0];
		}
		else if (Array.isArray(resp)) {
			var resource = resp[0];
		} 
		else {
			var resource = resp;
		}
		
		concurrent++;
		var x = links.indexOf(resource['@id']);
		if (x!=-1) payload[x] = resource; //substitute link url with response object
		
		if (concurrent < links.length) {}
		else if (pathIndex < path.length-1) { 
			pathIndex++;
			if (!match || path[pathIndex-1] != match["#"]) main(payload[0]);
			else main(payload.filter(matchResource)[0]);
		}
		else {		
			api.extendHints(resp);
			for(var id in api.byId) api.linkToCachedInstance(api.byId[id]);
		
			var data = Array.isArray(container[path[pathIndex]]) ? payload: resource; if (audience=='teamMember') console.log(data);
			
			api.byConcept[audience+'-'+term] = data; //console.log([audience+'-'+term, data]);
			
			//resolve the promise that was set via main.promise, as applicable
			if (deferred) {
				deferred.resolve(data);
				deferred = null;
			}
			
			for(var i=0; i<listeners.length; i++) listeners[i](data); 
			
			if (api.inprocess[resource['@id']]) {
				for(var i=0; i<api.inprocess[resource['@id']].length; i++) api.inprocess[resource['@id']][i](data); 
				api.inprocess[resource['@id']] = null;
			}
			
			pathIndex = 0;
			concurrent = 0;
		}
	}
	
	function matchResource(r) {
		for(var prop in match) {
			if (prop in r && match[prop] != r[prop]) return false;
		}
		
		return true;
	}
	
	main.addListener = function (fxn) {
		if (listeners.indexOf(fxn)==-1) listeners.push(fxn);
	}
	
	main.listeners = listeners;
	
	main.promise = function (matchFilter) {
		match = matchFilter;
		if (deferred) return deferred.promise;
			
		deferred = Q.defer();
		setTimeout(main, 30);
		return deferred.promise;
	}
	
	return main;
}