function phlatSimple(conf) {		
	var rootURL = '/';  //may be overridden
	var root; //the root resource
	var	_id = conf._id ? conf._id : "@id";
	var	_type = conf._type ? conf._type : "@type";			
	var byId = {}, byType = {}, byConcept={};
	var byIdRaw = {}; //solves tracking null resource by keeping link string values
	var requestedIds = {};
	var curr={}, hints={};
	var linkTerms = [];
	var omniListener = function (resp) {}; //function (resp) {console.log(resp)};
	var get = {};
	var subAccessor = {}; //meant to give concept-getters access to internal properties and functions
	var directions={}, inprocess={};
	
	var headers = {
		Authorization: "Basic " + btoa(conf.userid + ":" + conf.pass)
	};
	
	function main() {}
	
	function indexGraph(d) {
		var id = d[_id], type = d[_type];
		
		if (d.deprecated) deprecatedSupport(d);
		
		if (type) curr[type] = d; //swap current resource by type

		if (id) {
			//save unmodified, non-linked resource copy
			byIdRaw[id] = $.extend(true, id in byIdRaw ? byIdRaw[id] : {}, d);

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
			if (d.collectionOf) {
				if (!d.items || !d.items.length) d.items = d[d.collectionOf]; 
				else if ('items' in d && !d[d.collectionOf]) d[d.collectionOf] = d.items;  
			}
			
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
			else {
				byId[id] = d;
				if (d.pageOf) refreshItems(d.pageOf, d);
			}
		}
		
		if (d.linkTerms) linkTerms = linkTerms.concat(d.linkTerms);
	}
	
	//must be called before linkToCachedInstance
	function refreshItems(id, d) {
		if (!d.items || !(id in hints) || !( 'refresh' in hints[id]) || !byId[id]) return; //console.log([id,d]);
		
		var cachedItems = [];
		var cachedResource = byId[id], cachedRaw = byIdRaw[id];  
		var rawItems = cachedRaw[cachedRaw.collectionOf]; //console.log([id, cachedResource.items, rawItems])
		if (!cachedResource.items) cachedResource.items = rawItems ? rawItems : [];


		for(var j=0; j<cachedResource.items.length; j++) {
			var item = cachedResource.items[j] ? cachedResource.items[j] : rawItems[j];
			if (item) cachedItems.push(typeof item == 'string' ? item : item['@id']);
		}
		
		var arr = d.items.slice(0);
		arr.reverse();

		for(var i=0; i<arr.length; i++) {
			if (cachedItems.indexOf(arr[i])==-1) cachedResource.items.push(arr[i]);
		}

		cachedResource.items.sort(sortByIdDesc);

		if (cachedResource.collectionOf) cachedResource[cachedResource.collectionOf] = cachedResource.items;
		d.items = cachedResource.items; //prevents overriding cacheResource.items with d.items when $.extend is used in indexGraph
		

		if (cachedResource.pageOf && byIdRaw[cachedResource.pageOf]) {
			var raw = byIdRaw[cachedResource.pageOf];
			raw[cachedResource.collectionOf] = cachedResource[cachedResource.collectionOf];
			raw.items = cachedResource[cachedResource.collectionOf];
			raw.next = d.next;
			raw.prev = d.prev;
			cachedResource.next = d.next;
			cachedResource.prev = d.prev;
		}
	}

	function sortByIdDesc(a,b) { //console.log([a,b]);
		return b.id - a.id;
	}
	
	function deprecatedSupport(d) {
		for(var i=0; i<d.deprecated; i++) {
			var mergePatch = d.deprecation[i]['merge-patch'];
			for(var prop in mergePatch) d[prop] = mergePatch[prop]; 
		}
	}
	
	function linkToCachedInstance(raw) {
		if (!raw || !('@id' in raw)) return;
		if (!(raw['@id'] in byId)) byId[raw['@id']] = $.extend(true, {}, raw);
		var resource = byId[raw['@id']];

		for(var term in raw) {		
			if (linkTerms.indexOf(term) != -1) {
				var t = raw[term]; //resource[term];

				if (typeof t == 'string') {
					if (t in byId) resource[term] = byId[t];
				}
				else if (t!==null && typeof t=='object' && '@id' in t && t['@id'] in byId) {
					resource[term] = byId[t['@id']];
				}
				else if (Array.isArray(t)) { 
					for(var j=0; j<t.length; j++) {
						var u = t[j];

						if (!u) {}
						else if (typeof u=='string') {
							if (u in byId) resource[term][j] = byId[u]; 
						}
						else if (u['@id']) { //console.log([resource[term][j]['@id'], byId[resource[term][j]['@id']]])
							if (u['@id'] in byId) resource[term][j] = byId[u['@id']]; 
						}
						else {
							linkToCachedInstance(u);
						}
					}
				}
			}
		}
	}
	
	function applyHints(r) {
		if (!r) return;
		var url = typeof r=='string' ? r : r['@id'];
		if (url in hints && 'refresh' in hints[url]) {
			return hints[url].refresh;
		}
	}
	
	function extendHints(res) {
		if (res.hints) $.extend(true, hints, res.hints);
	}

	function setGetter(concept) {			
		if (!(concept in get)) get[concept] = phlatDriver(subAccessor, concept, directions[concept]);
	}
	
	function addListener(concept, fxn) {
		setGetter(concept);		
		get[concept].addListener(fxn);
		return main;
	}
	
	main.init = function (url) {
		if (url) rootURL = url;
		
		subAccessor = {
			root: main.root, headers: headers, 
			byId: byId, byConcept: byConcept, byIdRaw: byIdRaw,
			indexGraph: indexGraph, 
			inprocess: inprocess, linkToCachedInstance: linkToCachedInstance,
			applyHints: applyHints, extendHints: extendHints
		};
		
		return main.loadId(rootURL);
	}
		
	main.loadType = function (type) {
		if (!byType[type]) {
			var url = byId[rootURL][type];
			return main.loadId(url, true);
		}
		else { //console.log("          (cache:"+type+")");
			var deferred = Q.defer();
			deferred.resolve(byType[type]);
			return deferred.promise;
		}
	}	
	
	main.loadId = function (url) {
		var deferred = Q.defer();
		
		if (url && typeof url!='string') {
			if (url['@id']) url = url['@id'];
			else {
				console.log("Invalid url, must be a string or an object with an @id property.["+ JSON.stringify(url) +']');
				return;
			}
		}
		
		var alt = applyHints(url);
		if (alt) url = alt; if (alt) console.log(url);
		
		if (!url) deferred.reject(new Error('Blank url.'));
		else if (url in byId && !alt) deferred.resolve(byId[url]);
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
					for(var id in byIdRaw) linkToCachedInstance(byIdRaw[id]);
					deferred.resolve(res['@graph'][0].pageOf ? byId[res['@graph'][0].pageOf] : byId[res['@graph'][0]['@id']]);
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
	
	main.deref = function (link) {
		var promises = [];
		
		if (typeof link=='string') promises.push(main.loadId(link));
		else {				
			for(var i=0; i<link.length; i++) {promises.push(main.loadId(link[i]));}
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
				cache: false,
				dataType: 'json',
				contentType: 'json',
				data: JSON.stringify(action.inputs),
				success: function (res) {
					//perform cache invalidation for non-get requests					
					if (action.method.toLowerCase() != 'get') { console.log(['deleting cached resource', action.target + params])
						delete byId[action.target + params];
						delete byId[conf.baseURL + action.target + params];
					}
					
					if (!res) deferred.reject(new Error('No response body.'));
					else {
						if (!res['@graph']) res = {'@graph': [res]};
						res['@graph'].map(indexGraph);
						for(var id in byIdRaw) linkToCachedInstance(byIdRaw[id]);
						deferred.resolve(res['@graph'][0].pageOf ? byId[res['@graph'][0].pageOf] : byId[res['@graph'][0]['@id']]);
					}
					
					if (resourceURL) main.loadId(resourceURL, true);
					omniListener();
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
	main.byIdRaw = byIdRaw;
	main.byType = byType;	
	main.byConcept = byConcept;
	main.hints = hints;
	main.applyHints = applyHints;
	main.curr = curr;
	main.root = function () {return root;}
	
	main.addListener = addListener;
	
	main.byAudience = function (concept) {
		get[concept]();
		return main;
	}
	
	main.loadConcept = function (concept, match) {
		setGetter(concept);
		var p = get[concept].promise(match);
		p.then(omniListener);
		return p; 
	}
	
	main.omniListener = function (fxn) {
		omniListener = fxn;
		return main;
	}
	
	return main;
}