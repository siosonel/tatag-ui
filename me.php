<div id='meModal' class="reveal-modal medium formModal" style='min-height:50vh; top:30px;' data-reveal>
	<p>User ID#: <span id='meUserID'></span> (<a href='?logout=1'>log-out</a>)</p>
	<p>Username: <span id='meUserName'></span></p>
	<p>Login Provider: <span id='meLoginProvider'></span></p>
	
	<div style='background-color:#ececec'>
		<p style='padding: 10px 10px 0 10px;'>
			If you see missing or inconsistent information, 
			refresh the page by clicking a sign-in icon below:
		</p>
		<p style='padding-left: 30px;'>
			<a href='?provider=gp'><span class='fi-social-google-plus large' style='font-size: 49px; color: #dd4b39;'>&nbsp;&nbsp;</span></a>
			<a href='?provider=fb'><span class='fi-social-facebook large' style='font-size: 50px; color: #3b5998;'>&nbsp;&nbsp;</span></a>
			<a href='?provider=tw'><span class='fi-social-twitter large' style='font-size: 50px; color:#55acee;'>&nbsp;&nbsp;</span></a>
			<a href='?provider=email'><span class='fi-mail large' style='font-size: 50px; color:#55acee;'>&nbsp;&nbsp;</span></a>			
			<!--<span><br />-OR-<br /></span>
			<span>text a PIN# to<br /></span>
			<a href=''>(2 5 6) 4 8 5 - 4 4 7 6</a>-->
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
		}
		
		main.modal = function meModal(e) { 
			$('#meModal').foundation('reveal', 'open');
		}
		
		return main
	}
</script>