	<div class="row">
		<div class='small-12' id='titleBar'>
			<a href="/ui/home">Home</a> |
			<a href="/ui/wallet">Wallet</a> | 
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/team" style="color: #000;">Teams</a>
		</div>
	</div>
	<div id='helpPrompt' data-dropdown='helpMenu' data-options='is_hover:true; hover_timeout: 5000'>Help/FAQ</div>	
	<ul id='helpMenu' class='f-dropdown alignRight' data-dropdown-content>
		<li><a href='/ui/home-faq'>FAQ</a></li>
		<li>Tutorial (work in progress)</li>
		<li><a href='https://github.com/siosonel/tatag-ui/issues'>Feature Requests, Bugs</a></li>
		<li><a href='https://tatag.cc/api/ref/docs.html'>API Documentation</a></li>
		<li><a href='https://github.com/siosonel/tatag-api/'>API source code</a></li>
		<li><a href='https://github.com/siosonel/tatag-ui/'>Wallet source code</a></li>
	</ul> 
	
	<style>
	</style>
	
	<div id='viewTypeDiv' class='row'>		
		<button id='my-teams' class='small-4 tiny'>My Teams</button>
		<button id='teams-admin' class='small-4 tiny'>Admin</button>
		<button id='teams-search' class='small-4 tiny'>Search</button>
		
		<script>		
		$(document).ready(function () {
			history.replaceState({}, "team", location.pathname + location.hash);
			var view = location.pathname.replace("\/ui\/","");
			
			$('#'+view).css({'color': '#ff0', 'opacity': 1, 'font-weight':700});
			
			$('#viewTypeDiv').click(function resetTeamView (e) {
				if (e.target.id=='addBrand') app.brands.clickHandler(e);
				else window.location.href = window.location.origin +"/ui/"+ e.target.id;
			});
		});
		</script>		
	</div>
	
	
	
	<!--<div class='row'>
		<div class='columns small-6'>
			<select id='viewType'>
				<option value='my-teams'>My teams</option>
				<option value='teams-admin'>Administer</option>
				<option value='teams-listing'>Brand Listing</option>
			</select>
		</div>
		<div class='columns small-6'>
			<button id='addBrand' class='right tiny'>+New Brand</button></div>
		</div>
		<script>		
		$(document).ready(function () { console.log(location.pathname);
			history.replaceState({}, "team", location.pathname); console.log(location.pathname.replace("\/ui\/",""));
			
			$('#viewType').val(location.pathname.replace("\/ui\/",""))
				.change(function resetTeamView (e) {
					window.location.href = window.location.origin +"/ui/"+ $('#viewType').val();
				});			
		});
		</script>
	</div>-->