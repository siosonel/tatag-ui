<div id='meModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
	<p>User ID#: <span id='meUserID'></span></p>
	<p>Username: <span id='meUserName'></span></p>
	<p>Login Provider: <span id='meLoginProvider'></span><p>
	
	<p style='background-color:#ececec'>
		If you see missing or inconsistent information, 
		refresh the page by clicking a sign-in icon below:<br />
		<a href='?provider=gp'><span class='fi-social-google-plus large' style='font-size: 40px; color: #dd4b39;'>&nbsp;&nbsp;</span></a>
		<a href='?provider=fb'><span class='fi-social-facebook large' style='font-size: 40px; color: #3b5998;'>&nbsp;&nbsp;</span></a>
		<a href='?provider=tw'><span class='fi-social-twitter large' style='font-size: 40px; color:#55acee;'>&nbsp;&nbsp;</span></a>
	</p>
	
	<a class="close-reveal-modal">×</a>
</div>

<script>
	function me() {
		var provider = {fb: 'facebook', tw: 'twitter', gp: 'google-plus'};
		var color = {fb: '#3b5998', tw: '#55acee', gp: '#dd4b39'};
	
		$(document).ready(function () {
			$('#mainWrapper').append($('#meModal'));
			$('#login_provider').click(main.modal);
		})
		
		function main(userID, userName, loginProvider) {
			$('#login_provider').html(
				"<span class='fi-social-"+provider[loginProvider] +"' style='opacity: 0.9; color:"+ color[loginProvider] +"'></span>me"				
			);
			
			$('#meUserID').html(userID);
			$('#meUserName').html(userName);
			$('#meLoginProvider').html(provider[loginProvider]);
		}
		
		main.modal = function meModal(e) { 
			$('#meModal').foundation('reveal', 'open');
		}
		
		return main
	}
</script>