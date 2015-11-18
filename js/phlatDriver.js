function phlatDriver(api, term, audience, path) {
	//var url='';
	var pathIndex = 0, links, concurrent=0, payload=[];
	var container; //the resource to which the current request is related
	var listeners = [];
	var currData;
	var deferred;
	var refresh=0;
	
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
		if (url && typeof url != 'string') {
			processServerResponse(url);
		}
		else if (!url) {
			var mssg = "Invalid url encountered for "+audience+" "+term+", "+path[pathIndex]+".";
			if (deferred) deferred.reject(new Error(mssg));
			else console.log(mssg);  
		}
		else if (url in api.byId && (!refresh || pathIndex < path.length-1)) { 
			refresh = 0;
			processServerResponse(api.byId[url]);				
		}
		else if (api.inprocess[url]) {
			//do not trigger duplicate requests in cases where the same
			//path segment is used for different terms
			api.inprocess[url].push(processServerResponse);
		} 
		else {
			api.inprocess[url] = [];
			
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
		payload[payload.indexOf(resource['@id'])] = api.byId[resource['@id']]; //substitute link url with response object
		
		if (concurrent < links.length) {}
		else if (pathIndex < path.length-1) {
			pathIndex++;
			main(payload[0]);
		}
		else {				
			for(var id in api.byId) api.linkToCachedInstance(api.byId[id]);
		
			var data = Array.isArray(container[path[pathIndex]]) ? payload: resource; if (audience=='teamMember') console.log(data);
			
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
	
	main.addListener = function (fxn) {
		if (listeners.indexOf(fxn)==-1) listeners.push(fxn);
	}
	
	main.listeners = listeners;
	
	main.promise = function (refreshOrNot) {
		refresh = refreshOrNot;
		deferred = Q.defer();
		main();
		return deferred.promise;
	}
	
	return main;
}