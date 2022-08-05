$(window).on('load',() => {
	$('#loader').fadeOut('fast');

	var element = document.getElementsByClassName('typewrite')[0];
	var toRotate = element.getAttribute('data-type');
	var period = element.getAttribute('data-period');
	if (toRotate) {
		new TxtType(element, JSON.parse(toRotate), period);
	}

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

	$('a[href^="#"]').click((event) => {
		event.preventDefault();
	
		$('html, body').animate({
			scrollTop: $( $(event.target).attr('href') ).offset().top - 65
		}, 500);
		location.hash = $(event.target).attr('href');
	});

	// $('.content-section').each((i, obj) => {
	// 	var waypoint = new Waypoint({
	// 		element: obj,
	// 		handler: (direction) => {
	// 			console.log('yes')
	// 			const hash = '#' + obj.id
	// 			if (location.hash != hash){
	// 				location.hash = '#' + obj.id
	// 			}
	// 		}
	// 	})
	// })
})

$(window).on('scroll', () => {
	checkNavScroll();
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

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};