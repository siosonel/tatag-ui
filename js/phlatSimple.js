function phlatSimple(conf) {		
	var rootURL = '/', root; //may be overridden
	var	_id = conf._id ? conf._id : "@id";
	var	_type = conf._type ? conf._type : "@type";			
	var byId = {}, byType = {}, byConcept={};
	var curr={}, hints={};
	var linkTerms = [];
	var omniListener = function (resp) {}; //function (resp) {console.log(resp)};
	var get = {};
	var directions={}, inprocess={};
	
	var headers = {
		Authorization: "Basic " + btoa(conf.userid + ":" + conf.pass)
	}
	
	function main() {}
	
	function indexGraph(d) {
		var id = d[_id], type = d[_type];
		
		if (d.deprecated) deprecatedSupport(d);
		
		if (type) curr[type] = d; //swap current resource by type

		if (id) {
			//set root resource-dependent variables
			if (id==rootURL) {
				root = d;
				if (typeof root.navDirections == 'string') main.loadId(root.navDirections)
				else directions = root.navDirections;
			}
			else if (root && typeof root.navDirections=='string' && id==root.navDirections) {
				directions = d;
			} 
			
			//as needed, create an items link for a collection-type resource
			if (d.collectionOf && (!d.items || !d.items.length)) d.items = d[d.collectionOf]; 
			
			
			//save typed resources in an array
			if (type && !byId[id]) {
				if (!byType[type]) byType[type] = []
				byType[type] = d;
			}
			
			//index by self-url, will create new or swap any existing values at the same url
			if (id in byId) {
				refreshItems(d.pageOf ? d.pageOf : id, d);
				$.extend(byId[d.pageOf ? d.pageOf : id], d);
			}
			else byId[id] = d;
		}
		
		if (d.linkTerms) linkTerms = linkTerms.concat(d.linkTerms);
	}
	
	function refreshItems(id, d) {			
		if (!d.items || !(id in hints) || !( 'refresh' in hints[id])) return;
		
		var cachedResource = byId[id];
		
		d.items.reverse();
		
		for(var i=0; i<d.items.length; i++) {
			if (cachedResource.items.indexOf(d.items[i])==-1) cachedResource.items.unshift(d.items[i]);
		}
		
		if (cachedResource.collectionOf) cachedResource[cachedResource.collectionOf] = cachedResource.items;
		d.items = cachedResource.items;
		//delete d.items;
	}
	
	function deprecatedSupport(d) {
		for(var i=0; i<d.deprecated; i++) {
			var mergePatch = d.deprecation[i]['merge-patch'];
			for(var prop in mergePatch) d[prop] = mergePatch[prop]; 
		}
	}
	
	function linkToCachedInstance(resource) {
		for(var term in resource) {
			var t = resource[term];
		
			if (linkTerms.indexOf(term) != -1) {
				if (typeof t == 'string' && t in byId) resource[term] = byId[resource[term]];
				else if (t!==null && typeof t=='object' && '@id' in t && t['@id'] in byId) {
					resource[term] = byId[t['@id']];
				}
				else if (Array.isArray(resource[term])) {
					for(var i=0; i< t.length; i++) {
						if (typeof t[i] == 'string' && t[i] in byId) resource[term][i] = byId[t[i]];
						else if (t[i]!==null && typeof t[i]=='object' && '@id' in t[i] && t['@id'] in byId) {
							resource[term][i] = byId[t[i]['@id']];
						}
					}
				}
			}
		}
	}
	
	function applyHints(url) {
		if (url in hints && 'refresh' in hints[url]) return hints[url].refresh;
	}
	
	function extendHints(res) {
		if (res.hints) $.extend(true, hints, res.hints);
	}
	
	function setGetter(audience, term) {
		if (!(audience in get)) get[audience] = {};
		
		if (!(term in get[audience])) get[audience][term] = phlatDriver({
			root: main.root, headers: headers, 
			byId: byId, byConcept: byConcept,
			indexGraph: indexGraph, 
			inprocess: inprocess, linkToCachedInstance: linkToCachedInstance,
			applyHints: applyHints, extendHints: extendHints
		}, term, audience, directions[audience][term]);
	}
	
	function addListener(audience, term, fxn) {
		setGetter(audience, term);		
		get[audience][term].addListener(fxn);
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
		
		if (url && typeof url!='string') {
			if (url['@id']) url = url['@id'];
			else {
				console.log("Invalid url, must be a string or an object with an @id property.");
				return;
			}
		}
		
		var alt = applyHints(url);
		if (alt) url = alt;
		
		if (!url) deferred.reject(new Error('Blank url.'));
		else if (url in byId && !refresh && !alt) deferred.resolve(byId[url]); // console.log("          (cache:"+url+")");}
		else $.ajax({
			url: url.substr(0,1)=='/' ? url : conf.baseURL + url,
			headers: headers,
			dataType: 'json',
			success: function (res) {
				if (!res) deferred.reject(new Error('No response body.'));
				else {
					if (res.hints) $.extend(true, hints, res.hints);
					
					if (!res['@graph']) { //console.log('type '+type+' '+res.body[_type])
						res = {'@graph': [res]}; //coerce to graph layout
					}
										
					res['@graph'].map(indexGraph);
					for(var id in byId) linkToCachedInstance(byId[id]);
					deferred.resolve(res['@graph'][0]);
				}
				
				omniListener();
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
	
	main.request = function (action, resourceURL) {
		var deferred = Q.defer();
		var cred = action.auth ? action.auth : conf;
		
		action.method = action.method.toLowerCase();
		
		if (!action) deferred.resolve(null) 
		else {			
			var params = action.query ? $.param(action.query) : '';
			
			if (!params) {}
			else if (action.target.search(/\?/)==-1) params = '?'+ params;
			else params = '&'+params;
			
			$.ajax({
				url: conf.baseURL + action.target + params,
				type: action.method,
				headers: headers,
				dataType: 'json',
				contentType: 'json',
				data: JSON.stringify(action.inputs),
				success: function (res) {
					//perform cache invalidation for non-get requests					
					if (action.method != 'get') {
						delete byId[action.target + params];
						delete byId[conf.baseURL + action.target + params];
					}
					
					if (!res) deferred.reject(new Error('No response body.'));
					else {
						if (!res['@graph']) res = {'@graph': [res]};									
						res['@graph'].map(indexGraph);
						for(var id in byId) linkToCachedInstance(byId[id]);
						deferred.resolve(res);
					}
					
					if (resourceURL) main.loadId(resourceURL, true);
				},
				error: function (xhr, status, text) { console.log(xhr.responseText);
					var mssg = JSON.parse(xhr.responseText).error;
					deferred.reject(new Error(text +': '+ mssg));
				}
			});
		}
				
		return deferred.promise;
	}	
	
	main.baseURL = conf.baseURL;
	main.byId = byId;
	main.byType = byType;	
	main.byConcept = byConcept;
	main.hints = hints;
	main.applyHints = applyHints;
	main.curr = curr;
	main.root = function () {return root;}
	
	main.addListener = addListener;
	
	main.byAudience = function (audience, term) {
		get[audience][term]();
		return main;
	}
	
	main.loadConcept = function (audience, term, match) {
		setGetter(audience, term);
		var p = get[audience][term].promise(match);
		p.then(omniListener);
		return p; 
	}
	
	main.omniListener = function (fxn) {
		omniListener = fxn;
		return main;
	}
	
	return main;
}