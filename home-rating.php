
<div id='ratingsWrapper' class="row"></div>
<div>	
	<div id='ratingsModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
		<div id='ratingsForm'>		
			<h4 id='ratings-formTitle'></h4>
			<form>
				<div class='row' id='ratingID-formDiv' style='display:none'>
					<div class='columns small-12'>
						<label>Rating ID#<input type='text' id='ratings-rating_id' value='' disabled='disabled'/></label>
					</div>
				</div>				
				<div class='row' id='ratingsBrandId-formDiv'>
					<div class='columns small-12'>
						<label>Brand ID# or Name<input type='text' id='ratings-brand_id' value='' placeholder='Nearby ...' disabled='disabled'/></label>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label for='ratings-score'>Score (0-100) &nbsp;&nbsp;&nbsp;</label>
						<input type='range' id='ratings-slider' min='0' max='100' value='90' onchange='app.ratings.setRatingBySlider()' oninput='app.ratings.setRatingBySlider()'/>
						<input type='text' id='ratings-score' value='90' onchange='app.ratings.setSliderByText()'/>
					</div>
				</div>
				<div class='row'>
					<div class='columns small-12'>
						<label for='ratings-reason'>Reason</label><input type='text' id='ratings-reason' value='' />
					</div>
				</div>
			</form>
			<button id='ratings-submit'>Submit</button>&nbsp;
			<button id='ratings-cancel'>Cancel</button>
		</div>
		<a class="close-reveal-modal">×</a>
	</div>
	<button id='scrollTo' class='tiny'>more...</button>
</div>

<script src='/ui/js/homeRatings.js'></script>
<script src='/ui/js/autoComplete.js'></script>
<script>	
	var autocompleteSource = [
		'artistry',
		'product quality', 'price', 'customer service',
		'technical excellence',
		'ethics', 'organizational culture',
		'union relations',
		'social responsibility', 'community involvment',
		'environmental impact', 'climate responsibility',
		'fair trade', 
		'dietary health'
	];
</script>

