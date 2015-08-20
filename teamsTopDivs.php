	<div class="row">
		<div class='small-12' id='titleBar'>
			<a href="/ui/home">Home</a> |
			<a href="/ui/wallet">Wallet</a> | 
			<span class='fi-refresh'>&nbsp;</span><a href="/ui/team" style="color: #000;">Teams</a>
		</div>
	</div>
	
	<div id='viewType' class='row' style='margin-top: 10px;'>
		<style>
			#viewType button {
				margin-bottom: 0;
				opacity: 0.8;
				padding: 0.5rem 0.8rem;
				float: left;
			}
		</style>
		
		<button id='my-teams' class='small-3 medium-2 large-1 tiny'>My Teams</button>
		<button id='teams-admin' class='small-3 medium-2 large-1 tiny'>Admin</button>
		<button id='teams-search' class='small-3 medium-2 large-1 tiny'>Search</button>
		
		<script>		
		$(document).ready(function () {
			history.replaceState({}, "team", location.pathname);
			var view = location.pathname.replace("\/ui\/",""); console.log(view)
			
			$('#'+view).css({'color': '#ff0', 'opacity': 1, 'font-weight':700});
			
			$('#viewType').click(function resetTeamView (e) {
				if (e.target.id=='addBrand') app.brands.clickHandler(e);
				else window.location.href = window.location.origin +"/ui/"+ e.target.id;
			});

			if (view=='teams-admin') $('#viewType').append(
				"<button id='addBrand' class='small-2 medium-2 large-1 tiny' style='float:right;'>+New</button>"
			);
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