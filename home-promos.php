<div id='promoBar'>
	<a  href='#latest' id='promos-latest'>Latest</a> |
	<a href='#popular' id='promos-popular'>Popular</a> |
	<a href='#search'  id='promos-search'>Search</a> |
	<a href='/ui/my-teams#promos' id='promos-my' target='Team Promos'>My Promos</a>
</div>

<style>
	#searchDiv input {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
</style>

<!--<div id='searchModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px; padding:0.5rem;' data-reveal>-->
<div id='searchDiv' class='promoItem' style='display: none; margin: 0.5rem; min-height:0; height:auto; background-color: rgb(220,230,230);'>
	<h4 id='promos-formTitle'>Search Promos</h4>
	<form style='margin-bottom: 0'>
		<div class='row' id='promoID-formDiv'>
			<div class='row'>
				<div class='columns small-12'>
					<label><input type='text' id='search-keyword' value='' placeholder='keyword-, name, or description'/></label>
				</div>
			</div>
			<div class='row' style='line-height:3rem;'>
				<div class='columns small-12 medium-6'>
					<div class='row'>
						<div class='columns small-3' style='text-align: center;'>Brand</div>
						<div class='columns small-9'>
							<input type='text' id='search-brand_id' value='' placeholder='name or ID#'/></label>
						</div>
					</div>
				</div>
				<div class='columns small-12 medium-6'>
					<div class='row'>
						<div class='columns small-3' style='text-align: center;'>Amount</div>				
						<div class='columns small-4'>
							<input type='text' id='search-amount_min' value='0'/>
						</div>
						<div class='columns small-1' style='text-align: center;'>to</div>
						<div class='columns small-4'>
							<input type='text' id='search-amount_max' value='99999'/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	<button id='search-submit' class='tiny' style='position: absolute; top: 0.5rem; right: 0.5rem;'>Submit</button>
</div>


<div id='promosWrapper' class="row" style='position:relative;'></div>
<button id='scrollTo' class='tiny'>more...</button>


<div id='promosModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
	<div id='promosForm'>		
		<h4 id='promos-formTitle'></h4>
		<form>
			<div class='row' id='promoID-formDiv'>
				<div class='columns small-12'>
					<label>Promos ID#<input type='text' id='promos-promo_id' value='' disabled='disabled'/></label>
				</div>
			</div>	
			
			<div id='promoDetailsDiv'>
				<div class='row'>
					<div class='columns small-12'>
						<label>Name<input type='text' id='promos-name' value='' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label>Description<textarea rows='3' id='promos-description'></textarea></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-6'>
						<label>Amount<input type='text' id='promos-amount' value='' /></label>
					</div>
					<div class='columns small-6'>
						<label>Expires<input type='text' id='promos-expires' value='2016-12-31 00:00:00' /></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-6'>
						<label for='promos-keyword'><b>Keyword</b> for promo code,<br /> 
							e.g. <b>food</b>-111, <b>ride</b>-18
						</label>
					</div>
					<div class='columns small-6'>
						<input type='text' id='promos-keyword' value='ad' /></label>
					</div>
				</div>
				<!--<div class='row'>
					<div class='columns small-12'>
						<label>Image URL<input type='text' id='promos-imageURL' value='' /></label>
					</div>
				</div>						
				<div class='row'>
					<div class='columns small-12'>
						<label>Link<input type='text' id='promos-infoURL' value='' /></label>
					</div>
				</div>-->
			</div>
			
			<div id='promoRelayDiv'>
				<div id='promoHolderIdDiv' class='row'>
					<div class='columns small-12'>
						<label>Route payments to<br />(revenue account w/ 'x' authcode): <select id='promos-holder_id'></select></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>Limits on usage per week</div>
				</div>
				<div class='row'>
					<div class='columns small-4'>
						<label>Total<input type='text' id='promos-by_all_limit' value='25' /></label>
					</div>
					<div class='columns small-4'>
						<label>By brand<input type='text' id='promos-by_brand_limit' value='5' /></label>
					</div>
					<div class='columns small-4'>
						<label>By user<input type='text' id='promos-by_user_limit' value='2' /></label>
					</div>
				</div>
				<div class='row'>						
					<div class='columns small-8'>
						<label for='promos-by_user_wait'>Before reusing, a user must wait (in hours)</label>
					</div>				
					<div class='columns small-4'>
						<input type='text' id='promos-by_user_wait' value='24' />
					</div>
				</div>
			</div>
		</form>
		<button id='promos-submit'>Submit</button>&nbsp;
		<button id='promos-cancel'>Cancel</button>
	</div>
	<a class="close-reveal-modal">&times;</a>
</div>		

<script src='/ui/js/adminForms.js'></script>
<script src='/ui/js/homeMain.js'></script>	
<script src='/ui/js/homePromos.js'></script>
