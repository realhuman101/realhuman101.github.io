$(window).on('load',() => {
	$('#loader').fadeOut('fast');
})

$(window).on('scroll', () => {
	const navbar = $('#navbar');
	const navY = $('#navY');

	if ($(window).scrollTop() >= navY.offset().top) {
		navbar.css({"position": "fixed","top": "0px"});
		navY.css({"height": '60px'});
	} else {
		navbar.css({"position": "relative","top": "0px"});
		navY.css({"height": "0px"});
	}
})