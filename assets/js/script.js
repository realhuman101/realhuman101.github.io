$(window).on('load',() => {
	$('#loader').fadeOut('fast');

	$('#nav-hamburger').click(() => {
		$('#hamburger-inner').toggleClass('hamburger-clicked');
		$('#hamburger-items').toggleClass('hamburger-showing');

		if ($('#hamburger-items').css('display') == 'none') {
			$('#hamburger-items').css({'display': 'flex'})
			$('#hamburger-inner').addClass('hamburger-color');
		} else {
			$('#hamburger-items').fadeOut(300).delay(400);
			$('#hamburger-items').css({'display': 'none'})
			$('#hamburger-inner').removeClass('hamburger-color');
			checkNavScroll();
		}
	})
})

$(window).on('scroll', () => {
	checkNavScroll()
})

function checkNavScroll() {
	const navbar = $('#navbar');
	const hamburger = $('#nav-hamburger')
	const navY = $('#navY');

	if ($(window).scrollTop() >= navY.offset().top) {
		if ($('#hamburger-items').css('display') == 'none') {
			$('#hamburger-inner').removeClass('hamburger-color');
			navbar.css({"position": "fixed","top": "0px"});
			navY.css({"height": '60px'});
		}
	} else {
		if ($('#hamburger-items').css('display') == 'none') {
			$('#hamburger-inner').addClass('hamburger-color');
			navbar.css({"position": "relative","top": "0px"});
			navY.css({"height": "0px"});
		}
	}
}