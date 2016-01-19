<div id='meModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
	<p id='meLoggedIn'>User ID#: <span id='meUserID'></span> (<a href='?logout=1'>log-out</a>)</p>
	<p id='meLoggedOut'><a href='?login=1'>Log-In / Register</a></p>
	<p>Username: <span id='meUserName'></span></p>
	<p id='meProviderP'>Logged-in using <span id='meLoginProvider'></span></p>
	
	<div style='background-color:#ececec'>
		<p style='padding: 10px 10px 10px 10px;'>
			If you see missing or inconsistent information, 
			refresh the page by <a href='?logout=1'>logging out</a> and back in.
		</p>
	</div>
	
	<a class="close-reveal-modal">×</a>
</div>

<script>
	function me() {
		var provider = {fb: 'facebook', tw: 'twitter', gp: 'google-plus', email: 'email'};
		var color = {fb: '#3b5998', tw: '#55acee', gp: '#dd4b39', email: '#79f'};
	
		$(document).ready(function () {
			$('#mainWrapper').append($('#meModal'));
			$('#login_provider').click(main.modal);
		})
		
		function main(userID, userName, loginProvider) {			
			$('#login_provider').html(
				"<button class='tiny' style='padding: 0 5px; background-color: #999;'>"
				//+"<span class='fi-social-"+provider[loginProvider] +"' style='line-height: 14px; font-size: 16px; color:"+ color[loginProvider] +"'></span>"
				+"<span style='font-size: 14px; line-height: 13px; vertical-align: top;'>me</span>"
				+"</button>"				
			);
			
			$('#meUserID').html(userID);
			$('#meUserName').html(userName);
			$('#meLoginProvider').html(provider[loginProvider]);
			
			$('#meLoggedIn, #meProviderP').css('display', userID ? 'block' : 'none');
			$('#meLoggedOut').css('display', userID ? 'none' : 'block');
		}
		
		main.modal = function meModal(e) { 
			$('#meModal').foundation('reveal', 'open');
		}
		
		return main
	}
</script>